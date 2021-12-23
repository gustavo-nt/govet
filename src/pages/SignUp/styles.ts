import styled, { keyframes } from 'styled-components';

import { shade } from 'polished';
import { colors } from '../../styles/colors';
import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 700px;
  align-items: center;
  justify-content: center;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 80px 0%;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: ${colors.gray200};
      display: block;
      margin-top: 24px;

      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, colors.gray200)};
      }
    }
  }

  > a {
    color: ${colors.gray200};
    display: flex;
    align-items: center;

    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, colors.gray200)};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg});
  background-size: cover;
`;

export const CopyrightBack = styled.a`
  position: fixed;
  bottom: 3px;
  left: 3px;
  color: ${colors.gray300};
  font-size: 10px;
  text-decoration: none;
  transition: all .3s;

  &:hover {
    color: ${shade(0.2, colors.gray300)};
  }
`;