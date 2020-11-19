import styled, { css } from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { IProvidersProps } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  background-color: #28262e;

  ${Platform.OS === 'ios' &&
  css`
    padding-top: ${getStatusBarHeight() + 24}px;
  `}

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const ProvidersList = styled(
  FlatList as new () => FlatList<IProvidersProps>,
)``;
