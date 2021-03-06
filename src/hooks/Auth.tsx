/* eslint-disable @typescript-eslint/ban-types */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface IAuthState {
  token: string;
  user: IUserProps;
}

interface IUserData {
  email: string;
  password: string;
}

interface IUserProps {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
}

interface IAuthContext {
  user: IUserProps;
  signIn(userData: IUserData): Promise<void>;
  signOut(): void;
  updateUser(user: IUserProps): Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDataFromAsyncStorage(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBaber:token',
        '@GoBaber:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadDataFromAsyncStorage();
  }, []);

  const signIn = useCallback(async ({ email, password }: IUserData) => {
    const response = await api.post('/sessions', { email, password });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBaber:token', token],
      ['@GoBaber:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBaber:token', '@GoBaber:user']);

    setData({} as IAuthState);
  }, []);

  const updateUser = useCallback(
    async (user: IUserProps) => {
      await AsyncStorage.setItem('@GoBaber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
