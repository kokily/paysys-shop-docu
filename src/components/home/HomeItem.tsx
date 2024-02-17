'use client';

import type { MouseEvent } from 'react';
import styled, { css } from 'styled-components';

import { shadow } from '@/helper/client/global';

interface Props {
  soldier?: boolean;
  reserve?: boolean;
  general?: boolean;
  divide?: string;
  onMenu?: (e: MouseEvent) => void;
}

export function HomeItem({ soldier, reserve, general, divide, onMenu }: Props) {
  return (
    <HomeItemContainer
      onClick={onMenu}
      soldier={soldier}
      reserve={reserve}
      general={general}
    >
      {divide}
    </HomeItemContainer>
  );
}

// Styles
const HomeItemContainer = styled.div<Props>`
  font-size: 1.215rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 55px;
  cursor: pointer;
  -webkit-filter: brightness(0.9);
  filter: brightness(0.9);
  color: white;

  ${shadow(1)}

  &:hover {
    -webkit-filter: brightness(1);
    filter: brightness(1);
  }

  &:active {
    transform: translateY(3px);
  }

  ${(props) =>
    props.soldier &&
    css`
      background-color: #1098ad;
    `}

  ${(props) =>
    props.reserve &&
    css`
      background-color: #68a614;
    `}

  ${(props) =>
    props.general &&
    css`
      background-color: #e47112;
    `}
`;
