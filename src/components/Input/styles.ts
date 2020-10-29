import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface IContainerProps {
  isFocused: boolean;
}

interface IIconProps {
  isFilled: boolean;
  isFocused: boolean;
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-style: solid;
  border-color: #232129;

  border-radius: 10px;
  background-color: #232129;

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const Icon = styled(FeatherIcon)<IIconProps>`
  margin-right: 16px;
  color: #666360;
  font-size: 20px;

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
