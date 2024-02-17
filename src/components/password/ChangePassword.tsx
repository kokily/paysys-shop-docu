import type { ChangeEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';

import { shadow } from '@/helper/client/global';
import { PasswordTable } from './PasswordTable';
import { PasswordButtons } from './PasswordButtons';

interface Props {
  password: string;
  onBack: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: SyntheticEvent) => void;
}

export function ChangePassword(props: Props) {
  return (
    <PaswordContainer>
      <LogoBox>
        <h2>비밀번호 변경</h2>
      </LogoBox>

      <PasswordTable
        password={props.password}
        onChange={props.onChange}
        onChangePassword={props.onChangePassword}
      />
      <PasswordButtons
        onBack={props.onBack}
        onChangePassword={props.onChangePassword}
      />
    </PaswordContainer>
  );
}

// Styles
const PaswordContainer = styled.div`
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
