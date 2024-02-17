import styled, { css } from 'styled-components';

import { media } from '@/helper/client/global';
import { unitOfAccount } from '@/helper/client/utils';

interface Props {
  item: AddItemModel;
}

export function TableItem({ item }: Props) {
  return (
    <tr>
      <Td
        soldier={item.native === '현역'}
        reserve={item.native === '예비역'}
        general={item.native === '일반'}
        className={`${item.native}`}
      >
        {item.native}
      </Td>
      <Td
        soldier={item.native === '현역'}
        reserve={item.native === '예비역'}
        general={item.native === '일반'}
      >
        {item.name}
      </Td>
      <Td
        soldier={item.native === '현역'}
        reserve={item.native === '예비역'}
        general={item.native === '일반'}
      >
        <span style={{ color: '#868e96' }}>
          {unitOfAccount(item.price, '원')}
        </span>
      </Td>
      <Td
        soldier={item.native === '현역'}
        reserve={item.native === '예비역'}
        general={item.native === '일반'}
      >
        {unitOfAccount(item.count)}
      </Td>
      <Td
        soldier={item.native === '현역'}
        reserve={item.native === '예비역'}
        general={item.native === '일반'}
        className="subTotal"
      >
        {unitOfAccount(item.price * item.count, '원')}
      </Td>
    </tr>
  );
}

// Styles
const Td = styled.td<{
  soldier?: boolean;
  reserve?: boolean;
  general?: boolean;
}>`
  ${media.small} {
    ${(props) =>
      props.soldier &&
      css`
        background: #1098ad;
        color: white;
      `}

    ${(props) =>
      props.reserve &&
      css`
        background: #74b816;
        color: white;
      `}

    ${(props) =>
      props.general &&
      css`
        background: #fd7e14;
        color: white;
      `}
  }

  @media print {
    &.현역 {
      color: #1098ad;
    }

    &.예비역 {
      color: #74b816;
    }

    &.일반 {
      color: #fd7e14;
    }

    &.subTotal {
      color: #ff00ea;
    }
  }
`;
