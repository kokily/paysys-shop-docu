import type { Cart } from '@prisma/client';
import styled from 'styled-components';

import { Button } from '../common/Button';
import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  cart: Cart;
  onRemoveOne: (id: string, name: string) => void;
}

export function CartTop({ cart, onRemoveOne }: Props) {
  return (
    <>
      <h2>전표 확인(종합)</h2>

      <CartTopContainer>
        <thead>
          <Th>적용</Th>
          <Th>수량</Th>
          <Th>단가</Th>
          <Th>삭제</Th>
        </thead>
        <tbody>
          {cart &&
            cart.items &&
            cart.items.map((item: any) => (
              <tr key={item.id}>
                <Td>
                  [ {item.native} ]<br />
                  {item.divide}
                </Td>
                <Td>{unitOfAccount(item.count)}</Td>
                <Td>
                  {unitOfAccount(item.price, '원')} /<br />
                  <strong>{unitOfAccount(item.amount, '원')}</strong>
                </Td>
                <Td>
                  <Button
                    $remove={true}
                    onClick={() => onRemoveOne(item.id, item.name)}
                  >
                    삭제
                  </Button>
                </Td>
              </tr>
            ))}
        </tbody>
      </CartTopContainer>
    </>
  );
}

// Styles
const CartTopContainer = styled.table`
  width: 100%;
  padding: 0;
  border-radius: 0.8rem;
  overflow: hidden;

  th,
  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
  }
`;

const Th = styled.th`
  background: #0ca678;
  color: white;
`;

const Td = styled.td`
  border-bottom: 1px solid #0ca678;

  strong {
    color: blue;
  }
`;
