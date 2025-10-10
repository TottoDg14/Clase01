const ModalProd = ({item}) => {
  return (
    <div className="modal fade" id="fastView">
        <div className="modal-dialog modal-xl">
            <div className="modal-content">
            {item && (
                <>
                    <div className="modal-header">
                        <h5 className="modal-title fs-5">{item.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={item.thumbnail} alt="" className="img-fluid" />
                            </div>
                            <div className="col-md-8">
                                <p className="fs-3">{item.title}</p>
                                <p className="fs-3">Categoria: {item.category}</p>
                                {item.brand && (<p className="fs-3">Marca: {item.brand}</p>)}
                                <p className="fs-3">Existencia: {item.stock}</p>
                                <p className="fs-6">{item.description}</p>
                                <p className="fs-5 text-danger fw-bold">Precio: {item.price}$</p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </>
            )}
            </div>
        </div>
    </div>
  )
}

export default ModalProd