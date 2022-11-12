import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.8rem;

    a {
      width: 4.8rem;
      height: 4.8rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${(props) => props.theme['gray-100']};
      display: flex;

      // here we must add a transparent border to the element so that when we hover it, the border will be visible and will not push the content
      border-top: 0.3rem solid transparent;
      border-bottom: 0.3rem solid transparent;

      transition: border-color 0.1s;

      &:hover {
        border-bottom-color: ${(props) => props.theme['green-500']};
      }

      &.active {
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
`;
