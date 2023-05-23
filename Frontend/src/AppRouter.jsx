import { Route, Routes, Navigate } from "react-router-dom";
import { HotelesPage } from "./hoteles";
import { CreateAccount, LoginPage, isUserAuthenticated } from "./auth";
import { Navbar } from "./components";
import "./styles.css";
import { Home } from "./home/components/Home";
import { RoomsPage } from "./habitaciones/components/RoomsPage";
import { userIsAdmin } from "./auth/helpers/UserAdmin";
import { CreateHotel } from "./hoteles/pages/CreateHotel";
import { GraphicsPage } from "./hoteles/pages/GraphicsPage";
import { UsuarioPage } from "./user/components/UsuarioPage";
import { AllUsers } from "./user/components/AllUsers";

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

          {/* Ruta para agregar hotel, si el usuario no esta logueado lo envia al login, si el usuario no es admin lo envia a
          hoteles */}
          <Route
          path="/createHotel"
          element={
            isUserAuthenticated() ? <CreateHotel></CreateHotel> : <Navigate to='/'></Navigate>
          }></Route>

          {/* Ruta para graficas */}
          <Route
          path="/graphicsHotels"
          element={
            isUserAuthenticated() ? <GraphicsPage></GraphicsPage> : <Navigate to='/'></Navigate>
          }
          ></Route>
          {/* Ruta para visualizar todos los usuarios */}
          <Route
          path="/view-all-users"
          element={
            isUserAuthenticated() ? <AllUsers></AllUsers> : <Navigate to={'/'}></Navigate>
          }>
          </Route>

      </Routes>
    </>
  );
};
