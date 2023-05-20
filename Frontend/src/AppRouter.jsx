import { Route, Routes, Navigate } from "react-router-dom";
import { UsuarioPage, HotelesPage } from "./hoteles";
import { CreateAccount, LoginPage, isUserAuthenticated } from "./auth";
import { Navbar } from "./components";
import "./styles.css";
import { Home } from "./home/components/Home";
import { RoomsPage } from "./habitaciones/components/RoomsPage";
export const AppRouter = () => {
  return (
    <>
      {isUserAuthenticated() && <Navbar></Navbar>}
      <Routes>
        <Route
          path="/hotels"
          element={
            isUserAuthenticated() ? <HotelesPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/user"
          element={
            isUserAuthenticated() ? <UsuarioPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={!isUserAuthenticated() ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/rooms/:hotelId"
          element={
            isUserAuthenticated() ? <RoomsPage /> : <Navigate to="/login" />
          }
        />

        {/* Ruta para home */}
        <Route
          path="/*"
          element={
            isUserAuthenticated() ? <HotelesPage></HotelesPage> : <Home></Home>
          }
        ></Route>

        {/* Ruta para crear una cuenta */}
        <Route
          path="/createAccount"
          element={
            isUserAuthenticated() ? (
              <Navigate to="/"></Navigate>
            ) : (
              <CreateAccount></CreateAccount>
            )
          }
        ></Route>
      </Routes>
    </>
  );
};
