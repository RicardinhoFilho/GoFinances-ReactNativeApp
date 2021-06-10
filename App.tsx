import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";

import "intl";
import "intl/locale-data/jsonp/pt-BR";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import AppLoading from "expo-app-loading";

import { Routes } from "./src/Routes";
import { AppRoutes } from "./src/Routes/app.routes";
import { SignIn } from "./src/screens/Signin";

import { AuthProvider,useAuth} from "./src/hooks/auth";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const {userLoading} = useAuth()

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      
        <StatusBar barStyle="light-content" />
        {/* <AppRoutes /> */}
        <AuthProvider>
        <Routes/>
        </AuthProvider>
        
    </ThemeProvider>
  );
}
