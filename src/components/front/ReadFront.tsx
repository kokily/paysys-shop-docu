import type { Bill } from '@prisma/client';
import styled from 'styled-components';

import { FrontHeader } from './FrontHeader';
import { FrontTable } from './table/FrontTable';
import { FrontEtc } from './FrontEtc';
import { FrontTotal } from './FrontTotal';
import { FrontButtons } from './FrontButtons';

interface Props {
  front: Bill;
  userId: string;
  isAdmin: boolean;
  onBack: () => void;
  onRestoreBill: () => void;
  onReservePage: () => void;
  onRemoveReserve: () => void;
  onModalClick: () => void;
}

export function ReadFront(props: Props) {
  const front = props.front;

  return (
    <ReadFrontContainer>
      <Contents>
        <FrontHeader front={front} />
        <FrontTable front={front} />

        {front.etc !== '' && front.etc !== ' ' && <FrontEtc etc={front.etc} />}

        <hr />

        <FrontTotal front={front} />

        {props.userId && (
          <FrontButtons
            front={front}
            userId={props.userId}
            isAdmin={props.isAdmin}
            onBack={props.onBack}
            onModalClick={props.onModalClick}
            onRemoveReserve={props.onRemoveReserve}
            onReservePage={props.onReservePage}
            onRestoreBill={props.onRestoreBill}
          />
        )}
      </Contents>
    </ReadFrontContainer>
  );
}

// Styles
const ReadFrontContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
