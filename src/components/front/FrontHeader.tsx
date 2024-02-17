import type { Bill } from '@prisma/client';
import styled from 'styled-components';

import { media } from '@/helper/client/global';
import { unitOfDate, unitOfTime } from '@/helper/client/utils';

interface Props {
  front: Bill;
}

export function FrontHeader({ front }: Props) {
  return (
    <>
      <InfoHeader>
        <h2>
          전표 세부내역
          <br />
          <small>[ {front.title} ]</small>
        </h2>
      </InfoHeader>

      <Bar />

      <InfoContents>
        <Table>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>{front.username} 님</td>
            </tr>
            <tr>
              <th>작성일자</th>
              <td>{unitOfDate(front.createdAt)}</td>
            </tr>
            <tr>
              <th>작성시간</th>
              <td>{unitOfTime(front.createdAt)}</td>
            </tr>
            <tr>
              <th>행사장소</th>
              <td>{front.hall}</td>
            </tr>
          </tbody>
        </Table>
      </InfoContents>
    </>
  );
}

// Style
const InfoHeader = styled.div`
  text-align: center;
  padding-bottom: -1.5rem;

  small {
    color: #364fc7;
  }
`;

const Bar = styled.div`
  margin-left: 5rem;
  margin-right: 5rem;
  margin-bottom: 1rem;
  height: 3px;
  background: linear-gradient(to right, #12b886, #22b8cf);

  ${media.medium} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const InfoContents = styled.div`
  float: right;
  text-align: center;
  position: relative;
  width: 280px;
  font-size: 0.8rem;
  margin: 30px auto;
  margin-right: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 5px;
  overflow: hidden;

  ${media.xsmall} {
    margin-right: 0.6rem;
  }
`;

const Table = styled.table`
  width: 100%;
  padding: 0;

  tr:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  th,
  td {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    text-align: center;
  }

  th {
    background: #364fc7;
    color: white;
  }

  @media print {
    th,
    td {
      color: black;
    }
  }
`;
