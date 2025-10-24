import { useEffect, useState } from "react";
import CardProd from "../components/CardProd";
import ModalProd from "../components/ModalProd";
import { useParams } from "react-router-dom";

const API='https://dummyjson.com/products/category/';

const Category = ({carrito, agregarAlCarrito}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [datos, setDatos] = useState([]);
  const [producto, setProducto] = useState();
  const datoSelected = datos[producto];

  const {category} = useParams();
  const URI = API + category;
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
  }, [category]);

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
        <h4 className="text-capitalize">{category.replace('-', ' ')}</h4>
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

export default Category