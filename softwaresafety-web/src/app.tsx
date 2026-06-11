import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Navbar from "./components/navBar";
import { AuthProvider } from "./context/authContext";
import "./app.css";

export default function App() {
  return (
    <AuthProvider>
      <Router
        root={(props) => (
          <>
            <Navbar />
            <Suspense>{props.children}</Suspense>
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </AuthProvider>
  );
}
