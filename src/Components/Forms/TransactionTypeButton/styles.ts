import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { color } from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
interface IconProps {
  type: "up" | "down";
}

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: ${({ isActive }) => (isActive ? "0px" : "1.5px")} solid
    ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  padding: ${RFValue(16)}px;

  ${({ isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `};
  ${({ isActive, type }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.succes_light};
    `};
`;
export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: ${RFValue(12)}px;

  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;
export const Title = styled.Text`
  font-size: ${RFValue(14)};
  font-family: ${({ theme }) => theme.fonts.regular};
`;
