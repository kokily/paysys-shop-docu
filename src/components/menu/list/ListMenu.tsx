import { Button } from '@/components/common/Button';
import type { Item } from '@prisma/client';
import styled from 'styled-components';
import { MenuItem } from './MenuItem';

interface Props {
  menu: Array<Item>;
  onBack: () => void;
  onReadMenu: (id: string) => void;
}

export function ListMenu({ menu, onBack, onReadMenu }: Props) {
  return (
    <ListMenuContainer>
      <Title>
        <h2>{menu[0] && menu[0].divide}</h2>
        <Button $cancel={true} onClick={onBack}>
          뒤 로
        </Button>
      </Title>

      <List>
        {menu.map((item) => (
          <MenuItem key={item.id} menu={item} onReadMenu={onReadMenu} />
        ))}
      </List>
    </ListMenuContainer>
  );
}

// Styles
const ListMenuContainer = styled.div`
  margin-bottom: 6rem;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const List = styled.div`
  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;
