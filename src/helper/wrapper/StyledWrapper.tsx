'use client';

import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import { GlobalStyle } from '../client/global';

export default function StyledWrapper({ children }: PropsWithChildren) {
  // 지연 초기 상태로 스타일시트 1회만 생성
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();

    styledComponentsStyleSheet.instance.clearTag();

    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager
      sheet={styledComponentsStyleSheet.instance}
      shouldForwardProp={undefined}
    >
      <GlobalStyle />
      {children}
    </StyleSheetManager>
  );
}
