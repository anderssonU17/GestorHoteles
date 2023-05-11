import { Route, Routes, Navigate } from "react-router-dom";
import { UsuarioPage, HotelesPage } from "../hoteles";
import { LoginPage } from "../auth";
import { Navbar } from '../ui';

export const AppRouter = () => {
  return (
    <>
    <Navbar/>
     <Routes>

        <Route path="hotel" element={<HotelesPage/>} />
        <Route path="usuario" element={<UsuarioPage/>} />

        <Route path="login" element={<LoginPage/>} />

        
        <Route path="/*" element={<Navigate to="/hotel"/>} />

</Routes>
    </>
  )
}
