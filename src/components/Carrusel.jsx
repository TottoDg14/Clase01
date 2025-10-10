import img1 from '../assets/bg01.jpg';
import img2 from '../assets/bg02.jpg';
import img3 from '../assets/bg03.jpg';

const Carrusel = () => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={img1} className="d-block w-100" />
                </div>
                <div className="carousel-item">
                    <img src={img2} className="d-block w-100" />
                </div>
                <div className="carousel-item">
                    <img src={img3} className="d-block w-100" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Proximo</span>
            </button>
        </div>
    )
}

export default Carrusel