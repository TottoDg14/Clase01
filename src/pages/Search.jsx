import { useLocation } from 'react-router-dom'
import ModalProd from '../components/ModalProd';
import CardProd from '../components/CardProd';
import { useCallback, useEffect, useState } from 'react';

const API='https://dummyjson.com/products/search?q=';

const Search = ({carrito, agregarAlCarrito}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [datos, setDatos] = useState([]);
    const [producto, setProducto] = useState();
    const datoSelected = datos[producto];

    const location = useLocation();
    const txtBuscar = location.state?.trim() || '';
    const URI = txtBuscar ? API + encodeURIComponent(txtBuscar) : null; 

    const getDatos = useCallback(async() => {
        if (!URI) {
            setError("No se proporcionó un término de búsqueda.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        setDatos([]);

        try {
            const response = await fetch(URI);
            if (!response.ok)
                throw new Error("HTTP Error: " + response.status);

            const data = await response.json();
            setDatos(data.products);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [URI]);

    useEffect(() => {
        if (txtBuscar) {
            getDatos();
        } else {
            // Si no hay búsqueda, mostramos error inmediatamente
            setError("No se proporcionó un término de búsqueda.");
            setLoading(false);
        }
    }, [txtBuscar, getDatos]);

    if (loading) {
        return (
            <p>Cargando...</p>
        );
    }

    if (error) {
        return (
            <p>Oops! {error}</p>
        );
    }

    return (
        <>
            <div className="text-center">
                <h4>Busqueda</h4>
            </div>

            <ModalProd item={datoSelected} />
      
            <div className="row">
                {datos.length > 0 ? (
                    (datos.map((item, index) => (
                    <CardProd key={index} item={item} index={index} modalCallback={() => setProducto(index)} carrito={carrito} agregarAlCarrito={agregarAlCarrito} />
                    )))
                ) : (
                    <p>No hay nada</p>
                )}
            </div>
        </>
    )
}

export default Search