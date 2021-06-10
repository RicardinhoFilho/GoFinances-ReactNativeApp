import React, { useContext, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import { useAuth } from "../../hooks/auth";

import AppleSvg from "../../Assests/apple.svg";
import GoogleSvg from "../../Assests/google.svg";
import LogoSvg from "../../Assests/logo.svg";

import { SignInSocialButton } from "../../Components/SigninSocialButtton";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";
import { ActivityIndicator, Alert, Platform } from "react-native";

export function SignIn() {
  const { user, signInWithGoogle, signInWithApple } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSignInWithGoogle() {
    try {
      setLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível canectar a conta google");
    }
    setLoading(false);
  }

  async function handleSignInWithApple() {
    try {
      setLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível canectar a conta Apple");
    }
    setLoading(false);
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
        </TitleWrapper>
        <Title>
          Controle suas{"\n"}
          finanças de forma{"\n"}
          muito simples
        </Title>
        <SignInTitle>
          Faça seu login {"\n"}
          com uma das opções abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>

        {loading && <ActivityIndicator color="#5636D3" />}
      </Footer>
    </Container>
  );
}
