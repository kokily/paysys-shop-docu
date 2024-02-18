'use client';

import { AddItem } from '@/components/addItem/AddItem';
import { useAddItem } from '../../_hooks/useAddItem';

export default function UpdateItemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { name, divide, native, unit, price, onChange, onBack, onAddItem } =
    useAddItem({ id });

  return (
    <AddItem
      name={name}
      divide={divide}
      native={native}
      unit={unit}
      price={price}
      onChange={onChange}
      onBack={onBack}
      onAddItem={onAddItem}
    />
  );
}
