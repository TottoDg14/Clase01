import { useState, useEffect } from 'react';
import { formatCurrency, formatNumber } from '../utils/funciones';

const ShoppingCart = ({carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, enviarPedido}) => {
    const [total, setTotal] = useState(0);

    // Calcular total cada vez que cambia el carrito
    useEffect(() => {
        const suma = carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
        setTotal(suma);
    }, [carrito]);

    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">Lista de Compras</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {carrito.length === 0 ? (
                    <p className="text-center">Tu carrito está vacío</p>
                ) : (
                    <>
                        {carrito.map((item, index) => {
                            <div key={index} className='card mb-3'>
                                <div className='card-header p-0 text-center'>
                                    <img src={item.thumbnail} alt={item.title} className="img-fluid mb-2"  />
                                </div>
                                <div className='card-body text-center'>
                                    <p className='fs-4'><strong>{item.title}</strong></p> 
                                    <p className='text-warning fw-bold'>Precio: ${formatCurrency(item.price)} x {item.cantidad} = ${formatCurrency((item.price * item.cantidad).toFixed(2))}</p>
                                </div>
                                <div className='card-footer text-center'>
                                    <div className="d-flex justify-content-center gap-3">
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                                        >
                                            + Agregar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                                        >
                                            - Restar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => eliminarDelCarrito(item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        })}
                    </>
                )}
            </div>
        </div>
    )
}

export default ShoppingCart