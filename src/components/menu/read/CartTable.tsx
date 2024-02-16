import type { Item } from '@prisma/client';
import type { ChangeEvent } from 'react';
import styled from 'styled-components';

import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  menu: Item;
  price: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function CartTable({ menu, price, onChange }: Props) {
  return (
    <TableContainer>
      <tbody>
        <tr>
          <th>구 분</th>
          <td>{menu.name}</td>
        </tr>

        <tr>
          <th>단 가</th>
          <td>
            {menu.price === 0 ? (
              <input
                type="text"
                name="price"
                value={price}
                onChange={onChange}
              />
            ) : (
              <>{unitOfAccount(menu.price, '원')}</>
            )}
          </td>
        </tr>

        <tr>
          <th>단 위</th>
          <td>{menu.unit}</td>
        </tr>
      </tbody>
    </TableContainer>
  );
}

// Styles
const TableContainer = styled.table`
  tr {
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  th,
  td {
    width: 160px;
    border-radius: 8px;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    text-align: center;

    input {
      width: 75%;
      height: 1.5rem;
      padding: 0.5rem;
      border-radius: 4px;
      outline: none;
    }
  }

  th {
    background: #748ffc;
    color: white;
  }
`;
