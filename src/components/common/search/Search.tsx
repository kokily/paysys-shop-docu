import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';

import { SearchInput } from './SearchInput';
import { SearchButton } from './SearchButton';

interface Props {
  mode: string;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
}

export function Search({ mode, search, onChange, onSearch }: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(e);
    }
  };

  return (
    <SearchContainer>
      <Contents>
        <SearchInput
          name="search"
          value={search}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={`${mode}`}
        />
        <SearchButton onSearch={onSearch} />
      </Contents>
    </SearchContainer>
  );
}

// Styles
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Contents = styled.div`
  width: 320px;
  padding: 5px;
  background: #444;
  background: rgba(103, 153, 255, 0.12);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4) inset,
    0 1px 0 rgba(255, 255, 255, 0.2);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4) inset,
    0 1px 0 rgba(255, 255, 255, 0.2);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4) inset,
    0 1px 0 rgba(255, 255, 255, 0.2);
`;
