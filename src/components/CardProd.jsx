import { Link } from "react-router-dom"

const CardProd = ({item, index, modalCallback}) => {
  return (
    <div key={index} className="col-xl-2 col-lg-3 col-md-4 p-2">
        <div className="card card-img shadow-sm h-100">
            <div className="card-header p-0">
                <img className="img-fluid" src={item.images[0]} alt={item.title} />
            </div>
            <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text"><strong>Precio:</strong> {item.price}</p>
                <p className="card-text text-body-secondary">{item.brand}</p>
            </div>
            <div className="card-footer gap-2 d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#fastView" onClick={modalCallback}>Vista Rapida</button>
                <Link to={`/detalle/${item.id}/${item.title}`} className="btn btn-primary">Ver M&aacute;s</Link>
            </div>
        </div>
    </div>
  )
}

export default CardProd