import React, {useEffect, useState} from "react";
import Wrapper from "../../components/Wrapper";
import {Role} from "../../models/Role";
import {Link} from "react-router-dom";
import axios from "axios";
import {Product} from "../../models/Product";
import Paginator from "../../components/Paginator";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`products?page=${page}`);

                setProducts(data.data);
                setLastPage(data.meta.last_page);
            }
        )();
    }, [page]);

    const del = async (id: number) => {
        if(window.confirm("Are you sure you want to delete this record?")) {
            await axios.delete(`products/${id}`);

            setProducts(products.filter((product: Product) => product.id !== id));
        }
    };

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/products/create" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.map((product: Product) => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td><img src={product.image} width={50}/></td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/products/${product.id}/edit `} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            <a href="#" className="btn btn-sm btn-outline-secondary"
                                               onClick={() => del(product.id)}>Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>

            <Paginator page={page} lastPage={lastPage} pageChanged={page => setPage(page)}></Paginator>
        </Wrapper>
    );
};

export default Products;