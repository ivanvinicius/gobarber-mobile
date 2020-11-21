import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Text } from 'react-native';
import { format } from 'date-fns';

import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles';

interface IRouteParams {
  id: string;
}

export interface IProvidersProps {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
}

interface IDayAvailabilityProps {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const navigate = useNavigation();
  const { user } = useAuth();
  const { id } = route.params as IRouteParams;
  const [providers, setProviders] = useState<IProvidersProps[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(id);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayAvailability, setDayAvailability] = useState<IDayAvailabilityProps[]>([]); //eslint-disable-line

  const morningAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour < 12)
      .map(({ available, hour }) => ({
        hour,
        available,
        formattedHour: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [dayAvailability]);

  const afternoonAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour >= 12)
      .map(({ available, hour }) => ({
        hour,
        available,
        formattedHour: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [dayAvailability]);

  const navigateToDashboard = useCallback(() => {
    navigate.goBack();
  }, [navigate]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  const handleDateChange = useCallback(
    (event: any, newDate: Date | undefined) => { //eslint-disable-line
      if (Platform.OS === 'android') setShowDatePicker(state => !state);

      if (newDate) setSelectedDate(newDate);
    },
    [],
  );

  useEffect(() => {
    api.get('providers').then(response => setProviders(response.data));
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => setDayAvailability(response.data));
  }, [selectedDate, selectedProvider]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateToDashboard}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <Title>Escolha a data</Title>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            onChange={handleDateChange}
            value={selectedDate}
            mode="date"
            display="calendar"
          />
        )}
      </Calendar>

      {morningAvailability.map(({ formattedHour, available }) => (
        <Text>
          {formattedHour}
          {String(available)}
        </Text>
      ))}
      <Text>-----------------------</Text>
      {afternoonAvailability.map(({ formattedHour, available }) => (
        <Text>
          {formattedHour}
          {String(available)}
        </Text>
      ))}
    </Container>
  );
};

export default CreateAppointment;
