import styled, { css } from 'styled-components';

import { shadow } from '@/helper/client/global';

interface Props {
  children: string;
  $cancel?: boolean;
  $submit?: boolean;
  $edit?: boolean;
  $remove?: boolean;
  $restore?: boolean;
  $menu?: boolean;
  $reserve?: boolean;
  $employee?: boolean;
  $admin?: boolean;
  $fullSize?: boolean;
  onClick?: (e: any) => void;
}

export function Button({ children, ...props }: Props) {
  const htmlProps = props as any;

  return (
    <Container
      {...htmlProps}
      onClick={(e) => {
        if (htmlProps.onClick) {
          htmlProps.onClick(e);
        }
        (e.target as HTMLButtonElement).blur();
      }}
    >
      {children}
    </Container>
  );
}

// Styles
const Container = styled.button<Props>`
  font-size: 1rem;
  font-weight: bold;
  width: 90px;
  border-radius: 6px;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  transition: 0.2s all;

  &:active {
    transform: translateY(3px);
  }

  & + & {
    margin-left: 1rem;

    ${(props) =>
      props.$fullSize &&
      css`
        margin-left: 0px;
      `}
  }

  ${(props) =>
    props.$cancel &&
    css`
      border: 1px solid #fa5252;
      background: white;
      color: #fa5252;
      &:hover {
        background: #fa5252;
        color: white;
        ${shadow(1)};
      }
    `}

  ${(props) =>
    props.$submit &&
    css`
      border: 1px solid #7950f2;
      background: white;
      color: #7950f2;
      &:hover {
        background: #7950f2;
        color: white;
        ${shadow(1)};
      }
    `}

    ${(props) =>
    props.$edit &&
    css`
      border: 1px solid #fab005;
      background: white;
      color: #fab005;
      &:hover {
        background: #fab005;
        color: white;
        ${shadow(1)};
      }
    `}

    ${(props) =>
    props.$fullSize &&
    css`
      width: 100%;
      margin-bottom: 1rem;

      & + & {
        margin-left: 0;
      }
    `}

    ${(props) =>
    props.$remove &&
    css`
      border: 1px solid #fa5252;
      background: white;
      color: #fa5252;
      &:hover {
        background: #fa5252;
        color: white;
        ${shadow(1)};
      }
    `}

  ${(props) =>
    props.$restore &&
    css`
      border: 1px solid #15aabf;
      background: white;
      color: #15aabf;
      &:hover {
        background: #15aabf;
        color: white;
        ${shadow(1)};
      }
    `}

${(props) =>
    props.$menu &&
    css`
      border: 1px solid #4c6ef5;
      background: white;
      color: #4c6ef5;
      &:hover {
        background: #4c6ef5;
        color: white;
        ${shadow(1)};
      }
    `}

${(props) =>
    props.$reserve &&
    css`
      border: 1px solid #fab005;
      background: white;
      color: #fab005;
      &:hover {
        background: #fab005;
        color: white;
        ${shadow(1)};
      }
    `}

${(props) =>
    props.$employee &&
    css`
      border: 1px solid #fab005;
      background: white;
      color: #fab005;
      &:hover {
        background: #fab005;
        color: white;
        ${shadow(1)};
      }
    `}

${(props) =>
    props.$admin &&
    css`
      border: 1px solid #4c6ef5;
      background: white;
      color: #4c6ef5;
      &:hover {
        background: #4c6ef5;
        color: white;
        ${shadow(1)};
      }
    `}
`;
