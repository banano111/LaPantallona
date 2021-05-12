import React, { Component } from 'react';
import toast from 'react-hot-toast';
import { getProducts, productSale } from '../../../services';
import './index.scss'

export default class ProductSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isReady: false,
            hasError: false,
            error: null,
            total: 0,
            productSale: [],
            isProductSale: false,
            totalDulceria: 0,
            totalCafeteria: 0,
            idUsuario: 2,
        }
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

    clearSale = () => {
        this.setState({
            total: 0,
            productSale: [],
            isProductSale: false,
            totalCafeteria: 0,
            totalDulceria: 0
        })
    }

    productPresentation = (productName, productPrice, productArea) => {
        const { total, productSale, totalDulceria, totalCafeteria } = this.state;
        
        productSale.push(productName);
        
        if (productArea === "Dulceria") {
            this.setState({
                productSale: productSale,
                total: total + productPrice,
                totalDulceria: totalDulceria + productPrice,
                isProductSale: true
            })
        }
        
        else {
            this.setState({
                productSale: productSale,
                total: total + productPrice,
                totalCafeteria: totalCafeteria + productPrice,
                isProductSale: true
            })
        }

    }
    
    handleSubmit = async () => {
        const { total, totalCafeteria, totalDulceria, idUsuario } = this.state;
        var today = new Date(),
        time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let sale = {
            hora: time,
            total: parseInt(total),
            totalCafeteria: parseInt(totalCafeteria),
            totalDulceria: parseInt(totalDulceria),
            idUsuario: parseInt(idUsuario)
        }

        if (total > 0) {
            try {
                const result = await productSale(sale);;
                if (!result.hasError) {
                    toast.success("Venta Generada Con Exito");
                    this.clearSale();
                } else {
                    toast.error("Error al Intentar la Venta");
                }
            } catch (error) {
                toast.error("Ocurrio un error en el servidor" + error);
            }
        } else {
            toast.error("Error al Intentar la Venta");
        }
    }

    render() {
        const { products, isReady, error, hasError, total, productSale, isProductSale } = this.state;

        return (
            <>
                <div class="container-fluid mt-5">
                    <div class="row">
                        <div class="col-9">
                            <div class="row row-cols-3">
                                {   isReady ?
                                        <ListComponent
                                            products={products}
                                            productPresentation={this.productPresentation}
                                        />
                                        :
                                        hasError ?
                                            <ErrorComponent
                                                error={error}
                                            />
                                            : null
                                }
                            </div>
                        </div>
                        <div class="col me-4">
                            <div class="row d-flex flex-column">
                                <div class="col table-detail text-white text-center py-3">
                                    <p className="h3">Venta de Productos</p>
                                </div>
                                <div class="col table-principal">
                                    <div class="p-3 efecto-gris mt-3">
                                        {
                                            isProductSale ?
                                                            productSale.map((productName) => (
                                                                <p>1 {productName}</p>
                                                            ))
                                                            : null
                                        }
                                    </div>
                                    <hr />
                                </div>
                                <div class="col table-principal text-center">
                                    <p className="fs-4 fw-bold">Total: ${total}</p>
                                    <hr />
                                </div>
                                <div class="col d-flex justify-content-around table-principal py-3 mb-2">
                                    <button className="btn btn-success" onClick={() => this.handleSubmit()}>Generar Venta</button>
                                    <button className="btn btn-danger" onClick={() => this.clearSale()}>Cancelar</button>
                                </div>
                            </div>
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
                props.products.map((product) => (
                    <ProductCard
                        product={product}
                        productPresentation={props.productPresentation}
                    />
                ))
                : <p>No hay ningun producto registrado</p>
        }
    </>
)

const ProductCard = ({ product, productPresentation }) => (
    <>

        <div class="col d-flex justify-content-center mb-5">
            <div class="card card-width card-width">
                <img src={product.Imagen} class="card-img-top imagen-card" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{product.Nombre}</h5>
                    <button className="btn btn-primary" onClick={() => productPresentation(product.Nombre, product.Precio, product.Area) }>${product.Precio}</button>
                </div>
            </div>
        </div >

    </>
);

const ErrorComponent = ({ error }) => (
    <>
        <p>Ups! Algo Fallo al traer los productos</p>
        <p>{error}</p>
    </>
);