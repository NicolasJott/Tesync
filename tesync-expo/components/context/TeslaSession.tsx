import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import queryString from "query-string";
import React from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

const client_id = encodeURIComponent("0ff2ce810511-4dd3-8bbe-1a8b50cebdd2");
const client_secret = encodeURIComponent("ta-secret.bhpd5JiQV0c1@Pb&");
const state = encodeURIComponent(process.env.EXPO_PUBLIC_TESLA_STATE as string);
const response_type = encodeURIComponent("code");
const scope = encodeURIComponent(
  "openid offline_access user_data vehicle_device_data vehicle_cmds vehicle_charging_cmds"
);

const redirect_uri = encodeURIComponent(
  "exp://lwn36sy.njott.8081.exp.direct/callback"
);
const audience = encodeURIComponent(
  "https://fleet-api.prd.na.vn.cloud.tesla.com"
);
const AuthorizeUrl = `https://auth.tesla.com/oauth2/v3/authorize?response_type=${encodeURIComponent(
  response_type
)}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;

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
    const data = `grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&code=${encodeURIComponent(
      code
    )}&redirect_uri=${redirect_uri}&audience=${audience}`;

    try {
      const response = await axios.post(
        "https://auth.tesla.com/oauth2/v3/token",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      setSession(response.data.access_token);
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

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          TeslaOAuth();
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
