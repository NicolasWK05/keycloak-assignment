import {
  createContext,
  useContext,
  createSignal,
  onMount,
  Accessor,
} from "solid-js";
import Keycloak from "keycloak-js";

import keycloak from "../lib/keycloak";

type AuthContextType = {
  authenticated: Accessor<Boolean>;
  keycloak: Keycloak;
};

const AuthContext = createContext<AuthContextType>();

export function AuthProvider(props: any) {
  const [authenticated, setAuthenticated] = createSignal(false);

  onMount(async () => {
    const auth = await keycloak.init({
      onLoad: "check-sso",
      pkceMethod: "S256",
    });

    console.log("authenticated?", auth);
    console.log("token", keycloak.token);

    setAuthenticated(auth);
  });

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        keycloak,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
