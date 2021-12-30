import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding:0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: ${colors.gray600};
    color: ${colors.white};
    -webkit-font-smoothin: antialiased;
  }

  body, button, input {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    inset: 0 0 0 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    width: 100%;
    max-width: 772px;

    background: ${colors.gray600};
    padding: 3rem;

    margin: 0 1rem;
    position: relative;
    border-radius: 0.24rem;

    &.appointment {
      max-width: 532px;
      height: 90%;
      overflow: auto;

      /* width */
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        border-radius: 10px;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #3e3b47;
        border-radius: 10px;
      }
    }
  }

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;

    transition: filter .2s;
    background: transparent;

    svg {
      color: ${colors.white}
    }

    &:hover {
      filter: brightness(0.8);
    }
  }
`;
