import React, { Component } from 'react';
import toast from 'react-hot-toast';
import { createProduct, getProduct, updateProduct } from '../../../services';

export default class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newProduct: {
                id: 0,
                nombre: "",
                descripcion: "",
                stock: "",
                precio: "",
                tipo: "",
                area: "",
                imagen: ""
            },
            isCreate: false,
            isReady: false
        }
    }

    componentDidMount = async () => {
        if (this.props.match.params.productId) {
            //Actualizar
            try {
                const { productId } = this.props.match.params;
                const data = await getProduct(productId);
                let producto = {};
                data.map((product) => (
                    producto = product
                ))
                if (!data.hasError) {
                    this.setState({
                        newProduct: {
                            id: producto.ID_producto,
                            nombre: producto.Nombre,
                            descripcion: producto.Descripcion,
                            stock: producto.Stock,
                            precio: producto.Precio,
                            tipo: producto.Tipo,
                            area: producto.Area,
                            imagen: producto.Imagen
                        },
                        isReady: true
                    })
                }

            } catch (error) {
                console.log(error);
            }
        } else {
            //Crear
            this.setState({
                isReady: true,
                isCreate: true
            })
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { newProduct } = this.state;
        newProduct[name] = value;
        this.setState({
            newProduct
        })
    }

    handleSubmit = async () => {
        const { newProduct, isCreate } = this.state;
        const successResponse =
            isCreate
                ? 'Producto Creado con Exito'
                : 'Producto Editado con Exito'

        const errorResponse =
            isCreate
                ? 'Algo Fallo al crear el Producto'
                : 'Algo Fallo al editar el Producto'

        try {
            newProduct.stock = parseInt(newProduct.stock);
            newProduct.precio = parseFloat(newProduct.precio).toFixed(2);
            const result = await 
                    isCreate ?
                        createProduct(newProduct)
                        : updateProduct(newProduct)

            console.log(result)
            if (!result.hasError) {
                toast.success(successResponse);
                this.props.history.push('/productos');
            }

            else {
                toast.error(errorResponse);
            }

        } catch (error) {
            toast.error("Ocurrio un error en el servidor");
        }
    }

    render() {
    
        const { nombre, descripcion, stock, precio, area, imagen } = this.state.newProduct
        const { isCreate, isReady, hasError } = this.state
       
        const formTitle = isCreate
            ? 'Alta de Nuevo Producto'
            : 'Edición de Producto'

        const textButton = isCreate
            ? 'Añadir Producto'
            : 'Guardar Cambios'

        return (
            <>
                {
                    isReady ?
                            <div className="container mt-3 w-50 p-5">
                            <div className="row p-3 detail">
                                <h4 className="text-light">{formTitle}</h4>
                            </div>
                            <div className="row p-3 principal">
                                <div className="col mt-3">
                                    <div>
                                        <label className="form-label">Nombre del Producto</label>
                                        <input type="text" className="form-control" name="nombre" value={nombre} onChange={(event) => this.handleChange(event)} required />
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3 principal">
                                <div className="col">
                                    <div>
                                        <label className="form-label">Descripcion</label>
                                        <input type="text" className="form-control" name="descripcion" value={descripcion} onChange={(event) => this.handleChange(event)} required />
                                    </div>
                                </div>
                                <div className="col">
                                    <div>
                                        <label className="form-label">Stock</label>
                                        <input type="number" className="form-control" name="stock" value={stock} onChange={(event) => this.handleChange(event)} required />
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3 principal">
                                <div className="col">
                                    <div>
                                        <label className="form-label">Precio</label>
                                        <input type="number" className="form-control" name="precio" value={precio} onChange={(event) => this.handleChange(event)} />
                                        <div className="form-text">Ingresar cantidad en numeros sin caracteres especiales</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div>
                                        <label className="form-label">Area de Venta</label>
                                        <input type="text" className="form-control" name="area" value={area} onChange={(event) => this.handleChange(event)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3 principal">
                                <div className="col">
                                    <div>
                                        <label className="form-label">Imagen del Producto</label>
                                        <input className="form-control" type="text" name="imagen" value={imagen} onChange={(event) => this.handleChange(event)}/>
                                        <div className="form-text">Ingresar la dirección de una imagen en Linea</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3 principal">
                                <div className="col mt-3">
                                    <button type="button" className="btn btn-secondary" onClick={() => this.handleSubmit()}>{textButton}</button>
                                </div>
                            </div>
                        </div>
                        : hasError 
                                    ?
                                        <p>Este Coso Tiene un error</p>
                                    : null
                }
            </>
        )
    };
};
