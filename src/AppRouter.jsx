import { Route, Routes, Navigate } from "react-router-dom";
import { UsuarioPage, HotelesPage } from "./hoteles";
import { LoginPage, isUserAuthenticated } from "./auth";
import { Navbar } from './components';
import './styles.css'
import { RoomsPage } from "./habitaciones/components/RoomsPage";


export const AppRouter = () => {
    return (
      <>
        {isUserAuthenticated() && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={isUserAuthenticated() ? (
              <HotelesPage />
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route
            path="/usuario"
            element={isUserAuthenticated() ? (
              <UsuarioPage />
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route
            path="/login"
            element={!isUserAuthenticated() ? (
              <LoginPage />
            ) : (
              <Navigate to="/" />
            )}
          />
          <Route
            path="/rooms/:hotelId"
            element={isUserAuthenticated() ? (
              <RoomsPage />
            ) : (
              <Navigate to="/login" />
            )}
          />
        </Routes>
      </>
    );
  };