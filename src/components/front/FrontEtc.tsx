import styled from 'styled-components';

interface Props {
  etc: string;
}

export function FrontEtc({ etc }: Props) {
  return (
    <>
      <hr />
      <FrontEtcContainer>
        <Contents>{etc}</Contents>
      </FrontEtcContainer>
    </>
  );
}

// Styles
const FrontEtcContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Contents = styled.span`
  width: 100%;
  color: #364fc7;
  padding: 15px;
  background-color: #dbe4ff;
  border-color: #bac8ff;
  border: 1px solid transparent;
  border-radius: 4px;
`;
