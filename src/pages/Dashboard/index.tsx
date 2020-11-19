import React, { useCallback, useEffect, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
} from './styles';

export interface IProvidersProps {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  // const { navigate } = useNavigation();
  const [providers, setProviders] = useState<IProvidersProps[]>([]);

  const navigateToProfile = useCallback(() => {
    // navigate('Profile');
    signOut();
  }, [signOut]);

  useEffect(() => {
    api.get('providers').then(response => setProviders(response.data));
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,{'\n'}{/*eslint-disable-line*/}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        renderItem={({ item }) => (
          <>
            <UserName>{item.name}</UserName>
            <UserAvatar source={{ uri: item.avatar_url }} />
          </>
        )}
      />
    </Container>
  );
};

export default Dashboard;
