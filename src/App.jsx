// zona de importacion

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Movil from "./pages/Movil"
import Laptop from "./pages/Laptop"
import Store from "./pages/Store"
import Detalle from "./pages/Detalle"
import Category from "./pages/Category"
import Search from "./pages/Search"
import Table from "./pages/Table"
import { useEffect, useState } from "react"

const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (e) {
    console.error("Error al cargar el carrito:", e);
    localStorage.removeItem("cart");
  }
  return [];
};

const App = () => {
  // zona de logica
  const [carrito, setCarrito] = useState(getInitialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(carrito));
  }, [carrito]);

  // Esta función agrega un producto al carrito de compras.
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => { 
      // Ver si ya existe en el carrito
      const existe = prev.find(item => item.id === producto.id); 
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ); 
      } else {
        // Agregar nuevo producto con cantidad 1
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
       setCarrito(prev => prev.filter(item => item.id !== id));
  };

  // Función para actualizar cantidad
  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCarrito(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };


  // Función para vaciar carrito
  const vaciarCarrito = () => {
    const confirmacion = window.confirm("¿Está seguro de que desea vaciar el carrito?");
    if (confirmacion) {
      setCarrito([]);
    }
  };

  // zona de renderizado
  return (
    <BrowserRouter>
      <div className="app">
        <Header 
          carrito={carrito}
          agregarAlCarrito={agregarAlCarrito}
          eliminarDelCarrito={eliminarDelCarrito}
          actualizarCantidad={actualizarCantidad}
          vaciarCarrito={vaciarCarrito}
        />
        <div className="container-fluid py-3">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/inicio" element={<Home/>}/>
            <Route path="/movil" element={<Movil/>}/>
            <Route path="/laptop" element={<Laptop/>}/>
            <Route path="/tienda" element={<Store carrito={carrito} agregarAlCarrito={agregarAlCarrito} />}/>
            <Route path="/tabla" element={<Table/>}/>
            <Route path="/categorias/:category" element={<Category/>}/>

            <Route path="/detalle/:id/:title" element={<Detalle/>}/>
            <Route path="/busquedas" element={<Search/>}/>
            <Route path="*" element={'404 - No se encontro el contenido.'}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App