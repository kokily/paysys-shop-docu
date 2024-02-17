import type { ChangeEvent, MouseEvent } from 'react';
import styled from 'styled-components';

import { media } from '@/helper/client/global';
import { Cart } from '@prisma/client';
import { CartTop } from './CartTop';
import { CartTotal } from './CartTotal';
import { Button } from '../common/Button';
import { CartInput } from './CartInput';

interface Props {
  cart: Cart | undefined;
  title: string;
  hall: string;
  etc: string;
  totalAmount: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddBill: (e: MouseEvent) => void;
  onRemoveOneCart: (id: string, name: string) => void;
  onModalClick: () => void;
}

export function ViewCart(props: Props) {
  return (
    <ViewCartContainer>
      {props.cart ? (
        <>
          <CartTop cart={props.cart} onRemoveOne={props.onRemoveOneCart} />
          <CartTotal totalAmount={props.totalAmount} />

          <Contents>
            <div className="center">
              <CartInput
                name="title"
                value={props.title}
                label="행사명"
                onChange={props.onChange}
                small
              />
              <CartInput
                name="hall"
                value={props.hall}
                label="행사홀"
                onChange={props.onChange}
                small
              />
              <CartInput
                name="etc"
                value={props.etc}
                label="기타사항"
                onChange={props.onChange}
              />
            </div>

            <Button remove={true} onClick={props.onModalClick}>
              전체삭제
            </Button>
            <Button submit={true} onClick={props.onAddBill}>
              전송하기
            </Button>
          </Contents>
        </>
      ) : (
        <div>등록된 내역이 없습니다.</div>
      )}
    </ViewCartContainer>
  );
}

// Styles
const ViewCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-bottom: 6rem;

  ${media.xsmall} {
    width: 100%;
    padding: 0.2rem;
  }
`;

const Contents = styled.div`
  margin-top: 1rem;

  .center {
    width: 350px;
  }

  button {
    float: right;
    margin-left: 0.5rem;
  }
`;
