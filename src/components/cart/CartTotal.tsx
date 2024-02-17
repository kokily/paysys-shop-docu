import styled from 'styled-components';

import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  totalAmount: number;
}

export function CartTotal({ totalAmount }: Props) {
  return (
    <CartTotalContainer>
      <div className="total">
        예상 결제금액 :{' '}
        <span style={{ color: 'red', fontSize: '2rem' }}>
          {unitOfAccount(totalAmount, '원')}
        </span>
        원
      </div>
    </CartTotalContainer>
  );
}

// Styles
const CartTotalContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  margin-right: 1rem;

  .total {
    float: right;
  }
`;
