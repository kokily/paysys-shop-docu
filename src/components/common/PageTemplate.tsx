'use client';

import type { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { media } from '@/helper/client/global';
import { Header } from './header/Header';
import { BottomNav } from './bottom/BottomNav';

export function PageTemplate({ children }: PropsWithChildren) {
  return (
    <Layout>
      <Header />

      <Main>{children}</Main>

      <BottomNav />
    </Layout>
  );
}

// Styles
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 6rem 5rem 0rem 5rem;

  ${media.medium} {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  @media print {
    margin: 0;
  }
`;
