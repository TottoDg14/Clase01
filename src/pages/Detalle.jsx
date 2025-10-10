import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

const API = 'https://dummyjson.com/products/';

const Detalle = () => {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { id, title } = useParams();
  const URI = API + id;
  const getProduct = async () => {
    try {
      const res = await fetch(URI); // https://dummyjson.com/products/1 
      if (!res.ok) throw new Error(`Error al cargar datos (status: ${res.status})`);
      const data = await res.json();
      setProducto(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando detalles del producto</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h4>Hubo un problema al cargar los datos</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Volver
        </button>
      </div>
      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          <img className="img-fluid" src={producto.images[0]} alt={producto.title} />
        </div>
        <div className="col-md-6">
          <h1 className="h2 mb-3">{producto.title}</h1>
          <div className="mb-3">
            <span className="h4 me-2">{producto.price}</span>
            <span className="text-muted text-decoration-line-through">{parseFloat(producto.price * (producto.discountPercentage / 100 + 1)).toFixed(2)}</span>
            <span className="badge bg-danger ms-2">{producto.discountPercentage}% OFF</span>
          </div>

          <div className="mb-3">
            <div className="d-flex align-items-center">
              <div className="text-warning me-2">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <span className="text-muted">({producto.reviews.length} comentarios)</span>
            </div>
          </div>

          <p className="mb-4">{producto.description}</p>

          {/* <div className="mb-4">
            <h6 className="mb-2">Color</h6>
            <div className="btn-group" role="group">
              <input type="radio" className="btn-check" name="color" id="silver" checked />
              <label className="btn btn-outline-secondary" for="silver">Silver</label>
              <input type="radio" className="btn-check" name="color" id="gold" />
              <label className="btn btn-outline-secondary" for="gold">Gold</label>
              <input type="radio" className="btn-check" name="color" id="black" />
              <label className="btn btn-outline-secondary" for="black">Black</label>
            </div>
          </div>

          <div className="mb-4">
            <div className="d-flex align-items-center">
              <label className="me-2">Quantity:</label>
              <select className="form-select w-auto">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div> */}

          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="button">Add to Cart</button>
            <button className="btn btn-outline-secondary" type="button">
              <i className="far fa-heart me-2"></i>Add to Wishlist
            </button>
          </div>

          <div className="mt-4">
            <div className="d-flex align-items-center mb-2">
              <i className="fas fa-truck text-primary me-2"></i>
              <span>{producto.returnPolicy}</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <i className="fas fa-undo text-primary me-2"></i>
              <span>{producto.warrantyInformation}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="fas fa-shield-alt text-primary me-2"></i>
              <span>{producto.shippingInformation}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Detalle