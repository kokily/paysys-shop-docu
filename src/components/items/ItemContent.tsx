import type { Item } from '@prisma/client';
import styled from 'styled-components';

import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  item: Item;
  onReadItem: (id: string) => void;
}

export function ItemContent({ item, onReadItem }: Props) {
  return (
    <Tr onClick={() => onReadItem(item.id)}>
      <td>{item.divide}</td>
      <td>{item.native}</td>
      <td>{item.name}</td>
      <td>{item.unit}</td>
      <td>{unitOfAccount(item.price, '원')}</td>
    </Tr>
  );
}

// Styles
const Tr = styled.tr`
  cursor: pointer;

  &:hover {
    background: rgba(255, 187, 0, 0.2);
  }
`;
