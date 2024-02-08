import styled from 'styled-components';

import { ActiveLink } from '../ActiveLink';

interface Props {
  href: string;
  icon: string;
  name: string;
}

export function BottomNavItem({ href, icon, name }: Props) {
  return (
    <ActiveLink href={href} activeClassName="active">
      <Anchor>
        <i className="material-icons">{icon}</i>
        {name}
      </Anchor>
    </ActiveLink>
  );
}

// Styles
const Anchor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-grow: 1;
  min-width: 20%;
  overflow: hidden;
  white-space: nowrap;
  -webkit-tab-highlight-color: transparent;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: #c3fae8;
  }

  &.active {
    color: #49b886;
  }
`;
