'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styled from 'styled-components';

import { menu } from '@/helper/client/menu';
import { HomeItem } from './HomeItem';

export function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const link = pathname.substring(1);

  const onMenu = useCallback(
    (divide: string) => {
      let native = '';

      switch (link) {
        case 'soldier':
          native = '현역';
          break;
        case 'reserve':
          native = '예비역';
          break;
        case 'general':
          native = '일반';
          break;
        default:
          break;
      }

      router.push(`/menu?native=${native}&divide=${divide}`);
    },
    [link],
  );

  return (
    <HomeContainer>
      <HomeContents>
        {menu.map((item) => (
          <HomeItem
            key={item.id}
            soldier={link === 'soldier'}
            reserve={link === 'reserve'}
            general={link === 'general'}
            divide={item.divide}
            onMenu={() => onMenu(item.divide)}
          />
        ))}
      </HomeContents>
    </HomeContainer>
  );
}

// Styles
const HomeContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 6rem;
`;

const HomeContents = styled.div`
  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  margin-bottom: 1rem;
`;
