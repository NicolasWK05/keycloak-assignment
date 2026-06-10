import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://keycloak.local",
  realm: "albertslund-kommune",
  clientId: "sundhedscenter-app",
});

export default keycloak;
