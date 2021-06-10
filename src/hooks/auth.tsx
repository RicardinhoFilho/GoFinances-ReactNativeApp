import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import * as Google from "expo-google-app-auth";
import * as AppleAuthentication from "expo-apple-authentication";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthContextData {
  user: IUser;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userLoading: boolean;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

const AuthContext = createContext({} as IAuthContextData);

const userStorageKey = "@gofinances:user";

function AuthProvider({ children }: IAuthProviderProps) {
  const [] = useState();
  const [user, setUser] = useState({} as IUser);
  const [loading, setLoading] = useState(true);

  async function signInWithGoogle(): Promise<void> {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "232987097616-gffgl7kf9d0esni99b3s0s2jqmvrtqht.apps.googleusercontent.com",
        androidClientId:
          "232987097616-pdetdveeph8eu6tn3up0nu391itf0m31.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));

        // console.log(user);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signInWithApple(): Promise<void> {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: undefined,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
      await AsyncStorage.removeItem(userStorageKey);
    }
  }

  async function signOut() {
    setUser({} as IUser);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as IUser;
        setUser(userLogged);
      }

      
    }
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userLoading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
