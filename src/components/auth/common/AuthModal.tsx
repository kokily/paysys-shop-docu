import styled from 'styled-components';

import { shadow } from '@/helper/client/global';
import { Button } from '@/components/common/Button';

interface Props {
  visible: boolean;
  title: string;
  onClose: () => void;
}

export function AuthModal({ visible, title, onClose }: Props) {
  if (!visible) return null;

  return (
    <ModalContainer>
      <Contents>
        <p>{title}</p>

        <ButtonsBox>
          <Button submit={true} onClick={onClose}>
            닫 기
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
  font-size: 1rem;
  font-weight: bold;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  animation: 0.3s ease-out 0s 1 slideUpFromBottom;
  ${shadow(1)};

  p {
    margin-bottom: 3rem;
  }
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
