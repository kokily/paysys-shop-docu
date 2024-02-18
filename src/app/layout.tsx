import type { Metadata } from 'next';
import localFont from 'next/font/local';

import QueryWrapper from '@/helper/wrapper/QueryWrapper';
import SessionWrapper from '@/helper/wrapper/SessionWrapper';
import StyledWrapper from '@/helper/wrapper/StyledWrapper';
import ToastWrapper from '@/helper/wrapper/ToastWrapper';

import 'react-toastify/ReactToastify.css';

const NanumGothic = localFont({
  src: '../../public/fonts/NanumGothic-Regular.woff2',
  display: 'swap',
});

const title = '행사전표시스템 - v6.0';

export const metadata: Metadata = {
  title,
  description: '행사전표시스템',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://paysys.kr',
    title,
    siteName: '행사전표시스템',
    images: [
      {
        url: 'https://paysys.kr/images/main-logo.png',
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    title,
    site: 'https://paysys.kr',
    images: [
      {
        url: 'https://paysys.kr/images/main-logo.png',
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>

      <body className={NanumGothic.className}>
        <SessionWrapper>
          <QueryWrapper>
            <StyledWrapper>
              {children}
              <ToastWrapper />
            </StyledWrapper>
          </QueryWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
