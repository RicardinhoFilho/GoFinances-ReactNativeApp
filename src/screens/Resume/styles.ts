import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1%;
  background-color: ${({ theme }) => theme.colors.background};
`;

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

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: { flex: 1, padding: RFValue(24) },
})`
  /* background-color: red;  */
`;

export const ChartContent = styled.View`
  width: 100%;
  align-items: center;

  margin-top: -${RFValue(30)}px;
`;
