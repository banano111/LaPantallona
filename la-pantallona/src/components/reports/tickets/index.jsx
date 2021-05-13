import React, { Component } from 'react';
import { getTicketSales } from '../../../services';
import './index.scss';

export default class TicketReport extends Component {

    constructor() {
        super();
        this.state = {
            sales: [],
            isReady: false,
            hasError: false,
            error: null,
        };
    }

    componentDidMount = async () => {
        const sales = await getTicketSales();
        if (!sales.hasError) {
            this.setState({
                sales,
                isReady: true
            })
        }

        else{
            this.setState({
                hasError: true,
                error: sales.error
            })
        }
    }

    render() {
        const { sales, isReady, error, hasError } = this.state;
        
        return (
            <>
                <div className="container p-4 mt-5 w-75">
                    <div className="row">
                        <div className="col">
                            <a href="/reportes" className="btn btn-primary me-4">Reporte de Boletos</a>
                            <a href="/reportesProductos" className="btn btn-success">Reporte de Productos</a>
                        </div>
                    </div>
                    <div className="row p-3 table-detail mt-4">
                        <div className="col d-flex align-items-center">
                            <h4 className="text-light">Reporte de Venta de Boletos</h4>
                        </div>
                    </div>
                    <div className="row table-principal">
                        <div className="col">
                            <table className="table table-striped table-hover mt-2">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ID Venta</th>
                                    <th scope="col">Hora de la Venta</th>
                                    <th scope="col">Total de Boletos</th>
                                    <th scope="col">Total $</th>
                                    <th scope="col">ID Empleado</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        isReady ?
                                            <ListComponent 
                                                ticketSales={sales}
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
            props.ticketSales.length > 0 ?
                props.ticketSales.map((ticketSale, index ) => (
                    <ProductCard
                        ticketSale={ticketSale}
                        index={index}
                    />
                ))
                : <p>No hay Ninguna Venta de Boletos Registrada</p>
        }
    </>
)

const ProductCard = ({ ticketSale, index }) => (
    <>
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{ticketSale.ID_venta}</td>
            <td>{ticketSale.Hora.slice(0, -3)}</td>
            <td>{ticketSale.TotalBoletos}</td>
            <td>${ticketSale.TotalVenta}</td>
            <td>{ticketSale.ID_usuario}</td>
        </tr>
    </>
);

const ErrorComponent = ({ error }) => (
    <>
        <p>Ups! Algo Fallo al traer las Ventas</p>
        <p>{error}</p>
    </>
);
