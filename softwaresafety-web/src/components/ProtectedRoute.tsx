import { Show } from "solid-js";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute(props: any) {
  const auth = useAuth();

  return (
    <Show when={auth.authenticated()} fallback={<p>Login required.</p>}>
      {props.children}
    </Show>
  );
}
