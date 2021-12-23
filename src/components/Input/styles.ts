import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';
import { colors } from '../../styles/colors';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  caret-color: ${colors.white};
  background: ${colors.gray750};
  border-radius: 10px;
  border: 2px solid ${colors.gray750};

  color: ${colors.gray550};
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: ${colors.red400};
    `}

  ${props =>
    props.isFocused &&
    css`
      color: ${colors.green400};
      border-color: ${colors.green400};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${colors.green400};
    `}

  input {
    flex: 1;
    border: 0;
    color: ${colors.gray200};

    background: transparent;

    &:placeholder {
      color: ${colors.gray550};
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${colors.white};
      -webkit-box-shadow: 0 0 0px 1000px ${colors.gray750} inset;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin-right: 0;
  }

  span {
    background: ${colors.red400};
    color: ${colors.white};

    &::before {
      border-color: ${colors.red400} transparent;
    }
  }
`;
