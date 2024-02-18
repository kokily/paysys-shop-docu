import type { SyntheticEvent } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/common/Button';

interface Props {
  onAddCart: (e: SyntheticEvent) => void;
  onBack: () => void;
}

export function ReadMenuButtons({ onAddCart, onBack }: Props) {
  return (
    <ButtonsContainer>
      <Button $submit={true} onClick={onAddCart}>
        전표전송
      </Button>
      <Button $cancel={true} onClick={onBack}>
        취소하기
      </Button>
    </ButtonsContainer>
  );
}

// Styles
const ButtonsContainer = styled.div`
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
`;
