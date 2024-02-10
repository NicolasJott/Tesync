import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import queryString from "query-string";
import React from "react";
import { useStorageState } from "./useStorageState";

type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  refresh: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  refresh: () => null,
  session: null,
  isLoading: false,
});

const client_id = encodeURIComponent(
  process.env.EXPO_PUBLIC_TESLA_CLIENT_ID as string
);
const client_secret = encodeURIComponent(
  process.env.EXPO_PUBLIC_TESLA_CLIENT_SECRET as string
);
const state = encodeURIComponent(process.env.EXPO_PUBLIC_TESLA_STATE as string);
const response_type = encodeURIComponent("code");
const scope = encodeURIComponent(
  "openid offline_access user_data vehicle_device_data vehicle_cmds vehicle_charging_cmds"
);

const redirect_uri = encodeURIComponent(
  "exp://lwn36sy.njott.8081.exp.direct/callback"
);
export const audience = encodeURIComponent(
  "https://fleet-api.prd.na.vn.cloud.tesla.com"
);
const AuthorizeUrl = `https://auth.tesla.com/oauth2/v3/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error(
        "useSession must be wrapped in a <TeslaSessionProvider />"
      );
    }
  }

  return value;
}

export function TeslaSessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const AuthorizeWithTesla = async () => {
    let result = await WebBrowser.openAuthSessionAsync(AuthorizeUrl);

    if (result.type === "success" && result.url) {
      const parsed = queryString.parseUrl(result.url);
      return parsed.query.code as string;
    }

    return "";
  };

  const GetTeslaAccessToken = async (code: string) => {
    const tokenRequestData = `grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&code=${encodeURIComponent(
      code
    )}&redirect_uri=${redirect_uri}&audience=${audience}`;

    try {
      const response = await axios.post(
        "https://auth.tesla.com/oauth2/v3/token",
        tokenRequestData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, refresh_token } = response.data;

      await setTokens(access_token, refresh_token);
    } catch (error) {
      console.error(error);
    }
  };

  const TeslaOAuth = async () => {
    const code: string = await AuthorizeWithTesla();
    if (code) {
      await GetTeslaAccessToken(code);
    }
  };

  const RefreshTeslaAccessToken = async () => {
    console.log("Refreshing Tesla Access Token");
    const refresh_token = await AsyncStorage.getItem("refresh_token");

    if (refresh_token) {
      const encodedRefreshToken = encodeURIComponent(refresh_token);
      const tokenRequestData = `grant_type=refresh_token&client_id=${client_id}&refresh_token=${encodedRefreshToken}`;

      try {
        const response = await axios.post(
          "https://auth.tesla.com/oauth2/v3/token",
          tokenRequestData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const { access_token, refresh_token } = response.data;

        await setTokens(access_token, refresh_token);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const setTokens = async (access_token: string, refresh_token: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    await AsyncStorage.setItem("refresh_token", refresh_token);

    setSession(access_token);
  };

  const signOut = async () => {
    setSession(null);
    await AsyncStorage.removeItem("refresh_token");
    axios.defaults.headers.common["Authorization"] = "";
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          TeslaOAuth();
        },
        signOut: () => {
          signOut();
        },
        refresh: () => {
          RefreshTeslaAccessToken();
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
