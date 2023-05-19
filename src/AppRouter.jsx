import { Route, Routes, Navigate } from "react-router-dom";
import { UsuarioPage, HotelesPage } from "./hoteles";
import { LoginPage, isUserAuthenticated } from "./auth";
import { Navbar } from './components';
import './styles.css'
export const AppRouter = () => {
    return(
        <>
        {isUserAuthenticated() && <Navbar></Navbar>}
            <Routes>
                <Route 
                path="/" 
                element={
                    isUserAuthenticated() ? (
                    <HotelesPage/>
                    ) : (
                        <Navigate to="/login"></Navigate>
                        )
                        }
                        ></Route>
                <Route 
                path="/usuario" 
                element={
                    isUserAuthenticated() ? (
                    <UsuarioPage/>
                    ) : (
                        <Navigate to="/login"></Navigate>
                        )
                        }
                        ></Route>
                    
                <Route 
                path="login"
                element={
                    !isUserAuthenticated() ? (
                    <LoginPage></LoginPage> 
                    ) : (
                    <Navigate to="/"></Navigate>
                    )
                    }
                    ></Route>
                    <Route
                    path="/hotel"
                    exact Component={HotelesPage}
                    >

                    </Route>
            </Routes>  
        </>
    );
};