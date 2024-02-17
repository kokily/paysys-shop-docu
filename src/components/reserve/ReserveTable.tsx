import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';

interface Props {
  reserve: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddReserve: (e: SyntheticEvent) => void;
}

export function ReserveTable({ reserve, onChange, onAddReserve }: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddReserve(e);
    }
  };

  return (
    <TableContainer>
      <Table>
        <tbody>
          <Tr>
            <Th>금 액</Th>
            <td>
              <Input
                type="text"
                name="reserve"
                value={reserve}
                onChange={onChange}
                onKeyDown={onKeyDown}
                autoFocus
                required
              />
            </td>
          </Tr>
        </tbody>
      </Table>
    </TableContainer>
  );
}

// Styles
const TableContainer = styled.div`
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
