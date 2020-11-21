import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { IProvidersProps } from './index';

interface IProviderContainerProps {
  selected: boolean;
}
interface IProviderNameProps {
  selected: boolean;
}

export const Container = styled.View``;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 24px;
  background-color: #28262e;

  ${Platform.OS === 'ios' &&
  css`
    padding-top: ${getStatusBarHeight() + 24}px;
  `}
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f4ede8;
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const ProvidersListContainer = styled.View``;

export const ProvidersList = styled(
  FlatList as new () => FlatList<IProvidersProps>,
)`
  padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<IProviderContainerProps>`
  background-color: #3e3d47;

  ${props =>
    props.selected &&
    css`
      background-color: #ff9000;
    `}

  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<IProviderNameProps>`
  color: #f4ede8;
  ${props =>
    props.selected &&
    css`
      color: #232129;
    `}

  margin-left: 8px;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background-color: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #232129;
  font-size: 16px;
`;
