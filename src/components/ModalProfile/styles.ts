import styled, { css } from 'styled-components';
import { colors } from './../../styles/colors';

interface CheckProps {
  isVisible: boolean;
}

export const Container = styled.div`
  > h2 {
    margin-bottom: 16px;
  }

  > .footer {
    text-align: end;
    margin-top: 20px;

    button {
      width: 160px;
    }
  }
`;

export const Content = styled.div`
  .content-item {
    cursor: pointer;
    margin-top: 20px;
    margin-right: 23px;
    position: relative;
    display: inline-block;

    img {
      width: 116px;
      height: 116px;
      object-fit: cover;
      border-radius: 8px;
    }

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
`;

export const ContentLoading = styled.div`
  display: flex;
  margin-top: 36px;
  align-items: center;
  justify-content: center;
`;

export const CheckContent = styled.div<CheckProps>`
  position: absolute;
  right: -10px;
  top: -10px;
  opacity: 0;

  ${props =>
    props.isVisible &&
    css`
      opacity: 1;
    `
  }
  
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${colors.green400};

  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity .2s;
`;