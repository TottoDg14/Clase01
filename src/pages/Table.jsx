import { useEffect, useMemo, useState } from "react";
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight, FaSort, FaSortUp, FaSortDown, FaEye, FaInfoCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";
import ModalProd from "../components/ModalProd";

const API = 'https://dummyjson.com/products?limit=200';

const Table = () => {
    const formatCurrency = (value) => {
        const numericValue = Number(value);
        if (isNaN(numericValue)) {
            return '0,00';
        }
        // Forzar formato con separador de miles siempre
        const parts = numericValue.toFixed(2).split('.');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        const decimalPart = parts[1];
        return `${integerPart},${decimalPart}`;
    };

    const formatNumber = (value) => {
        const numericValue = Number(value);
        if (isNaN(numericValue)) {
            return '0';
        }
        // Formato sin decimales
        const integerValue = Math.round(numericValue);
        return integerValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');

    const [datos, setDatos] = useState([]);
    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok)
                throw new Error("HTTP Error: " + response.status);

            const data = await response.json();
            setDatos(data.products);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = useMemo(() => {
        const cats = datos.map(item => item.category);
        return ['Todas', ...new Set(cats)].sort(); // 'Todas' al inicio
    }, [datos]);

    const categorySummary = useMemo(() => {
        const summary = {};
        datos.forEach(item => {
            if (!summary[item.category]) {
                summary[item.category] = {
                    category: item.category,
                    productCount: 0,
                    totalStock: 0,
                    totalValue: 0,
                    percent: 0
                };
            }
            summary[item.category].productCount += 1;
            summary[item.category].totalStock += Number(item.stock);
            summary[item.category].totalValue += Number(item.price) * Number(item.stock);
        });

        const totalValue = Object.values(summary).reduce((acc, cat) => acc + cat.totalValue, 0);

        Object.values(summary).forEach(cat => {
            cat.percent = (cat.totalValue / totalValue) * 100;
        });

        return Object.values(summary).sort((a, b) => a.category.localeCompare(b.category));
    }, [datos]);

    const globalTotals = useMemo(() => {
        return datos.reduce((acc, item) => {
            acc.productCount += 1;
            acc.totalStock += Number(item.stock);
            acc.totalValue += Number(item.price) * Number(item.stock);
            return acc;
        }, { productCount: 0, totalStock: 0, totalValue: 0 });
    }, [datos]);

    const filteredData = useMemo(() => {
        return datos.filter(item => {
            const matchesSearch = 
                (item.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (item.brand?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (item.category?.toLowerCase() || '').includes(searchTerm.toLowerCase());

            const matchesCategory = selectedCategory === '' || selectedCategory === 'Todas' || item.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [datos, searchTerm, selectedCategory]);

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue === bValue) return 0;

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue, 'es', { numeric: true })
                    : bValue.localeCompare(aValue, 'es', { numeric: true });
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const paginatedData = useMemo(() => {
            const startIndex = (currentPage - 1) * itemsPerPage;
            return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);

    const getPageNumbers = () => {
        const delta = 2; // Cuántos botones a cada lado de la página actual
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
            range.push(i);
        }

        if (range[0] > 1) {
            rangeWithDots.push(1);
            if (range[0] > 2) rangeWithDots.push('...');
        }

        rangeWithDots.push(...range);

        if (range[range.length - 1] < totalPages) {
            if (range[range.length - 1] < totalPages - 1) rangeWithDots.push('...');
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchTerm]);
    
    const [producto, setProducto] = useState();
    const datoSelected = paginatedData[producto];
    
    const totalStock = paginatedData.reduce((sum, item) => sum + Number(item.stock), 0);
    const totalInventoryValue = paginatedData.reduce((sum, item) => sum + Number(item.price) * Number(item.stock), 0);

    if (loading) {
        return (
        <p>Cargando...</p>
        );
    }

    if (error) {
        return (
        <p>Oops! {error}</p>
        );
    }

    return (
        <>
            <div className="text-center">
                <h4>Tabla</h4>
            </div>

            <ModalProd item={datoSelected} />

            <div className="modal fade" id="categoriesModal" tabIndex="-1" aria-labelledby="categoriesModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="categoriesModalLabel">Total por Categorias</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div className="modal-body">

                            <table className="table table-sm table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th>Categoría</th>
                                        <th className="text-center">Productos</th>
                                        <th className="text-center">Stock Total</th>
                                        <th className="text-end">Valor del Inventario</th>
                                        <th className="text-end">%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorySummary.map((cat, index) => (
                                        <tr key={index}>
                                            <td><strong>{cat.category}</strong></td>
                                            <td className="text-center">{cat.productCount}</td>
                                            <td className="text-center">{formatNumber(cat.totalStock)}</td>
                                            <td className="text-end">{formatCurrency(cat.totalValue)}</td>
                                            <td className="text-end">{cat.percent.toFixed(2)}%</td> 
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="table-light fw-bold">
                                    <tr>
                                        <td>Total General</td>
                                        <td className="text-center">{globalTotals.productCount}</td>
                                        <td className="text-center">{formatNumber(globalTotals.totalStock)}</td>
                                        <td className="text-end">{formatCurrency(globalTotals.totalValue)}</td>
                                        <td></td> 
                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="text-end my-3">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#categoriesModal">
                        Total por Categorias
                    </button>
                </div>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="d-flex justify-content-between">
                            <nav>
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => goToPage(1)} disabled={currentPage === 1}>
                                            <FaAngleDoubleLeft />
                                        </button>
                                    </li>
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={prevPage} disabled={currentPage === 1}>
                                            <FaAngleLeft />
                                        </button>
                                    </li>

                                    {getPageNumbers().map((pageNum, index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${pageNum === currentPage ? 'active' : ''} ${pageNum === '...' ? 'disabled' : ''}`}
                                        >
                                            {pageNum === '...' ? (
                                                <span className="page-link">...</span>
                                            ) : (
                                                <button
                                                    className="page-link"
                                                    onClick={() => goToPage(pageNum)}
                                                >
                                                    {pageNum}
                                                </button>
                                            )}
                                        </li>
                                    ))}

                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={nextPage} disabled={currentPage === totalPages}>
                                            <FaAngleRight />
                                        </button>
                                    </li>
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => goToPage(totalPages)}
                                            disabled={currentPage === totalPages}
                                        >
                                            <FaAngleDoubleRight />
                                        </button>
                                    </li>
                                    <li>
                                        <select
                                            value={itemsPerPage}
                                            onChange={(e) => {
                                                setItemsPerPage(Number(e.target.value));
                                                setCurrentPage(1); // Reiniciar a página 1 al cambiar items per page
                                            }}
                                            className="form-select w-auto d-inline-block ms-2"
                                        >
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={30}>30</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </li>
                                </ul>

                            </nav>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <select
                            className="form-select"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map((cat, index) => (
                                <option key={index} value={cat === 'Todas' ? '' : cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Buscar por nombre, marca o categoría..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <table className="table table-dark table-striped table-bordered">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Img</th>
                            <th onClick={() => handleSort('title')}>
                                Nombre
                                {sortConfig.key === 'title' ? (
                                    sortConfig.direction === 'asc' ? <FaSortUp className="ms-2 fs-3" /> : <FaSortDown className="ms-2 fs-3" />
                                ) : (
                                    <FaSort className="ms-2 fs-3" />
                                )}
                            </th>
                            <th onClick={() => handleSort('category')}>
                                Categoria
                                {sortConfig.key === 'category' ? (
                                    sortConfig.direction === 'asc' ? <FaSortUp className="ms-2 fs-3" /> : <FaSortDown className="ms-2 fs-3" />
                                ) : (
                                    <FaSort className="ms-2 fs-3" />
                                )}
                            </th>
                            <th onClick={() => handleSort('brand')}>
                                Marca
                                {sortConfig.key === 'brand' ? (
                                    sortConfig.direction === 'asc' ? <FaSortUp className="ms-2 fs-3" /> : <FaSortDown className="ms-2 fs-3" />
                                ) : (
                                    <FaSort className="ms-2 fs-3" />
                                )}
                            </th>
                            <th onClick={() => handleSort('price')} className="text-end">
                                Precio
                                {sortConfig.key === 'price' ? (
                                    sortConfig.direction === 'asc' ? <FaSortUp className="ms-2 fs-3" /> : <FaSortDown className="ms-2 fs-3" />
                                ) : (
                                    <FaSort className="ms-2 fs-3" />
                                )}
                            </th>
                            <th onClick={() => handleSort('stock')} className="text-end">
                                Stock
                                {sortConfig.key === 'stock' ? (
                                    sortConfig.direction === 'asc' ? <FaSortUp className="ms-2 fs-3" /> : <FaSortDown className="ms-2 fs-3" />
                                ) : (
                                    <FaSort className="ms-2 fs-3" />
                                )}
                            </th>
                            <th className="text-end">Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {paginatedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td className="text-center"><img src={item.thumbnail} alt={item.title} width={50} /></td>
                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td>{item.brand}</td>
                                <td className="text-end">{item.price}</td>
                                <td className="text-end">{formatNumber(item.stock)}</td>
                                <td className="text-end">{formatCurrency(item.stock * item.price)}</td>
                                <td>
                                    <Link to={`/detalle/${item.id}/${item.title}`} href="#"
                                        className="btn btn-sm btn-outline-primary me-2"
                                        title="Ver detalle"
                                    >
                                        <FaEye />
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        title="Más información"
                                        data-bs-toggle="modal" 
                                        data-bs-target="#fastView" 
                                        onClick={() => setProducto(index)}
                                    >
                                        <FaInfoCircle />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="table-secondary">
                        <tr className="text-end">
                            <td colSpan={6}>Total:</td>
                            <td className="text-end">{formatNumber(totalStock)}</td>
                            <td className="text-end">{formatCurrency(totalInventoryValue)}</td>
                            <td className="text-center"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default Table