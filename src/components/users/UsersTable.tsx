import styled from 'styled-components';

import { media, shadow } from '@/helper/client/global';
import { unitOfDate } from '@/helper/client/utils';

interface Props {
  users: Array<SerializeUser>;
  onReadUser: (id: string) => void;
}

export function UsersTable({ users, onReadUser }: Props) {
  return (
    <Container>
      <table>
        <thead>
          <Tr>
            <Th>성명</Th>
            <Th>가입일</Th>
            <Th>관리자</Th>
          </Tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <Tr
                key={user.id}
                style={{ cursor: 'pointer' }}
                onClick={() => onReadUser(user.id)}
              >
                <td>{user.username}</td>
                <td>{unitOfDate(user.createdAt)}</td>
                <td>{user.admin ? '관리자' : '일반'}</td>
              </Tr>
            ))
          ) : (
            <Tr>
              <td colSpan={4}>사용자가 없습니다.</td>
            </Tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 487px;
  padding: 0.4rem;

  ${shadow(1)}

  table {
    width: 100%;
    margin-left: 5rem;
    margin-right: 5rem;
    border-radius: 0.8rem;
    overflow: hidden;

    ${media.medium} {
      margin-left: 0;
      margin-right: 0;
    }
  }

  th,
  td {
    border-radius: 0.8rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
  }
`;

const Tr = styled.tr`
  &:hover {
    background: rgba(255, 187, 0, 0.2);
  }
`;

const Th = styled.th`
  background: #15aabf;
  color: white;

  ${media.medium} {
    &:first-child {
      width: 45%;
    }
  }
`;
