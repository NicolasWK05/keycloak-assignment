import { createContext, useContext, createSignal, onMount } from "solid-js";

import keycloak from "../lib/keycloak";

const AuthContext = createContext();

export function AuthProvider(props: any) {
  const [authenticated, setAuthenticated] = createSignal(false);

  onMount(async () => {
    const auth = await keycloak.init({
      onLoad: "check-sso",
      pkceMethod: "S256",
    });

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
