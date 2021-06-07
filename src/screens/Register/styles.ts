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

export const Form = styled.View`
  flex: 1%;
  justify-content: space-between;
  width: 100%;
  padding: ${RFValue(24)}px;
`;

export const Fields = styled.View`
  /* Este componente foi criado para podermos utilizar   justify-content: space-between;
dentro do form, jogando assim o botão para o final da tela */
`;

export const TransactionTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: ${RFValue(16)}px;
  margin-bottom: ${RFValue(16)}px;
`;
