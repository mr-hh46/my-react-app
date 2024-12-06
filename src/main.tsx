import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./AuthProvider.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Settings from "./pages/Settings.tsx";
import NoMatch from "./pages/NoMatch.tsx";
import MainPage from "./pages/MainPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Router basename="/react">
        <Routes>
          <Route path="/" element={<App />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>
);
