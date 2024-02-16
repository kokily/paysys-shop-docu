import type { Item } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';

import { shadow } from '@/helper/client/global';
import { CartTable } from './CartTable';
import { CartInput } from './CartInput';
import { ReadMenuButtons } from './ReadMenuButtons';

interface Props {
  menu: Item;
  count: string;
  price: string;
  onBack: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddCart: (e: SyntheticEvent) => void;
}

export function ReadMenu(props: Props) {
  return (
    <ReadMenuContainer>
      <Logo>
        {props.menu.divide} | {props.menu.native}
      </Logo>

      <Contents>
        <CartTable
          menu={props.menu}
          price={props.price}
          onChange={props.onChange}
        />

        <hr />

        <CartInput
          menu={props.menu}
          count={props.count}
          price={props.price}
          onChange={props.onChange}
          onAddCart={props.onAddCart}
        />

        <ReadMenuButtons onAddCart={props.onAddCart} onBack={props.onBack} />
      </Contents>
    </ReadMenuContainer>
  );
}

// Styles
const ReadMenuContainer = styled.div`
  position: absolute;
  width: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  animation: 0.5s ease-out 0s 1 fadeIn;

  ${shadow(1)};
`;

const Logo = styled.div`
  background: #ff6b6b;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: 2px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #ffe3e3;
  }
`;

const Contents = styled.div`
  background: white;
  padding: 1.5rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    outline: none;
    padding: 0.5rem;
    margin-left: 1rem;
    border-radius: 4px;
  }
`;
