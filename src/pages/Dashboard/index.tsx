import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, isAfter, addHours } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiPower, FiClock, FiPlus } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

import { parseISO } from 'date-fns/esm';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
  ButtonAdd,
  Description,
} from './styles';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Logo from '../../components/Logo';

import Modal from '../../components/Modal';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  description: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar: string;
  };
  provider: {
    name: string;
    avatar: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [descriptionShowed, setDescriptionShowed] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [
    isOpenModalCreateAppointment,
    setIsOpenModalCreateAppoitment,
  ] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleCloseModalCreateAppointment = (): void => {
    setIsOpenModalCreateAppoitment(false);
  };

  const handleOpenModalCreateAppointment = (): void => {
    setIsOpenModalCreateAppoitment(true);
  };

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<Appointment[]>(
        `/appointments/${user.type === 'admin' ? 'admin' : 'me'}`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      )
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => {
          return {
            ...appointment,
            hourFormatted: format(
              addHours(parseISO(appointment.date), 3),
              'HH:mm',
              {
                locale: ptBR,
              },
            ),
          };
        });

        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate, user.type]);

  const handleDescriptionShowed = useCallback(
    value => {
      if (value === descriptionShowed) {
        setDescriptionShowed('');
      } else {
        setDescriptionShowed(value);
      }
    },
    [descriptionShowed],
  );

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments
      .filter(appointment => {
        return parseISO(appointment.date).getHours() + 3 < 12;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments
      .filter(appointment => {
        return parseISO(appointment.date).getHours() + 3 > 12;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment => {
      return isAfter(parseISO(appointment.date), new Date());
    });
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo className="dashboard" />

          <Profile>
            <img src={user.avatar} alt={user.name} />

            <div>
              <span>Bem vindo</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <div>
            <h1>
              {user.type === 'admin'
                ? 'Horários Agendamentos'
                : 'Meus Consultas'}
            </h1>
            {user.type === 'client' && (
              <ButtonAdd onClick={handleOpenModalCreateAppointment}>
                <FiPlus />
              </ButtonAdd>
            )}
          </div>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Atendimento a Seguir</strong>

              <div>
                <img
                  src={
                    user.type === 'admin'
                      ? nextAppointment.user.avatar
                      : nextAppointment.provider.avatar
                  }
                  alt={
                    user.type === 'admin'
                      ? nextAppointment.user.name
                      : nextAppointment.provider.name
                  }
                />

                <strong>
                  {user.type === 'admin'
                    ? nextAppointment.user.name
                    : nextAppointment.provider.name}
                </strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}
          <Section>
            <strong>Manhã</strong>
            {morningAppointments.length === 0 && (
              <p>Nenhum Agendamento nesse período</p>
            )}
            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    src={
                      user.type === 'admin'
                        ? appointment.user.avatar
                        : appointment.provider.avatar
                    }
                    alt={
                      user.type === 'admin'
                        ? appointment.user.name
                        : appointment.provider.name
                    }
                  />

                  <strong>
                    {user.type === 'admin'
                      ? appointment.user.name
                      : appointment.provider.name}
                  </strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>
            {afternoonAppointments.length === 0 && (
              <p>Nenhum Agendamento nesse período</p>
            )}
            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    src={
                      user.type === 'admin'
                        ? appointment.user.avatar
                        : appointment.provider.avatar
                    }
                    alt={
                      user.type === 'admin'
                        ? appointment.user.name
                        : appointment.provider.name
                    }
                  />

                  <div>
                    <strong>
                      {user.type === 'admin'
                        ? appointment.user.name
                        : appointment.provider.name}
                    </strong>

                    {appointment.description && (
                      <Description
                        showAll={descriptionShowed === appointment.id}
                      >
                        <span>{appointment.description}</span>
                        <button
                          type="button"
                          onClick={() =>
                            handleDescriptionShowed(appointment.id)
                          }
                        >
                          {descriptionShowed === appointment.id
                            ? 'Ver Menos'
                            : 'Ver Mais'}
                        </button>
                      </Description>
                    )}
                  </div>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>

      {isOpenModalCreateAppointment && user.type === 'client' && (
        <Modal
          isOpen={isOpenModalCreateAppointment}
          onRequestClose={handleCloseModalCreateAppointment}
        />
      )}
    </Container>
  );
};

export default Dashboard;
