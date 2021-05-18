import React, { Component } from 'react';
import { getProducts, deleteProduct } from '../../../services';
import './index.scss';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isReady: false,
            hasError: false,
            error: null,
            isdeleteProduct: 0
        };
    };

    componentDidMount = async () => {
        const products = await getProducts();
        if (!products.hasError) {
            this.setState({
                products,
                isReady: true,
            })
        }

        else {
            this.setState({
                hasError: true,
                error: products.error
            })
        }
    }

    componentDidUpdate = async (prevProps) => {
        if (prevProps.isdeleteProduct !== this.state.isdeleteProduct) {
            const products = await getProducts();
            if (!products.hasError) {
                this.setState({
                    products,
                    isReady: true,
                })
            }

            else {
                this.setState({
                    hasError: true,
                    error: products.error
                })
            }
        }
    }

    deleteProduct = async (buttonProductId) => {
        if (window.confirm('¿Deseas Eliminar esta Producto?')) {
            try {
                const productId = buttonProductId;
                const response = await deleteProduct(productId);
                console.log(response)
                if (!response.hasError) {
                    toast.success("Producto Eliminado Correctamente");
                    let counter = this.state.isdeleteProduct + 1
                    this.setState({ 
                        isdeleteProduct: counter
                    })
                }

                else {
                    toast.error("Error al intentar Eliminar el Producto");
                    console.log(response);
                }

            } catch (error) {
                toast.error("Error al intentar Eliminar el Producto");
                console.log(error)
            }
        }

    }

    render() {

        const { products, isReady, error, hasError } = this.state;

        return (
            <>
                <div className="container rounded p-4 w-75 mt-5">
                    <div className="row p-3 table-detail">
                        <div className="col d-flex align-items-center">
                            <h4 className="text-light">Catálogo de Productos</h4>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <Link to="/productos/nuevoproducto" className="btn btn-success">
                                <span className="me-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                </span>
                                Agregar nuevo Producto
                            </Link>
                        </div>
                    </div>
                    <div className="row table-principal">
                        <div className="col">
                            <table className="table table-striped table-hover mt-2">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Área</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Stock</th>
                                        <th className="text-center w-25" scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isReady ?
                                            <ListComponent
                                                products={products}
                                                deleteProduct={this.deleteProduct}
                                            />
                                            :
                                            hasError ?
                                                <ErrorComponent
                                                    error={error}
                                                />
                                                : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
};

const ListComponent = (props) => (
    <>
        {
            props.products.length > 0 ?
                props.products.map((product, index) => (
                    <ProductCard
                        product={product}
                        index={index}
                        deleteProduct={props.deleteProduct}
                    />
                ))
                : <p>No hay ningun producto registrada</p>
        }
    </>
)

const ProductCard = ({ product, index, deleteProduct }) => (
    <>
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{product.Nombre}</td>
            <td>{product.Area}</td>
            <td>{product.Precio}</td>
            <td>{product.Stock}</td>
            <td className="d-flex justify-content-center">
                <Link to={`/productos/editarproducto/${product.ID_producto}`} className="btn btn-sm btn-warning me-2 text-dark">
                    <i className="bi bi-pencil-fill"></i>
                </Link>
                <button className="btn btn-sm btn-danger me-2 text-light" onClick={() => deleteProduct(product.ID_producto)}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </td>
        </tr>
    </>
);

const ErrorComponent = ({ error }) => (
    <>
        <p>Ups! Algo Fallo al traer los productos</p>
        <p>{error}</p>
    </>
);
