import styled from 'styled-components';

import { shadow } from '@/helper/client/global';
import { BottomNavItem } from './BottomNavItem';

export function BottomNav() {
  return (
    <NavContainer>
      <Contents>
        <BottomNavItem href="/soldier" icon="military_tech" name="현 역" />
        <BottomNavItem href="/reserve" icon="camera_enhance" name="예비역" />
        <BottomNavItem href="/general" icon="face" name="일 반" />
        <BottomNavItem href="/cart" icon="shopping_cart" name="전표확인" />
        <BottomNavItem href="/fronts" icon="receipt_long" name="빌지목록" />
      </Contents>
    </NavContainer>
  );
}

// Styles
const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media print {
    display: none;
  }
`;

const Contents = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  max-width: 768px;
  height: 60px;
  display: flex;
  overflow-x: auto;

  ${shadow(1)}

  a {
    display: flex;
    width: 100%;
    height: 100%;
  }
`;
