import { PageTemplate } from '@/components/common/PageTemplate';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <PageTemplate>{children}</PageTemplate>
      </body>
    </html>
  );
}
