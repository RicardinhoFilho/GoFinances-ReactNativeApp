import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

export const Container = styled.View`
  flex: 1%;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LoadContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Loader = styled(ActivityIndicator).attrs({
  color: "orange",
  size: RFValue(50),
})``;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end; /*Jogar elementos para o final do container*/
  padding-bottom: ${RFValue(19)}px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)};
`;

export const Content = styled.ScrollView`
  // }) //   contentContainerStyle: { flex: 1, padding: RFValue(24) }, //  attrs({
  /* background-color: red;  */
`;

export const ChartContent = styled.View`
  width: 100%;
  align-items: center;

  /* margin-top: -${RFValue(30)}px; */
`;

export const MonthSelector = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  /* padding: 0 ${RFValue(24)}px; */

  margin-top: ${RFValue(24)}px;
`;
export const MonthSelectorButton = styled(BorderlessButton)``;
export const SelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;
export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;
