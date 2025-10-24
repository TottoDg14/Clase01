import { Link, useLocation, useNavigate } from "react-router-dom"
import CategoryFilter from "./CategoryFilter"
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCart from "./ShoppingCart";

const Header = ({carrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito}) => {
    const [txtbuscar, setTxtbuscar] = useState('');

    const manejoTxt = (event) => {
        setTxtbuscar(event.target.value);
    };

    const navigate = useNavigate();

    const manejoEnvio = (event) => {
        event.preventDefault();

        if (!txtbuscar.trim()) {
            alert("Por favor, ingresa un término de búsqueda.");
            return;
        }

        navigate('/busquedas', {
            state: txtbuscar,
        });
        setTxtbuscar('');
    };
    
    const location = useLocation();
    const linkActive = location.pathname;

    return (
        <>
            <header className="navbar navbar-expand-lg bg-body-tertiary align-items-start">
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

                <button 
                    className={`btn me-3 ${carrito.length > 0 ? 'btn-outline-warning' : ''}`}
                    type="button" data-bs-toggle="offcanvas" 
                    data-bs-target="#offcanvasRight" 
                    aria-controls="offcanvasRight">
                    <div className="d-flex justify-content-between align-items-center gap-2">
                        <FaShoppingCart size={30} /> 
                        {carrito.length > 0 && (<span className="badge bg-danger m-1">{carrito.length}</span> )}
                    </div>
                </button>

            </header>

            <ShoppingCart 
                carrito={carrito} 
                agregarAlCarrito={agregarAlCarrito}
                eliminarDelCarrito={eliminarDelCarrito}
                actualizarCantidad={actualizarCantidad}
                vaciarCarrito={vaciarCarrito}
            />
        </>
    )
}

export default Header