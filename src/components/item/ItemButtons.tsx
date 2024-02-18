import styled from 'styled-components';

import { media } from '@/helper/client/global';
import { Button } from '../common/Button';

interface Props {
  onBack: () => void;
  onEdit: () => void;
  onModalOpen: () => void;
}

export function ItemButtons({ onBack, onEdit, onModalOpen }: Props) {
  return (
    <ButtonsContainer>
      <Button $submit={true} onClick={onBack}>
        목록
      </Button>
      <Button $edit={true} onClick={onEdit}>
        수정
      </Button>
      <Button $remove={true} onClick={onModalOpen}>
        삭제
      </Button>
    </ButtonsContainer>
  );
}

// Styles
const ButtonsContainer = styled.div`
  display: contents;
  margin-top: 1rem;

  button {
    margin-right: 0.5rem;
  }

  ${media.large} {
    width: 1200px;
    padding-left: 15rem;
    padding-right: 15rem;
  }
`;
