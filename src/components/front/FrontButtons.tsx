import type { Bill } from '@prisma/client';
import styled from 'styled-components';

import { Button } from '../common/Button';

interface Props {
  front: Bill;
  onBack: () => void;
  onRestoreBill: () => void;
  onReservePage: () => void;
  onRemoveReserve: () => void;
  onModalClick: () => void;
  userId: string;
  isAdmin: boolean;
}

export function FrontButtons(props: Props) {
  const front = props.front;

  return (
    <Container>
      <ButtonBox>
        {props.userId &&
          front &&
          (props.isAdmin || front.userId === props.userId) && (
            <>
              <Button $remove={true} onClick={props.onModalClick}>
                삭 제
              </Button>
              <Button $restore={true} onClick={props.onRestoreBill}>
                수 정
              </Button>
            </>
          )}
        <Button $menu={true} onClick={props.onBack}>
          목 록
        </Button>

        {props.userId && front && props.isAdmin && (
          <>
            {!front.reserve || front.reserve === 0 ? (
              <Button $reserve={true} onClick={props.onReservePage}>
                + 예약금
              </Button>
            ) : (
              <Button $reserve={true} onClick={props.onRemoveReserve}>
                예약금 삭제
              </Button>
            )}
          </>
        )}
      </ButtonBox>
    </Container>
  );
}

// Styles
const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 100%;
  justify-content: center;

  @media print {
    display: none;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
