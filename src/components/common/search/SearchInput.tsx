import type { ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  placeholder: string;
}

export function SearchInput(props: Props) {
  return (
    <Input
      type="text"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      placeholder={props.placeholder}
    />
  );
}

// Styles
const Input = styled.input`
  width: 250px;
  height: 40px;
  padding: 10px 5px;
  float: left;
  font-size: 1rem;
  border: 0;
  background: #3bc9db;
  color: white;
  -moz-border-radius: 3px 0 0 3px;
  -webkit-border-radius: 3px 0 0 3px;
  border-radius: 3px 0 0 3px;

  &::placeholder {
    color: white;
  }

  &:focus {
    color: #5f3dc4;
    outline: 0;
    background: #fff;
    -moz-box-shadow: 0 0 2px rgba(0, 0, 0, 0.8) inset;
    -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.8) inset;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.8) inset;
  }
`;
