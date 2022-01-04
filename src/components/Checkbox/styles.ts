import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Container = styled.div`
  padding: 8px 0;
  text-align: left;

  display: flex;
  align-items: center;

  .content {
    height: 17px;
    position: relative;

    input {
      height: 16px;
      min-width: 16px;
      cursor: pointer; 
      appearance: none;
      border-radius: 4px;
      margin: 0 12px 0 0;
      border: 1px solid ${colors.gray550};

      &:checked {
        border-color: ${colors.green400};
        background-color: ${colors.green400};
      }
    }

    svg {
      position: absolute;
      cursor: pointer;
      left: 1px;
      top: 2px;
    }
  }

  label {  
    font-size: 15px;
    cursor: pointer;
  }
`;