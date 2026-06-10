import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
// import NavBar from "~/components/NavBar";
import "./app.css";
import Navbar from "~/components/NavBar";
import { AuthProvider } from "./context/AuthContext";

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
