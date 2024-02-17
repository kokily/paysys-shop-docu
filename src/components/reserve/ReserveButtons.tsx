import type { SyntheticEvent } from 'react';
import styled from 'styled-components';

import { Button } from '../common/Button';

interface Props {
  onBack: () => void;
  onAddReserve: (e: SyntheticEvent) => void;
}

export function ReserveButton({ onBack, onAddReserve }: Props) {
  return (
    <Container>
      <Button cancel={true} onClick={onBack}>
        취 소
      </Button>
      <Button submit={true} onClick={onAddReserve}>
        확 인
      </Button>
    </Container>
  );
}

// Styles
const Container = styled.div`
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;
