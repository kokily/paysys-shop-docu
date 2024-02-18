import type { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  data: string[];
}

export function ItemSelect({ name, value, onChange, data }: Props) {
  return (
    <Container>
      <Select name={name} value={value} onChange={onChange}>
        {data.map((divide, i) => (
          <option key={i} value={divide}>
            {divide}
          </option>
        ))}
      </Select>
    </Container>
  );
}

// Styles
const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
`;

const Select = styled.select`
  background: #f8f9fa;
  width: 100%;
  padding: 10px;
  padding-left: 0px;
  border: none;
  outline: none;
  font-size: 1rem;
  border-bottom: 1px solid #15aabf;
  margin-bottom: -1rem;
  cursor: pointer;

  &:focus {
    background: #4c6ef5;
    color: white;
  }
`;
