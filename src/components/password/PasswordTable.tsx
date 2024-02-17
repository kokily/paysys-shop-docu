import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';

interface Props {
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: SyntheticEvent) => void;
}

export function PasswordTable({ password, onChange, onChangePassword }: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onChangePassword(e);
    }
  };

  return (
    <Container>
      <Table>
        <tbody>
          <Tr>
            <Th>변경할 비밀번호</Th>
            <td>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                onKeyDown={onKeyDown}
                autoFocus
              />
            </td>
          </Tr>
        </tbody>
      </Table>
    </Container>
  );
}

// Styles
const Container = styled.div`
  background: white;
  padding: 1.215rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  th,
  td {
    border-radius: 8px;
    padding-top: 0.25rem;
    padding-bottom: 0.2rem;
    width: 160px;
    text-align: center;
  }
`;

const Tr = styled.tr`
  &:hover {
    background: rgba(165, 102, 255, 0.2);
  }
`;

const Th = styled.th`
  background: #748ffc;
  color: white;
  &.orange {
    background: #ffa94d;
    padding-top: 0;
    padding-bottom: 0;
  }
  &.cyan {
    background: #3bc9db;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  padding: 0.5rem;
  border-radius: 4px;
`;
