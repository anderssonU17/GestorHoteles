import { Link, NavLink, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';


export const Navbar = () => {

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className= {({isActive}) =>`nav-item nav-link ${isActive ? 'active':''}`}
                        to="/hotel"
                    >
                        Hoteles
                    </NavLink>

                    <NavLink 
                        className= {({isActive}) =>`nav-item nav-link ${isActive ? 'active':''}`}
                        to="/usuario"
                    >
                        Usuario
                    </NavLink>

                    <NavLink 
                        className= {({isActive}) =>`nav-item nav-link ${isActive ? 'active':''}`}
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span className='nav-item nav-link text-primary'>
                        Andersson
                    </span>
                    <Link
                    className='nav-link'
                    to="/login"
                    onClick={() => cerrarSesion()}
                    >
                    <LogoutIcon fontSize="medium"></LogoutIcon>
                    </Link>
                </ul>
            </div>
        </nav>
    )
}