import { Link, useLocation, useNavigate } from "react-router-dom"
import CategoryFilter from "./CategoryFilter"
import { useState } from "react";

const Header = () => {
    const [txtbuscar, setTxtbuscar] = useState('');

    const manejoTxt = (event) => {
        setTxtbuscar(event.target.value);
    };

    const navigate = useNavigate();
    const manejoEnvio = (event) => {
        event.preventDefault();
        navigate('/busquedas', {
            state: txtbuscar,
        });
    };
    
    const location = useLocation();
    const linkActive = location.pathname;

    return (
        <header className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${linkActive == '/inicio' ? 'active' : ''}`} aria-current="page" to={"/inicio"}>Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${linkActive == '/movil' ? 'active' : ''}`} aria-current="page" to={"/movil"}>Movil</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${linkActive == '/laptop' ? 'active' : ''}`} aria-current="page" to={"/laptop"}>Laptop</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${linkActive == '/tienda' ? 'active' : ''}`} aria-current="page" to={"/tienda"}>Tienda</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categorias
                            </a>
                            <ul className="dropdown-menu">
                                <CategoryFilter />
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${linkActive == '/tabla' ? 'active' : ''}`} aria-current="page" to={"/tabla"}>Tabla</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" onSubmit={manejoEnvio}>
                        <input value={txtbuscar} onChange={manejoTxt} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </header>
    )
}

export default Header