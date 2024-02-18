import styled from 'styled-components';

import { shadow } from '@/helper/client/global';
import { unitOfDate } from '@/helper/client/utils';

interface Props {
  user: SerializeUser;
}

export function UserContents({ user }: Props) {
  return (
    <Container>
      <Table>
        <Tr>
          <Th>ID</Th>
          <td>{user.id}</td>
        </Tr>
        <Tr>
          <th>등급</th>
          <td>{user.admin ? '관리자' : '일반'}</td>
        </Tr>
        <Tr>
          <th>성명</th>
          <td>{user.username}</td>
        </Tr>
        <Tr>
          <th>가입</th>
          <td>{unitOfDate(user.createdAt)}</td>
        </Tr>
      </Table>
    </Container>
  );
}

// Styles
const Container = styled.div`
  position: relative;
  width: 320px;
  margin: 36px auto;
  padding: 1rem;
  background: white;
  border-radius: 5px;
  overflow: hidden;

  ${shadow(1)};
`;

const Table = styled.table`
  width: 100%;
  padding: 0;
  border-radius: 0.8rem;
  overflow: hidden;

  th,
  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
  }
`;

const Tr = styled.tr`
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Th = styled.th`
  background: #364fc7;
  color: white;
  min-width: 50px;
`;
