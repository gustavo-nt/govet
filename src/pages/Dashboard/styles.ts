import styled, { css } from 'styled-components';

import { shade } from 'polished';
import { colors } from '../../styles/colors';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px;
  background: ${colors.gray700};
`;

export const HeaderContent = styled.div`
  max-width: 1028px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: ${colors.gray500};
      width: 20px;
      height: 20px;
    }
  }

  @media(max-width: 500px) {
    justify-content: space-between;

    button {
      margin-left: 0;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: ${colors.gray200};
    }

    a {
      text-decoration: none;
      color: ${colors.green400};

      &:hover {
        opacity: 0.8;
      }
    }
  }

  @media(max-width: 500px) {
    margin-left: 0;
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  padding: 0 16px;
  display: flex;

  @media(max-width: 800px) {
    padding: 0;
    margin: 32px 16px;
    flex-direction: column;
  }
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 110px;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: ${colors.green400};
    display: flex;

    font-weight: 500;
    align-items: center;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 16px;
      background: ${colors.green400};
      margin: 0 8px;
    }
  }

  @media(max-width: 930px) {
    h1 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 290px;
    }
  }

  @media(max-width: 800px) {
    margin-right: 0;

    h1 {
      font-size: 32px;
      white-space: normal;
      width: auto;
    }
  }

  @media(max-width: 600px) {
    h1 {
      font-size: 28px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: ${colors.gray650};
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: ${colors.gray500} !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: ${colors.gray700};
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: ${colors.gray200};

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: ${colors.gray650};
    border-radius: 10px;
    color: ${colors.white};
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, colors.gray650)};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: ${colors.green400} !important;
    border-radius: 10px;
    color: #232129 !important;
  }

  @media(max-width: 800px) {
    width: 500px;
    margin-top: 32px;
    margin-left: auto;
    margin-right: auto;
  }

  @media(max-width: 600px) {
    width: 100%;
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: ${colors.gray500};
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: ${colors.gray650};
    display: flex;
    align-items: center;

    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;

    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      width: 1px;

      left: 0;
      top: 10%;
      content: '';

      background: ${colors.green400};
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: ${colors.white};
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: ${colors.gray500};

      svg {
        color: ${colors.green400};
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: ${colors.gray500};
    font-size: 20px;
    line-height: 26px;

    border-bottom: 1px solid ${colors.gray650};
    display: block;
    padding-bottom: 16px;

    margin-bottom: 16px;
  }

  > p {
    color: ${colors.gray500};
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: ${colors.gray200};
    width: 70px;

    svg {
      color: ${colors.green400};
      margin-right: 8px;
    }
  }

  & + div {
    margin-top: 16px;
  }

  > div {
    flex: 1;
    background: ${colors.gray650};
    display: flex;

    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;

    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      font-size: 20px;
      color: ${colors.white};
    }

    div {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const Description = styled.div<{
  showAll: boolean;
}>`
  span {
    font-size: 14px;
    margin-top: 4px;
    padding: 0 24px;
    width: auto;

    ${props =>
      !props.showAll &&
      css`
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      `}
  }

  button {
    background: transparent;
    width: auto;
    border: none;
    margin-left: 24px;
    max-width: 85px;
    margin-top: 4px;
    color: ${colors.green400};
  }
`;

export const ButtonAdd = styled.button`
  background: ${colors.green400};
  border-radius: 12px;
  width: 40px;
  height: 40px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  svg {
    color: ${colors.white};
    font-size: 1.15rem;
  }

  &:hover {
    background: ${shade(0.2, colors.green400)};
  }
`;
