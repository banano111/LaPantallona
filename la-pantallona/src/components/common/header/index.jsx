import React from 'react';
import { Link } from 'react-router-dom';
import { userLogout } from '../../../services';
import './index.scss';

import Logo from '../../../assets/Logo_LaPantallona.png';
import toast from 'react-hot-toast';

const logout = async () => {
    const response = await userLogout();
    if (!response.hasError) {
        sessionStorage.removeItem("isAuth");
        sessionStorage.removeItem("username");
        toast.success("Sesión Cerrada Correctamente");
        setTimeout(() => { window.location.replace("/login"); }, 1000);
    }

    else {
        toast.error("Error al Intentar hacer Logout")
    }
}

const Header = () => {

    const username = sessionStorage.getItem('username');

    return (
        <>
            <div className="container-fluid border border-light p-1">
                <div className="row d-flex justify-content-between align-items-center">
                    <div className="col">
                        <img className="logo" src={Logo} alt="Logo La Pantallona"/>
                    </div>
                    <div className="col border border-ligth p-1 d-flex justify-content-around nav-links">
                        <Link to="/boletos">Boletos</Link>
                        <Link to="/dulceria">Dulceria</Link>
                        <Link to="/productos">Productos</Link>
                        <Link to="/peliculas">Peliculas</Link>
                        <Link to="/reportes">Reportes</Link>
                    </div>
                    <div className="col d-flex justify-content-end">
                        <button className="btn btn-secondary btn-sm dropdown-toggle me-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Bienvenido, {username}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <Link to="/" className="dropdown-item">Perfil</Link>
                            </li>
                            <li>
                                <Link to="/" className="dropdown-item">Cambiar Contraseña</Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <Link to="#" onClick={() => logout()} className="dropdown-item">Cerrar Sesión</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;