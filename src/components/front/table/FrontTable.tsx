import type { Bill } from '@prisma/client';
import styled from 'styled-components';

import { TableItem } from './TableItem';

interface Props {
  front: Bill;
}

export function FrontTable({ front }: Props) {
  return (
    <FrontTableContainer>
      <thead>
        <tr>
          <th>구분</th>
          <th>상품명</th>
          <th>단가</th>
          <th>수량</th>
          <th>소계</th>
        </tr>
      </thead>

      <tbody>
        {front.items === null || front.items.length === 0 ? (
          <tr>
            <td colSpan={5}>데이터가 없습니다.</td>
          </tr>
        ) : (
          <>
            {front.items.map((item: any) => (
              <TableItem key={item.id} item={item} />
            ))}
          </>
        )}
      </tbody>
    </FrontTableContainer>
  );
}

// Styles
const FrontTableContainer = styled.table`
  width: 100%;
  padding: 0;
  border-radius: 0.8rem;
  overflow: hidden;

  tr:hover {
    background: #91a7ff;
    color: white;
    strong {
      color: #c92a2a;
    }
  }

  th,
  td {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-align: center;
    strong {
      color: #364fc7;
    }
  }

  th {
    background: #364fc7;
    color: white;
  }

  @media print {
    th {
      color: blue;
    }

    td {
      color: black;
    }
  }
`;
