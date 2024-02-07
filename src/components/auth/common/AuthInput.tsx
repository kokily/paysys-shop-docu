import type { ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';

interface Props {
  type: string;
  name: string;
  value: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
}

export function AuthInput(props: Props) {
  return (
    <InputContainer>
      <Input {...props} required />
      <Bar className="bar" />
      <Label>{props.label}</Label>
    </InputContainer>
  );
}

// Styles
const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #15aabf;
  padding: 10px;
  display: block;
  width: 92%;

  &:focus {
    outline: none;
  }

  &:focus ~ label,
  &:valid ~ label {
    top: -10px;
    font-size: 14px;
    color: #12b886;
  }

  &:focus ~ .bar:before {
    left: 0;
    right: 0;
  }
`;

const Bar = styled.span`
  position: relative;
  display: block;
  width: 100%;

  &:before {
    content: '';
    position: absolute;
    background: #0c8599;
    height: 3px;
    left: 50%;
    right: 50%;
    bottom: 0;
    transition: left 0.2s ease-out, right 0.2s ease-out;
  }
`;

const Label = styled.label`
  position: absolute;
  color: #212529;
  top: 12px;
  left: 0;
  transition: 0.2s ease all;
`;
