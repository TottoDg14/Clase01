import { useEffect, useState } from "react";
import CardProd from "../components/CardProd";
import ModalProd from "../components/ModalProd";

const API = 'https://dummyjson.com/products?limit=12&skip=';

const Store = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [datos, setDatos] = useState([]);
  const [producto, setProducto] = useState();
  const datoSelected = datos[producto];

  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(12);
  const URI = API + skip;
  const getDatos = async () => {
    try {
      const response = await fetch(URI);
      if (!response.ok)
        throw new Error("HTTP Error: " + response.status);

      const data = await response.json();
      setDatos(data.products);
      setTotal(data.total)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDatos();
  }, [skip]);

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
        <h4>Tienda</h4>
        <div className="d-flex justify-content-between">
          <p className="lead m-0 fw-bold text-sombra text-white">Pagina {Math.floor(skip / pagina) + 1} de {Math.ceil(total / pagina)}</p>
          <nav>
            <ul className="pagination m-0">
              <li className="page-item">
                <a className="page-link" href="#"
                  onClick={() => {
                    if (skip >= pagina) {
                      setSkip(skip - pagina);
                    }
                  }}
                >
                  &lt;&lt;
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  {Math.floor(skip / pagina) + 1}
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#"
                  onClick={() => {
                    if (skip + pagina < total) {
                      setSkip(skip + pagina);
                    }
                  }}
                >
                  &gt;&gt;
                </a>
              </li>
            </ul>
          </nav>
        </div>
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

export default Store