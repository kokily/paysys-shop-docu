import type { Item } from '@prisma/client';
import type {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
} from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { Search } from '../common/search/Search';
import { Button } from '../common/Button';
import { ItemsTable } from './ItemsTable';

interface Props {
  items: Array<Item>;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
  onReadItem: (id: string) => void;
  setTarget: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
}

export function ListItems(props: Props) {
  const items = props.items;

  return (
    <ListItemsContainer>
      <Search
        mode="품명"
        search={props.search}
        onChange={props.onChange}
        onSearch={props.onSearch}
      />

      <Link href="/items/add">
        <Button submit={true}>품목 추가</Button>
      </Link>

      <ItemsTable items={items} onReadItem={props.onReadItem} />

      <div ref={props.setTarget} />
    </ListItemsContainer>
  );
}

// Styles
const ListItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;
