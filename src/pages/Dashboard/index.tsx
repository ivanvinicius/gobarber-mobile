import React from 'react';
import { View } from 'react-native';

import Button from '../../components/Button';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
      }}
    >
      <Button onPress={signOut}>Sair</Button>
    </View>
  );
};

export default Dashboard;
