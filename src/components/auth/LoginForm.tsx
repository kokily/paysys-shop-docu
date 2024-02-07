import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';

import { AuthInput } from './common/AuthInput';
import { AuthButton } from './common/AuthButton';
import { ModalLink } from './ModalLink';

interface Props {
  username: string;
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onLogin: (e: SyntheticEvent) => void;
}

export function LoginForm({ username, password, onChange, onLogin }: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onLogin(e);
    }
  };

  return (
    <LoginFormContainer>
      <AuthInput
        type="text"
        name="username"
        value={username}
        label="아이디"
        onChange={onChange}
      />

      <AuthInput
        type="password"
        name="password"
        value={password}
        label="비밀번호"
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <AuthButton onLogin={onLogin} />
      <ModalLink />
    </LoginFormContainer>
  );
}

// Styles
const LoginFormContainer = styled.div`
  background: white;
  padding: 2rem;
  height: auto;
`;
