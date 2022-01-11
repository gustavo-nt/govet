import styled, { css } from 'styled-components';

import { shade } from 'polished';
import { colors } from '../../styles/colors';

export const Container = styled.div`
  font-family: 'Kaushan Script', sans-serif;
  color: ${shade(0.2, colors.green400)};;
  transition: all .3s;
  position: relative;
  font-size: 50px;
  cursor: pointer;
  z-index: 0;

  ${props =>
    props.className === 'dashboard' &&
    css`
      font-size: 40px;
  `}

  > span {
    position: relative;
    left: -6px;

    &:before {
      content: "";
      height: 6px;
      width: 6px;
      border-radius: 50%;
      background: ${colors.green400};
      transition: all .3s;
      position: absolute;
      z-index: 1;
      top: -5px;
      left: 50%;
    }

    &:after {
      content: "";
      height: 6px;
      width: 6px;
      border-radius: 50%;
      background: ${colors.green400};
      transition: all .3s;
      position: absolute;
      bottom: -8px;
      z-index: 1;
      right: 45%;
    }
  }

  &:before {
    content: "";
    height: 1px;
    width: 100%;
    background: ${shade(0.4, colors.green400)};
    transition: all .3s;
    position: absolute;
    top: -3px;
    left: 0;
  }

  &:after {
    content: "";
    height: 1px;
    width: 100%;
    background: ${shade(0.4, colors.green400)};
    transition: all .3s;
    position: absolute;
    bottom: -5px;
    left: 0;
  }

  &:hover {
    color: ${colors.green400};

    &:before,
    &:after {
      background: ${shade(0.1, colors.green400)};
    }
  }
`;