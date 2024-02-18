'use client';

import { AddItem } from '@/components/addItem/AddItem';
import { useAddItem } from '../_hooks/useAddItem';

export default function AddItemPage() {
  const { name, divide, native, unit, price, onChange, onBack, onAddItem } =
    useAddItem({});

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
