import type { PropsWithChildren } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface Props extends PropsWithChildren {
  href?: string;
  onClick?: () => void;
}

export function NavItem({ href, onClick, children }: Props) {
  const jsx = <Box onMouseDown={onClick}>{children}</Box>;

  return href ? (
    <Link href={href} passHref={true}>
      <NavItemContainer>{jsx}</NavItemContainer>
    </Link>
  ) : (
    jsx
  );
}

// Styles
const NavItemContainer = styled.div`
  display: block;
  color: inherit;
  text-decoration: none;
  border: none;
  background: none;
  width: 100%;
`;

const Box = styled.div`
  padding: 0.75rem 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: #474747;
  cursor: pointer;

  &:hover {
    color: white;
    background: #5baaaa;
  }
`;
