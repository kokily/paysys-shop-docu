import type { Item } from '@prisma/client';
import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';

import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  menu: Item;
  price: string;
  count: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddCart: (e: SyntheticEvent) => void;
}

export function CartInput(props: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.onAddCart(e);
    }
  };

  return (
    <>
      <div className="number">
        <label htmlFor="count">수 량</label>
        <input
          type="text"
          name="count"
          value={props.count}
          onChange={props.onChange}
          onKeyDown={onKeyDown}
          required
        />
      </div>

      <Total>
        <h3>
          합계 금액:{' '}
          {props.menu.price === 0 ? (
            <>
              {unitOfAccount(
                parseInt(props.price) * parseInt(props.count),
                '원',
              )}
            </>
          ) : (
            <>{unitOfAccount(props.menu.price * parseInt(props.count), '원')}</>
          )}
        </h3>
      </Total>
    </>
  );
}

// Styles
const Total = styled.div`
  text-align: right;
  color: red;
  margin-bottom: 0;
  padding-bottom: 0.5rem;

  h3 {
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;
