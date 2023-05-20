import { Route, Routes, Navigate } from "react-router-dom";
import { UsuarioPage, HotelesPage } from "./hoteles";
import { CreateAccount, LoginPage, isUserAuthenticated } from "./auth";
import { Navbar } from './components';
import './styles.css'
import { Home } from "./home/components/Home";
export const AppRouter = () => {
    return(
        <>
        {isUserAuthenticated() && <Navbar></Navbar>}
            <Routes>
                <Route 
                path="/*" 
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
                element={
                    isUserAuthenticated() ? (
                    <HotelesPage></HotelesPage> 
                    ) : (
                    <Navigate to="/login"></Navigate>
                    )
                    }
                    ></Route>

                    {/* Ruta para home */}
                <Route 
                path="/"
                element={
                    isUserAuthenticated() ? (
                        <HotelesPage></HotelesPage>
                    ):
                    (   
                        <Home></Home>
                    )
                }
                ></Route>

                {/* Ruta para crear una cuenta */}
                <Route
                path="/createAccount"
                element={
                    isUserAuthenticated() ? (
                        <Navigate to='/'></Navigate>
                    ):(
                        <CreateAccount></CreateAccount>
                    )
                }
                ></Route>
            </Routes>  
        </>
    );
};