import type { ChangeEvent, SyntheticEvent } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { shadow } from '@/helper/client/global';
import { LoginForm } from './LoginForm';

interface Props {
  username: string;
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onLogin: (e: SyntheticEvent) => void;
}

export function Login(props: Props) {
  return (
    <LoginContainer>
      <Logo>
        <LogoLink href="/">로그인</LogoLink>
      </Logo>

      <LoginForm {...props} />
    </LoginContainer>
  );
}

// Styles
const LoginContainer = styled.div`
  position: absolute;
  width: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: 0.5s ease-out 0s 1 fadeIn;
  ${shadow(1)};
`;

const Logo = styled.div`
  background: #22b8cf;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoLink = styled(Link)`
  color: white;
  font-size: 2.4rem;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: 5px;
`;
