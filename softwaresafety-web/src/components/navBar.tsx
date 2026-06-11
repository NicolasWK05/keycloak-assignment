import { Show } from "solid-js";
import { A } from "@solidjs/router";
import { useAuth } from "../context/authContext";

export default function Navbar() {
  const auth = useAuth();

  return (
    <nav class="bg-blue-900 text-white shadow">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="font-bold text-lg">Software Safety Sundhedscenter</h1>

        <div class="flex items-center gap-4">
          <A href="/">Home</A>

          <Show when={auth.authenticated()}>
            <A href="/activities">Activities</A>
          </Show>

          <Show
            when={auth.authenticated()}
            fallback={
              <div class="flex gap-2">
                {/* Exercise 1 */}

                <button
                  class="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
                  onClick={auth.login}
                >
                  Login + MFA
                </button>

                <button
                  class="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
                  onClick={auth.register}
                >
                  Register + MFA
                </button>
              </div>
            }
          >
            <div class="flex items-center gap-3">
              <span class="text-sm">
                {auth.keycloak.tokenParsed?.preferred_username as string}
              </span>

              <button
                class="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                onClick={auth.logout}
              >
                Logout
              </button>
            </div>
          </Show>
        </div>
      </div>
    </nav>
  );
}
