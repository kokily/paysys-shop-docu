import { shadow } from '@/helper/client/global';
import { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button';
import { ItemInput } from './ItemInput';
import { ItemSelect } from './ItemSelect';
import { divideArray, nativeArray } from '@/helper/client/menu';

interface Props {
  id?: string;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBack: () => void;
  onAddItem: (e: SyntheticEvent) => void;
}

export function AddItem(props: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.onAddItem(e);
    }
  };

  return (
    <AddItemContainer>
      <Logo>품목 추가</Logo>

      <InputGroup>
        <ItemInput
          name="name"
          value={props.name}
          onChange={props.onChange}
          label="품 명"
          focus={true}
        />

        <ItemSelect
          name="divide"
          value={props.divide}
          onChange={props.onChange}
          data={divideArray}
        />

        <ItemSelect
          name="native"
          value={props.native}
          onChange={props.onChange}
          data={nativeArray}
        />

        <ItemInput
          name="unit"
          value={props.unit}
          onChange={props.onChange}
          label="단 위"
        />

        <ItemInput
          name="price"
          value={props.price}
          onChange={props.onChange}
          label="단 가"
          onKeyDown={onKeyDown}
        />

        <ButtonsBox>
          <Button $submit={true} $fullSize={true} onClick={props.onAddItem}>
            {props.id ? '저장하기' : '등록하기'}
          </Button>
          <Button $cancel={true} $fullSize={true} onClick={props.onBack}>
            취소하기
          </Button>
        </ButtonsBox>
      </InputGroup>
    </AddItemContainer>
  );
}

// Styles
const AddItemContainer = styled.div`
  position: absolute;
  width: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: 0.5s ease-out 0s 1 fadeIn;

  ${shadow(1)};
`;

const Logo = styled.div`
  background: #22b8cf;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 5px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;

  &:hover {
    color: #99e9f2;
  }
`;

const InputGroup = styled.div`
  background: white;
  padding: 2rem;
  height: auto;
`;

const ButtonsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
