import type { Bill } from '@prisma/client';
import styled from 'styled-components';

import { unitOfDate } from '@/helper/client/utils';

interface Props {
  front: Bill;
  onHallPage: (hall: string) => void;
  onUserPage: (userId: string) => void;
  onReadPage: (id: string) => void;
  isMobile: boolean;
}

export function FrontItem(props: Props) {
  return (
    <tr>
      <Item>{unitOfDate(props.front.createdAt)}</Item>
      {!props.isMobile && <Item>{(props.front.items[0] as any).native}</Item>}
      <Item className="link" onClick={() => props.onReadPage(props.front.id)}>
        <strong>
          {props.front.title.length > 20
            ? props.front.title.slice(0, 20)
            : props.front.title}
        </strong>
      </Item>
      <Item className="link" onClick={() => props.onHallPage(props.front.hall)}>
        {props.front.hall}
      </Item>
      <Item
        className="link"
        onClick={() => props.onUserPage(props.front.userId!)}
      >
        {props.front.username}님
      </Item>
    </tr>
  );
}

// Styles
const Item = styled.td`
  strong {
    color: #0b7285;
    transition: 0.3s;
    overflow: hidden;
    padding: 0.3rem;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background: #1098ad;
      color: white;
    }
  }

  &.link {
    cursor: pointer;
    color: #3d4c4f;
    transition: 0.2s color;

    &:hover {
      color: #22b8cf;
    }

    &:active {
      transform: translateY(2px);
    }
  }
`;
