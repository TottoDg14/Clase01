import Carrusel from "../components/Carrusel"
import img1 from '../assets/img01.jpg';
import img2 from '../assets/img02.jpg';
import img3 from '../assets/img03.jpg';

const Home = () => {
  return (
    <>
      <Carrusel />
      <div className="container">
        <div className="text-center py-3">
          <h4>Herramientas utilizadas</h4>
        </div>
        <div className="row">
          <div className="col-md-6 align-content-center text-end">
            <p><b>React es una biblioteca de JavaScript utilizada para construir interfaces de usuario tanto en la web como en aplicaciones nativas.</b> Fue desarrollada por Facebook en 2013 y se ha convertido en una de las <span className="text-success">bibliotecas más populares</span> para el desarrollo de interfaces de usuario.</p>
            <p>Es importante destacar que React no es un framework completo de JavaScript, sino una biblioteca enfocada en la capa de vista de una aplicación. Esto significa que React se puede utilizar junto con otras bibliotecas o frameworks para construir aplicaciones completas.</p>
            <a href="https://react.dev/" className="btn btn-primary" target="_blank">Ir a la web oficicial de React</a>
          </div>
          <div className="col-md-6">
            <img src={img1} className="img-fluid img-thumbnail" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <img src={img2} className="img-fluid img-thumbnail" />
          </div>
          <div className="col-md-6 align-content-center text-start">
            <p><b>DummyJSON es una herramienta que proporciona una API REST falsa de datos JSON para el desarrollo,</b> pruebas y prototipos. Con DummyJSON, puedes obtener rápidamente datos realistas para tus proyectos de front-end sin tener que configurar un servidor complicado. Es perfecto para el desarrollo de front-end, la enseñanza, las pruebas y la creación de prototipos. Puedes explorar la documentación detallada en DummyJSON/Docs para obtener ejemplos rápidos.</p>
            <p>DummyJSON también ofrece endpoints específicos para diferentes recursos, como productos, publicaciones, usuarios, imágenes, autenticación, entre otros. Estos endpoints te permiten obtener datos específicos para tus necesidades de desarrollo.</p>
            <a href="https://dummyjson.com//" className="btn btn-primary" target="_blank">Ir a la web oficicial de DummyJSON</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home