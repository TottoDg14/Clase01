// zona de importacion

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Movil from "./pages/Movil"
import Laptop from "./pages/Laptop"
import Tienda from "./pages/Tienda"
import Detalle from "./pages/Detalle"
import Category from "./pages/Category"

const App = () => {
  // zona de logica
  
  
  // zona de renderizado
  return (
    <BrowserRouter>
      <div className="app">
        <Header/>
        <div className="container-fluid py-3">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/inicio" element={<Home/>}/>
            <Route path="/movil" element={<Movil/>}/>
            <Route path="/laptop" element={<Laptop/>}/>
            <Route path="/tienda" element={<Tienda/>}/>
            <Route path="/categorias/:category" element={<Category/>}/>
            <Route path="/detalle/:id/:title" element={<Detalle/>}/>
            <Route path="*" element={'404 - No se encontro el contenido.'}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App