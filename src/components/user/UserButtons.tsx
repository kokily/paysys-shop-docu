import styled from 'styled-components';

import { Button } from '../common/Button';
import { useMobile } from '@/helper/client/scrolling';

interface Props {
  onBack: () => void;
  onSetAdmin: () => void;
  onSetEmployee: () => void;
  onModalOpen: () => void;
}

export function UserButtons(props: Props) {
  const isMobile = useMobile();

  return (
    <Container>
      <Button $menu={true} onClick={props.onBack}>
        {isMobile ? '목록' : '목록으로'}
      </Button>
      <Button $remove={true} onClick={props.onModalOpen}>
        {isMobile ? '삭제' : '삭제하기'}
      </Button>
      <Button $employee={true} onClick={props.onSetEmployee}>
        {isMobile ? '강등' : '강등하기'}
      </Button>
      <Button $admin={true} onClick={props.onSetAdmin}>
        {isMobile ? '승급' : '승급하기'}
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
