import { useEffect, useState } from "react";
import CardProd from "../components/CardProd";
import ModalProd from "../components/ModalProd";

const API='https://dummyjson.com/products/category/smartphones';

const Movil = ({carrito, agregarAlCarrito}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [datos, setDatos] = useState([]);
  const [producto, setProducto] = useState();
  const datoSelected = datos[producto];
  const getDatos = async() => {
    try {
      const response = await fetch(API);
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
  }, []);

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
        <h4>Movil</h4>
      </div>

      <ModalProd item={datoSelected} />
      
      <div className="row">
        {datos.map((item, index) => (
          <CardProd key={index} item={item} index={index} modalCallback={() => setProducto(index)} carrito={carrito} agregarAlCarrito={agregarAlCarrito} />
        ))}
      </div>
    </>
  )
}

export default Movil