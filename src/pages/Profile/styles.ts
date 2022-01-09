import styled from 'styled-components';

import { shade } from 'polished';
import { colors } from '../../styles/colors';

export const Container = styled.div`
  flex-direction: column;

  > header {
    height: 144px;
    background: ${colors.gray700};
    display: flex;

    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: ${colors.gray500};
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  align-items: center;
  justify-content: center;
  margin: -176px 0 auto;

  form {
    margin: 80px 0%;
    width: 340px;

    display: flex;
    flex-direction: column;

    h1 {
      font-size: 20px;
      text-align: left;
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

    input[name='old_password'] {
      margin-top: 24px;
    }
  }
`;

export const AvatarInput = styled.div`
  cursor: pointer;
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  .edit-image {
    position: relative;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    > div {
      position: absolute;
      right: -5px;
      top: -3px;

      opacity: 0;
      padding: 6px 8px;
      border-radius: 50%;
      background: #666360;
      transition: opacity .2s;

      svg {
        width: 16px;
        height: 14px;
      }
    }

    &:hover {
      > div {
        opacity: 1;
      }
    }
  }

  label {
    width: 58px;
    height: 58px;
    cursor: pointer;
    margin-bottom: 28px;

    border-radius: 50%;
    background: ${colors.green400};

    border: 0;
    transition: background-color 0.2;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 22px;
      height: 22px;
      color: ${colors.gray600};
    }

    input {
      display: none;
    }

    &:hover {
      background: ${shade(0.2, colors.green400)};
    }
  }
`;