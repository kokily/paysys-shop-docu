import type { Item } from '@prisma/client';
import styled from 'styled-components';

import { media, shadow } from '@/helper/client/global';
import { ItemButtons } from './ItemButtons';
import { ItemContent } from './ItemContent';

interface Props {
  item: Item;
  onBack: () => void;
  onUpdateItemPage: () => void;
  onModalClick: () => void;
}

export function ReadItem(props: Props) {
  const item = props.item;

  return (
    <ReadItemContainer>
      <Contents>
        <h3>품목 상세보기</h3>

        <DownBorder />

        <ItemButtons
          onBack={props.onBack}
          onEdit={props.onUpdateItemPage}
          onModalOpen={props.onModalClick}
        />

        <ItemContent item={item} />
      </Contents>
    </ReadItemContainer>
  );
}

// Styles
const ReadItemContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding: 1rem;

  ${media.medium} {
    padding: 0.2rem;
  }
`;

const Contents = styled.div`
  text-align: center;
  width: 80%;
  background: #dbe4ff;

  ${shadow(1)};

  ${media.medium} {
    width: 100%;
  }
`;

const DownBorder = styled.div`
  margin-left: 5rem;
  margin-right: 5rem;
  margin-bottom: 1rem;
  height: 3px;
  background: linear-gradient(to right, #12b886, #5c7cfa);

  ${media.medium} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;
