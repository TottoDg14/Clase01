const Footer = () => {
    return (
        <footer className="bd-footer py-4 py-md-5 bg-body-tertiary">
            <div className="container px-4 px-md-3 text-body-secondary">
                <div className="row mb-2">
                    <h2>Primera Clase</h2>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-3">
                        <ul className="list-unstyled small">
                            <li className="mb-2">Entorno de Desarrollo</li>
                            <ul>
                                <li className="mb-1">Visual Code</li>
                                <li className="mb-1">Node</li>
                                <li className="mb-1">Vite</li>
                                <li className="mb-1">Bootstrap</li>
                            </ul>
                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <ul className="list-unstyled small">
                            <li className="mb-2">Fundamentos</li>
                            <ul>
                                <li className="mb-1">Componentes</li>
                                <li className="mb-1">Estados</li>
                                <li className="mb-1">Render Condicional</li>
                                <li className="mb-1">Fetch API</li>
                            </ul>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <h6>- David Marquez</h6>
                </div>
            </div>
        </footer>
    )
}

export default Footer