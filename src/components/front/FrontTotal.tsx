import type { Bill } from '@prisma/client';
import styled from 'styled-components';

import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  front: Bill;
}

export function FrontTotal({ front }: Props) {
  return (
    <FrontTotalContainer>
      {front.reserve ? (
        <>
          <Pane>
            총 금액 :{' '}
            <span style={{ color: 'grey', fontSize: '1.5rem' }}>
              {unitOfAccount(front.totalAmount, '원')}
            </span>
          </Pane>
          <Pane>
            예약금 : <Reserve>{unitOfAccount(front.reserve, '원')}</Reserve>
          </Pane>
          <Pane>
            결제금액 :{' '}
            <span style={{ color: 'blue', fontSize: '2rem' }}>
              {unitOfAccount(front.totalAmount - front.reserve, '원')}
            </span>
          </Pane>
        </>
      ) : (
        <Pane>
          결제금액 :{' '}
          <span style={{ color: 'blue', fontSize: '2rem' }}>
            {unitOfAccount(front.totalAmount, '원')}
          </span>
        </Pane>
      )}
    </FrontTotalContainer>
  );
}

// Styles
const FrontTotalContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Pane = styled.div`
  margin-bottom: 0.75rem;
  transition: 0.2s all;
`;

const Reserve = styled.span`
  color: red;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #ffa8a8;
  }
`;
