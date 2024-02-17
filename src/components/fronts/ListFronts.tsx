import type { Bill } from '@prisma/client';
import type {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
} from 'react';
import styled from 'styled-components';

import { media } from '@/helper/client/global';
import { Search } from '../common/search/Search';
import { FrontsContents } from './FrontsContents';

interface Props {
  fronts: Array<Bill>;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
  onHallPage: (hall: string) => void;
  onUserPage: (userId: string) => void;
  onReadFront: (id: string) => void;
  setTarget: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
}

export function ListFronts(props: Props) {
  return (
    <ListFrontsContainer>
      <h2>프런트 전표 현황</h2>

      <Search
        mode="제목"
        search={props.search}
        onChange={props.onChange}
        onSearch={props.onSearch}
      />

      <FrontsContents
        fronts={props.fronts}
        onHallPage={props.onHallPage}
        onUserPage={props.onUserPage}
        onReadPage={props.onReadFront}
      />

      <div ref={props.setTarget} />
    </ListFrontsContainer>
  );
}

// Styles
const ListFrontsContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;

  ${media.xsmall} {
    width: 100%;
  }
`;
