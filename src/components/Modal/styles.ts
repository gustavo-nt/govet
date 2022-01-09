import { shade } from 'polished';
import styled from 'styled-components';
import { colors } from '../../styles/colors';

interface ProviderProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

export const Container = styled.div`
  > h3 {
    margin: 16px 0;

    &:first-child {
      margin-top: 0;
    }
  }

  > .footer {
    text-align: end;
    margin-top: 20px;

    button {
      width: 160px;
    }
  }
`;

export const Providers = styled.div`
  display: flex;
  overflow-x: scroll;
  padding-bottom: 8px;

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
`;

export const ProviderContainer = styled.button<ProviderProps>`
  display: flex;
  background: ${props => (props.selected ? colors.green400 : '#3e3b47')};
  align-items: center;
  flex-direction: row;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
  border: none;
  outline: none;
`;

export const ProviderAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.p<ProviderProps>`
  margin-left: 8px;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
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
`;

export const Section = styled.div`
  margin-bottom: 24px;

  textarea {
    width: 100%;
    resize: vertical;

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
  }
`;

export const SectionTitle = styled.h4`
  font-size: 18px;
  color: #999591;
  margin: 0 24px 12px;
  margin-left: 0;
`;

export const Hour = styled.button<HourProps>`
  padding: 12px;
  background: ${props => (props.selected ? colors.green400 : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;
  outline: none;
  border: none;

  opacity: ${props => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.span<Omit<HourProps, 'available'>>`
  color: ${props => (props.selected ? '#232129' : '#f4ede0')};
  font-size: 16px;
`;
