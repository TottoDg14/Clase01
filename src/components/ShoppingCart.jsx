import { useState, useEffect } from 'react';
import { formatCurrency, formatNumber } from '../utils/funciones';
import { FaEraser, FaMinus, FaPlus } from 'react-icons/fa';

const ShoppingCart = ({carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, enviarPedido}) => {
    const [total, setTotal] = useState(0);

    // Calcular total cada vez que cambia el carrito
    useEffect(() => {
        const suma = carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
        setTotal(suma);
    }, [carrito]);

    return (
        <div className="offcanvas offcanvas-end" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">Lista de Compras</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body pb-0">
                {carrito.length === 0 ? (
                    <p className="text-center">Tu carrito está vacío</p>
                ) : (
                    <>
                        {carrito.map((item, index) => (
                            <div key={index} className='card mb-3'>
                                <div className='card-header p-0 text-center'>
                                    <button 
                                        className="position-absolute top-0 end-0 btn btn-outline-danger m-2" 
                                        onClick={() => eliminarDelCarrito(item.id)}
                                    >
                                        <FaEraser size={15} />
                                    </button>
                                    <img src={item.thumbnail} alt={item.title} className="img-fluid mb-2"  />
                                </div>
                                <div className='card-body text-center'>
                                    <p className='fs-4'><strong>{item.title}</strong></p> 
                                    <p className='text-warning fw-bold'>Precio: ${formatCurrency(item.price)} x {item.cantidad} = ${formatCurrency((item.price * item.cantidad).toFixed(2))}</p>
                                </div>
                                <div className='card-footer text-center'>
                                    <div className="d-flex justify-content-center gap-3">
                                        <div className=' btn-group'>
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                                            >
                                                Agregar
                                                <FaPlus className='ms-2' />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                                            >
                                                Elminar
                                                <FaMinus className='ms-2' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                <div className="position-sticky bg-dark bottom-0 mt-3 py-3">
                    <hr />
                    <div className='container-fluid'>
                        <table className='w-100'>
                            <tbody>
                                <tr>
                                    <th className='text-start'>Total Productos:</th>
                                    <td className='text-end'>{formatNumber(carrito.reduce((acc, item) => acc + item.cantidad, 0))}</td>
                                </tr>
                                <tr>
                                    <th className='text-start'>Total a Pagar:</th>
                                    <td className='text-end'>${formatCurrency(total.toFixed(2))}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-3">
                        <button
                            className="btn btn-danger w-100 mb-2"
                            onClick={vaciarCarrito}
                        >
                            Vaciar Carrito
                        </button>
                        <button onClick={enviarPedido} className="btn btn-primary w-100">
                        📤 Enviar Pedido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart