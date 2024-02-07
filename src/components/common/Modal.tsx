import styled from 'styled-components';

import { shadow } from '@/helper/client/global';
import { Button } from './Button';

interface Props {
  visible: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function Modal({ visible, title, content, onConfirm, onCancel }: Props) {
  if (!visible) return null;

  return (
    <ModalContainer>
      <Contents>
        <h2>{title}</h2>
        <p>{content}</p>

        <ButtonsBox>
          <Button cancel={true} onClick={onCancel}>
            취소
          </Button>
          <Button submit={true} onClick={onConfirm}>
            확인
          </Button>
        </ButtonsBox>
      </Contents>
    </ModalContainer>
  );
}

// Styles
const ModalContainer = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  width: 320px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  animation: 0.3s ease-out 0s 1 slideUpFromBottom;
  ${shadow(1)};

  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 3rem;
  }
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
