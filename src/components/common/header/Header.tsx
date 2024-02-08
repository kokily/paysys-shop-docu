import { useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';

import { media, shadow } from '@/helper/client/global';
import { Logo } from './Logo';
import { Apeach } from './Apeach';
import { Navigation } from './navigation/Navigation';

export function Header() {
  const { data } = useSession();
  const apeachRef = useRef<HTMLDivElement>(null);

  // Menu Toggle
  const [menuOpen, setMenuOpen] = useState(false);

  const onToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const onOutsideClick = useCallback((e: any) => {
    if (apeachRef.current && !apeachRef.current.contains(e.target as any)) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', onOutsideClick, true);

    return () => window.removeEventListener('click', onOutsideClick, true);
  }, [apeachRef]);

  return (
    <HeaderContainer>
      <Layout>
        <Contents>
          <Logo />

          <Spacer />

          <>
            <div ref={apeachRef}>
              <Apeach onClick={onToggleMenu} />
            </div>

            {data?.user && (
              <Navigation menuOpen={menuOpen} isAdmin={data.user.admin} />
            )}
          </>
        </Contents>
      </Layout>
    </HeaderContainer>
  );
}

// Styles
const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 20;
  ${shadow(1)}

  @media print {
    display: none;
  }
`;

const Layout = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  height: auto;
`;

const Contents = styled.div`
  width: 1200px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;

  ${media.large} {
    width: 992px;
  }

  ${media.medium} {
    width: 100%;
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;
