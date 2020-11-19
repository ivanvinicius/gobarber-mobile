import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

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
