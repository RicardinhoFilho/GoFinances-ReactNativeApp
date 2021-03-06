import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(70)};

  background-color: ${({ theme }) => theme.colors.primary};

  /* flex-direction: row; */
  justify-content:flex-end;
  align-items: center;
`;

export const TitleWrapper = styled.Text`
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.shape};
    font-size:${RFValue(30)}px;

    text-align:center;

    margin-top:${RFValue(45)}px;
`;

export const SignInTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
    font-size:${RFValue(16)}px;

    margin-top:${RFValue(80)}px;
    margin-bottom:${RFValue(67)}px;

    text-align:center;
`;
export const Footer = styled.View`
    width: 100%;
    height:${RFPercentage(30)};

    background-color: ${({ theme }) => theme.colors.secondary};
`;


export const FooterWrapper = styled.View`
  margin-top:${RFPercentage(-4)}px;
  padding: 0 ${RFValue(32)}px;

  justify-content:space-between;;

  /* background-color:red; */
`;