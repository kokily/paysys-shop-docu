import { signOut } from 'next-auth/react';
import styled, { css } from 'styled-components';

import { shadow } from '@/helper/client/global';
import { NavItem } from './NavItem';

interface Props {
  menuOpen: boolean;
  isAdmin: boolean;
}

export function Navigation({ menuOpen, isAdmin }: Props) {
  const onLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <NavigationContainer visible={menuOpen}>
      <NavigationContents>
        <NavItem href="/password">비밀번호 변경</NavItem>

        {isAdmin && (
          <>
            <Split />

            <NavItem href="/weddings">웨딩빌지</NavItem>
            <NavItem href="/items">품목 리스트</NavItem>

            <Split />

            <NavItem href="/users">사용자 리스트</NavItem>
          </>
        )}

        <Split />

        <NavItem onClick={onLogout}>로그아웃</NavItem>
      </NavigationContents>
    </NavigationContainer>
  );
}

// Styles
const NavigationContainer = styled.nav<{
  visible: boolean;
}>`
  position: absolute;
  top: 100%;
  margin-top: 0.22rem;
  right: 0;
  transition: 0.16s transform;
  animation-duration: 300ms;

  ${shadow(1)}

  ${(props) =>
    props.visible
      ? css`
          opacity: 1;
          transform: scale(1);
        `
      : css`
          opacity: 0;
          transform: scale(0);
        `}
`;

const NavigationContents = styled.div`
  position: relative;
  z-index: 5;
  width: 12rem;
  background: white;
  ${shadow(1)}
`;

const Split = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  height: 2px;
  background: linear-gradient(to right, #36ac71, #398eb6);
`;
