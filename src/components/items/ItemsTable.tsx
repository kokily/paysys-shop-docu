import type { Item } from '@prisma/client';
import styled from 'styled-components';

import { media } from '@/helper/client/global';
import { ItemContent } from './ItemContent';

interface Props {
  items: Array<Item>;
  onReadItem: (id: string) => void;
}

export function ItemsTable({ items, onReadItem }: Props) {
  return (
    <TableContainer>
      <thead>
        <Tr>
          <Th>분류</Th>
          <Th>구분</Th>
          <Th>상품명</Th>
          <Th>단위</Th>
          <Th>단가</Th>
        </Tr>
      </thead>

      <tbody>
        {items.length > 0 ? (
          items.map((item) => (
            <ItemContent key={item.id} item={item} onReadItem={onReadItem} />
          ))
        ) : (
          <Tr>
            <td colSpan={5}>데이터가 없습니다.</td>
          </Tr>
        )}
      </tbody>
    </TableContainer>
  );
}

// Styles
const TableContainer = styled.table`
  width: 100%;
  margin-top: 1rem;
  margin-left: 5rem;
  margin-right: 5rem;
  border-radius: 0.8rem;
  overflow: hidden;

  ${media.medium} {
    margin-left: 0;
    margin-right: 0;
  }

  th,
  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
  }
`;

const Tr = styled.tr`
  &:hover {
    background: rgba(255, 187, 0, 0.2);
  }
`;

const Th = styled.th`
  background: #15aabf;
  color: white;
`;
