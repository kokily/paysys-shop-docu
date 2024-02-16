import type { Item } from '@prisma/client';
import styled from 'styled-components';

import { shadow } from '@/helper/client/global';
import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  menu: Item;
  onReadMenu: (id: string) => void;
}

export function MenuItem({ menu, onReadMenu }: Props) {
  return (
    <MenuItemContainer
      className={menu.native}
      onClick={() => onReadMenu(menu.id)}
    >
      {menu.name} | {unitOfAccount(menu.price, '원')}
    </MenuItemContainer>
  );
}

// Styles
const MenuItemContainer = styled.div`
  color: white;
  font-size: 1.215rem;
  font-weight: 700;
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;

  ${shadow(1)};

  &.현역 {
    background: #15aabf;
  }

  &.예비역 {
    background: #94d82d;
  }

  &.일반 {
    background: #ffa94d;
  }

  -webkit-filter: brightness(0.9);
  filter: brightness(0.9);

  &:hover {
    -webkit-filter: brightness(1);
    filter: brightness(1);
  }

  &:active {
    transform: translateY(3px);
  }
`;
