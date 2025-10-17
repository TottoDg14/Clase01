import { useLocation } from 'react-router-dom'
import ModalProd from '../components/ModalProd';
import CardProd from '../components/CardProd';
import { useEffect, useState } from 'react';

const API='https://dummyjson.com/products/search?q=';

const Search = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [datos, setDatos] = useState([]);
    const [producto, setProducto] = useState();
    const datoSelected = datos[producto];

    const location = useLocation();
    const query = location.state;
    const URI = API + query;
    const getDatos = async() => {
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
    };

    useEffect(() => {
        getDatos();
    }, [query]);

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
                {datos.map((item, index) => (
                <CardProd key={index} item={item} index={index} modalCallback={() => setProducto(index)} />
                ))}
            </div>
        </>
    )
}

export default Search