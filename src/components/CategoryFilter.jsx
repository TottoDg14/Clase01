import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API='https://dummyjson.com/products/categories';
const CategoryFilter = () => {
    const [datos, setDatos] = useState([])
    const getDatos = async () =>{
        try {
            const response = await fetch(API);
            const data = await response.json();
            setDatos(data);
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(()=>{
        getDatos();
    },[]);
    return (
        <>
        {datos && datos.map((item, index) => (
            <li key={index}>
                <Link to={`/categorias/${item.slug}`} className="dropdown-item" href="#">{item.name}</Link>
            </li>
        ))}
        </>
    )
}

export default CategoryFilter