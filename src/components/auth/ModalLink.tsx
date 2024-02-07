import { useState } from 'react';
import styled from 'styled-components';

import { AuthModal } from './common/AuthModal';

export function ModalLink() {
  const [isOpen, setIsOpen] = useState(false);

  const onClickModal = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <ModalContainer>
      <Button onClick={onClickModal}>계정등록</Button>

      <AuthModal
        visible={isOpen}
        title="계정등록은 관리자에게 문의바랍니다."
        onClose={onClose}
      />
    </ModalContainer>
  );
}

// Styles
const ModalContainer = styled.div`
  margin-top: 1rem;
  text-align: right;
`;

const Button = styled.button`
  text-decoration: none;
  outline: none;
  border: none;
  color: #868e96;
  cursor: pointer;
  background-color: white;

  &:hover {
    color: #495057;
  }
`;
