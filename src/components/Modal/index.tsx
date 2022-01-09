import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Modal from 'react-modal';
import { format } from 'date-fns';
import { IoMdClose } from 'react-icons/io';
import DayPicker, { DayModifiers } from 'react-day-picker';
import Button from '../Button';

import {
  Container,
  Providers,
  ProviderAvatar,
  ProviderContainer,
  ProviderName,
  Calendar,
  Section,
  SectionTitle,
  Hour,
  HourText,
} from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

export interface Provider {
  id: string;
  name: string;
  avatar: string;
}

interface ModalProfileProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const ModalProfile: React.FC<ModalProfileProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const { addToast } = useToast();

  const [description, setDescription] = useState('');
  const [selectedHour, setSelectedHour] = useState(0);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  useEffect(() => {
    if (selectedProvider) {
      api
        .get(`/providers/${selectedProvider}/month-availability`, {
          params: {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1,
          },
        })
        .then(response => {
          setMonthAvailability(response.data);
        });
    }
  }, [currentMonth, selectedProvider]);

  useEffect(() => {
    async function loadProvider() {
      const { data } = await api.get('/providers');

      setProviders(data);

      if (data.length > 0) {
        setSelectedProvider(data[0].id);
      }
    }

    loadProvider();
  }, []);

  useEffect(() => {
    async function loadAvailability() {
      const response = await api.get(
        `providers/${selectedProvider}/day-availability`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      );

      setAvailability(response.data);
    }

    if (selectedProvider) {
      loadAvailability();
    }
  }, [selectedDate, selectedProvider]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleSelectProvider = useCallback((provider_id: string) => {
    setSelectedProvider(provider_id);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        description,
        provider_id: selectedProvider,
        date: format(date, 'yyyy-MM-dd HH:mm'),
      });

      onRequestClose();

      addToast({
        type: 'success',
        title: 'Agendamento criado!',
        description: 'Seu novo agendamento foi criado com sucesso.',
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao criar o agendamento',
        description: 'Ocorreu um erro ao criar o agendamento, tente novamente.',
      });
    }
  }, [
    description,
    selectedProvider,
    selectedDate,
    selectedHour,
    onRequestClose,
    addToast,
  ]);

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

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content appointment"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <IoMdClose size={28} />
      </button>

      <Container>
        <h3>Selecione um veterinário: </h3>
        <Providers>
          {providers.map(provider => (
            <ProviderContainer
              key={provider.id}
              onClick={() => {
                handleSelectProvider(provider.id);
              }}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar src={provider.avatar} />
              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          ))}
        </Providers>

        <h3>Selecione um dia: </h3>
        <Calendar>
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
        </Calendar>

        <h3>Selecione um horário: </h3>
        <Section>
          <SectionTitle>Manhã</SectionTitle>
          {morningAvailability.map(({ hour, hourFormatted, available }) => (
            <Hour
              disabled={!available}
              selected={selectedHour === hour}
              key={hourFormatted}
              available={available}
              onClick={() => {
                handleSelectHour(hour);
              }}
            >
              <HourText selected={selectedHour === hour}>
                {hourFormatted}
              </HourText>
            </Hour>
          ))}
        </Section>

        <Section>
          <SectionTitle>Tarde</SectionTitle>
          {afternoonAvailability.map(({ hour, hourFormatted, available }) => (
            <Hour
              disabled={!available}
              selected={selectedHour === hour}
              key={hourFormatted}
              available={available}
              onClick={() => {
                handleSelectHour(hour);
              }}
            >
              <HourText selected={selectedHour === hour}>
                {hourFormatted}
              </HourText>
            </Hour>
          ))}
        </Section>

        <Section>
          <SectionTitle>Descrição da Consulta</SectionTitle>
          <textarea
            rows={7}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descreva qual o problema com seu animal"
          />
        </Section>

        <div className="footer">
          <Button
            onClick={handleCreateAppointment}
            disabled={!selectedHour || !description}
          >
            Concluir
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

export default ModalProfile;
