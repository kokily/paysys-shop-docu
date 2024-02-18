import type { SyntheticEvent } from 'react';
import styled from 'styled-components';

import { Button } from '../common/Button';

interface Props {
  onBack: () => void;
  onChangePassword: (e: SyntheticEvent) => void;
}

export function PasswordButtons({ onBack, onChangePassword }: Props) {
  return (
    <ButtonsContainer>
      <Button $cancel={true} onClick={onBack}>
        취 소
      </Button>
      <Button $submit={true} onClick={onChangePassword}>
        확 인
      </Button>
    </ButtonsContainer>
  );
}

// Styles
const ButtonsContainer = styled.div`
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;
