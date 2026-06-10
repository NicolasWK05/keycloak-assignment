import { Show } from "solid-js";
import { A } from "@solidjs/router";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const auth = useAuth();

  return (
    <nav class="bg-blue-900 text-white">
      <div class="container mx-auto px-4 py-4 flex justify-between">
        <div class="font-bold">Software Safety Sundhedscenter</div>

        <div class="space-x-4">
          <A href="/">Home</A>

          <Show when={auth.authenticated()}>
            <A href="/activities">Activities</A>
          </Show>

          <Show
            when={auth.authenticated()}
            fallback={
              <>
                <button onClick={() => auth.keycloak.login()}>Login</button>

                <button onClick={() => auth.keycloak.register()}>
                  Register
                </button>
              </>
            }
          >
            <button
              onClick={() =>
                auth.keycloak.logout({
                  redirectUri: "https://softwaresafety.local",
                })
              }
            >
              Logout
            </button>
          </Show>
        </div>
      </div>
    </nav>
  );
}
