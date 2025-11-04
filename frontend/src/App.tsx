import { Routes, Route } from "react-router";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrierungPage from "./pages/RegistrierungPage";
import AdminBereichPage from "./pages/AdminBereichPage";
import ProtectedLayout from "./layouts/ProtectedLayout";
import NotFoundPage from "./pages/NotFoundPage";
import WarenkorbPage from "./pages/WarenkorbPage";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path=":slug" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registrierung" element={<RegistrierungPage />} />
          <Route path="/warenkorb" element={<WarenkorbPage />} />
          <Route path="/kontodaten" element={<AccountPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/admin-bereich" element={<AdminBereichPage />} />
          </Route>
          <Route path="/nicht-gefunden" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
