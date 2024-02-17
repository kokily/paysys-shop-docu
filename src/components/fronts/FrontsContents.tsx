import type { Bill } from '@prisma/client';
import styled from 'styled-components';

import { useMobile } from '@/helper/client/scrolling';
import { FrontItem } from './FrontItem';

interface Props {
  fronts: Array<Bill>;
  onHallPage: (hall: string) => void;
  onUserPage: (userId: string) => void;
  onReadPage: (id: string) => void;
}

export function FrontsContents(props: Props) {
  const isMobile = useMobile();

  return (
    <FrontsContainer>
      <thead>
        <Th>날짜</Th>
        {!isMobile && <Th>구분</Th>}
        <Th>행사명</Th>
        <Th>장소</Th>
        <Th>작성자</Th>
      </thead>

      {props.fronts === null || props.fronts.length === 0 ? (
        <tr>
          <td colSpan={4}>작성된 전표가 없습니다.</td>
        </tr>
      ) : (
        <>
          {props.fronts.map((front) => (
            <FrontItem
              key={front.id}
              front={front}
              onHallPage={props.onHallPage}
              onUserPage={props.onUserPage}
              onReadPage={props.onReadPage}
              isMobile={isMobile}
            />
          ))}
        </>
      )}
    </FrontsContainer>
  );
}

// Styles
const FrontsContainer = styled.table`
  width: 100%;
  padding: 0;
  border-radius: 0.8rem;
  overflow: hidden;

  th,
  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
    overflow: hidden;
  }
`;

const Th = styled.th`
  min-width: 50px;
  background: #1098ad;
  color: white;
`;
