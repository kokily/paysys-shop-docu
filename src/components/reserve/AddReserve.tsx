import type { ChangeEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';

import { shadow } from '@/helper/client/global';
import { ReserveButton } from './ReserveButtons';
import { ReserveTable } from './ReserveTable';

interface Props {
  reserve: string;
  onBack: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddReserve: (e: SyntheticEvent) => void;
}

export function AddReserve({ reserve, onBack, onChange, onAddReserve }: Props) {
  return (
    <Container>
      <LogoBox>
        <h2>예약금 추가</h2>
      </LogoBox>

      <ReserveTable
        reserve={reserve}
        onChange={onChange}
        onAddReserve={onAddReserve}
      />

      <ReserveButton onAddReserve={onAddReserve} onBack={onBack} />
    </Container>
  );
}

// Styles
const Container = styled.div`
  position: absolute;
  width: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: 0.3s ease-out 0s 1 fadeIn;

  ${shadow(1)};
`;

const LogoBox = styled.div`
  background: #845ef7;
  color: white;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0.2rem;
  font-size: 1.212rem;
  font-weight: 800;
  letter-spacing: 2px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;

  &:hover {
    color: #e5dbff;
  }
`;
