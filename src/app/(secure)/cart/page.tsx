'use client';

import type { Bill, Cart } from '@prisma/client';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import client from '@/helper/client/client';
import { useRemoveModal } from '@/helper/client/hooks';
import { Modal } from '@/components/common/Modal';
import { ViewCart } from '@/components/cart/ViewCart';

// API
async function viewCartAPI() {
  const response = await client.get<Cart>('/cart');
  return response.data;
}

async function addBillAPI(payload: AddBillPayload) {
  const response = await client.post<Bill>('/bills/add', payload);
  return response.data;
}

async function removeAllCartAPI() {
  const response = await client.delete(`/cart/remove`);
  return response.data;
}

async function removeOneCartAPI(itemId: string) {
  const response = await client.patch(`/cart/removeOne/${itemId}`);
  return response.data;
}

export default function CartPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [inputs, setInputs] = useState({
    title: '',
    hall: '',
    etc: '',
    totalAmount: 0,
  });
  const { title, hall, etc, totalAmount } = inputs;

  // Data Fetching
  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: () => viewCartAPI(),
    enabled: true,
    staleTime: 0,
  });

  // Data Mutations
  const addBillMutate = useMutation({ mutationFn: addBillAPI });
  const removeCartMutate = useMutation({ mutationFn: removeAllCartAPI });
  const removeOneCartMutate = useMutation({ mutationFn: removeOneCartAPI });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onAddBill = async (e: SyntheticEvent) => {
    e.preventDefault();

    if ([title, hall].includes('')) {
      toast.error('빈 칸없이 입력해 주세요');
      return;
    }

    if (totalAmount < 1) {
      toast.error('금액을 확인해 주세요');
      return;
    }

    await addBillMutate.mutateAsync(
      {
        title,
        hall,
        etc: etc === '' ? ' ' : etc,
      },
      {
        onSuccess: (data) => {
          onRemoveAllCart();
          queryClient.invalidateQueries({ queryKey: ['fronts', 'cart'] });
          router.replace(`/fronts/${data.id}`);
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      },
    );
  };

  const onRemoveAllCart = async () => {
    await removeCartMutate.mutateAsync(undefined, {
      onSuccess: () => {
        setInputs({ title: '', hall: '', etc: '', totalAmount: 0 });
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        toast.success('카트 삭제');
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  const onRemoveOneCart = async (id: string, name: string) => {
    if (window.confirm(`${name} 품목을 삭제합니다.`)) {
      await removeOneCartMutate.mutateAsync(id, {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries({ queryKey: ['cart'] });

          if (data.id) {
            toast.success(`${name} 품목 삭제`);
            onCal(data.items);
          } else {
            toast.success(`카트 삭제`);
          }
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      });
    } else {
      return;
    }
  };

  const onCal = (items: Array<any>) => {
    let total = 0;

    for (let key in items as any) {
      total += items[key as any].amount;
    }

    setInputs({ ...inputs, totalAmount: total });
  };

  // Remove Modal
  const removeModal = useRemoveModal({ onRemove: onRemoveAllCart });

  useEffect(() => {
    if (cart?.items && cart.items.length > 0) {
      onCal(cart.items);
    }
  }, [cart?.items]);

  return (
    <>
      <ViewCart
        cart={cart}
        title={title}
        hall={hall}
        etc={etc}
        totalAmount={totalAmount}
        onChange={onChange}
        onAddBill={onAddBill}
        onRemoveOneCart={onRemoveOneCart}
        onModalClick={removeModal.onModalClick}
      />

      <Modal
        visible={removeModal.modal}
        title="카트 전체 삭제"
        content="삭제하시려면 확인을 눌러주세요."
        onConfirm={removeModal.onConfirm}
        onCancel={removeModal.onCancel}
      />
    </>
  );
}
