import styled from 'styled-components';

import { media, shadow } from '@/helper/client/global';
import { UserButtons } from './UserButtons';
import { UserContents } from './UserContents';

interface Props {
  user: SerializeUser;
  onBack: () => void;
  onSetIdentity: (identity: IdentifyType) => void;
  onModalClick: () => void;
}

export function ReadUser(props: Props) {
  return (
    <ReadUserContainer>
      <h2>사용자 상세보기</h2>

      <DownBorder />

      <UserButtons
        onBack={props.onBack}
        onModalOpen={props.onModalClick}
        onSetAdmin={() => props.onSetIdentity('admin')}
        onSetEmployee={() => props.onSetIdentity('employee')}
      />
      <UserContents user={props.user} />
    </ReadUserContainer>
  );
}

// Styles
const ReadUserContainer = styled.div`
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

  ${media.medium} {
    width: 100%;
  }

  h2 {
    font-size: 1.712rem;
  }

  ${shadow(1)};
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
