import type {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
} from 'react';
import styled from 'styled-components';

import { Search } from '../common/search/Search';
import { UsersTable } from './UsersTable';

interface Props {
  users: Array<SerializeUser>;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
  onReadUser: (id: string) => void;
  setTarget: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
}

export function ListUsers(props: Props) {
  const users = props.users;

  return (
    <ListUsersContainer>
      <h2>사용자 목록</h2>

      <Search
        mode="성명"
        search={props.search}
        onChange={props.onChange}
        onSearch={props.onSearch}
      />

      <UsersTable users={users} onReadUser={props.onReadUser} />
    </ListUsersContainer>
  );
}

// Styles
const ListUsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 6rem;

  h1 {
    text-align: center;
  }
`;
