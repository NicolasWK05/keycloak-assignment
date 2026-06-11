import {
  createContext,
  useContext,
  createSignal,
  onMount,
  Accessor,
  ParentComponent,
} from "solid-js";
import Keycloak from "keycloak-js";

import { keycloak } from "../lib/keycloak";

type AuthContextType = {
  authenticated: Accessor<boolean>;
  initialized: Accessor<boolean>;

  keycloak: Keycloak;
  login: () => void;
  register: () => void;

  logout: () => void;
};

const AuthContext = createContext<AuthContextType>();

export const AuthProvider: ParentComponent = (props) => {
  const [authenticated, setAuthenticated] = createSignal(false);
  const [initialized, setInitialized] = createSignal(false);

  onMount(async () => {
    try {
      const auth = await keycloak.init({
        onLoad: "check-sso",
        pkceMethod: "S256",
      });

      setAuthenticated(auth);

      keycloak.onAuthSuccess = () => setAuthenticated(true);
      keycloak.onAuthLogout = () => setAuthenticated(false);

      console.log("Authenticated:", auth);
    } catch (err) {
      console.error("Keycloak init failed", err);
    } finally {
      setInitialized(true);
    }
  });

  const login = () => {
    keycloak.login();
  };

  const register = () => {
    keycloak.register();
  };

  const logout = () => {
    keycloak.logout({
      redirectUri: "https://softwaresafety.local",
    });
  };
  return (
    <AuthContext.Provider
      value={{
        authenticated,
        initialized,
        keycloak,
        login,
        register,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
}
