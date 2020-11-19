import React, { useCallback, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
} from './styles';

interface IRouteParams {
  id: string;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const navigate = useNavigation();
  const { user } = useAuth();
  const { id } = route.params as IRouteParams;

  const navigateToDashboard = useCallback(() => {
    navigate.goBack();
  }, [navigate]);

  useEffect(() => {
    api.get('/providers');
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateToDashboard}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
    </Container>
  );
};

export default CreateAppointment;
