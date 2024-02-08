import Link from 'next/link';
import localFont from 'next/font/local';
import { usePathname } from 'next/navigation';
import styled, { css } from 'styled-components';

const NanumBolic = localFont({
  src: '../../../../public/fonts/NanumGothic-Bold.woff2',
  display: 'swap',
});

export function Logo() {
  const pathname = usePathname();
  const link = pathname.split('/')[1];

  return (
    <Link href="/soldier">
      <LogoContent
        className={NanumBolic.className}
        soldier={link === 'soldier'}
        reserve={link === 'reserve'}
        general={link === 'general'}
        cart={link === 'cart'}
        fronts={link === 'fronts'}
        password={link === 'password'}
        weddings={link === 'weddings'}
      >
        행사전표시스템
      </LogoContent>
    </Link>
  );
}

// Styles
const LogoContent = styled.button<{
  soldier?: boolean;
  reserve?: boolean;
  general?: boolean;
  cart?: boolean;
  fronts?: boolean;
  password?: boolean;
  weddings?: boolean;
}>`
  font-size: 1.4rem;
  letter-spacing: 2px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  background: none;
  text-shadow: 1px 1px 4px #9a9a9a;

  &:hover {
    text-shadow: 0.5px 0.5px;
  }

  ${(props) =>
    props.soldier &&
    css`
      color: #1098ad;
    `}

  ${(props) =>
    props.reserve &&
    css`
      color: #68a614;
    `}

  ${(props) =>
    props.general &&
    css`
      color: #e47112;
    `}

  ${(props) =>
    props.cart &&
    css`
      color: #0ca678;
    `}

  ${(props) =>
    props.fronts &&
    css`
      color: #1098ad;
    `}

  ${(props) =>
    props.password &&
    css`
      color: #845ef7;
    `}

  ${(props) =>
    props.weddings &&
    css`
      color: #7048e8;
    `}
`;
