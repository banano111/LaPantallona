import React, { Component } from 'react';
import toast from 'react-hot-toast';
import { getMovies, ticketSale } from '../../../services';
import './index.scss'

export default class TicketSales extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            movieName: "",
            movieSalaTime: "",
            Precio: 0,
            PrecioNino: 0,
            total: 0,
            totalTickets: 0,
            ticketSr: 0,
            isTicketSr: false,
            isTicketJr: false,                
            ticketJr: 0,
            isReady: false,
            hasError: false,
            error: null,
            idUsuario: 2
        };
    };

    componentDidMount = async () => {
        const movies = await getMovies();
        if (!movies.hasError) {
            this.setState({
                movies,
                isReady: true,
            })
        }

        else {
            this.setState({
                hasError: true,
                error: movies.error
            })
        }
    }

    cancelSale = () =>{
        this.setState({
            movieName: "",
            Precio: 0,
            PrecioNino: 0,
            ticketJr: 0,
            ticketSr: 0,
            isTicketJr: false,
            isTicketSr: false,
            total: 0,
            totalTickets: 0,
            movieSalaTime: ""
        })
    }
    
    ticketSrAdd = () => {
        const numberTickets = this.state.ticketSr;
        const valueTotalTickets = this.state.totalTickets;
        const valueTotal = this.state.total;
        const Precio = this.state.Precio;

        this.setState({
            ticketSr: numberTickets + 1,
            isTicketSr: true,
            totalTickets: valueTotalTickets + 1,
            total: valueTotal + Precio
        })
    }

    ticketJrAdd = () => {
        const numberTickets = this.state.ticketJr;
        const valueTotalTickets = this.state.totalTickets;
        const valueTotal = this.state.total;
        const PrecioNino = this.state.PrecioNino;


        this.setState({
            ticketJr: numberTickets + 1,
            isTicketJr: true,
            totalTickets: valueTotalTickets + 1,
            total: valueTotal + PrecioNino
        })
    }

    ticketSrless = () => {
        const numberTickets = this.state.ticketSr;
        const valueTotalTickets = this.state.totalTickets;
        const valueTotal = this.state.total;
        const Precio = this.state.Precio;


        if (valueTotalTickets > 0 & numberTickets > 0) {
            this.setState({
                totalTickets: valueTotalTickets - 1,
                total: valueTotal - Precio
            })
        }

        if (numberTickets > 0) {
            this.setState({
                ticketSr: numberTickets - 1
            })
        }

        if (numberTickets === 1) {
            this.setState({
                isTicketSr: false
            })
        }

    }
    
    ticketJrless = () => {
        const numberTickets = this.state.ticketJr;
        const valueTotalTickets = this.state.totalTickets;
        const valueTotal = this.state.total;
        const PrecioNino = this.state.PrecioNino;


        if (valueTotalTickets > 0 && numberTickets > 0 ) {
            this.setState({
                totalTickets: valueTotalTickets - 1,
                total: valueTotal - PrecioNino
            })
        }


        if (numberTickets > 0) {
            this.setState({
                ticketJr: numberTickets - 1
            })
        }
        
        if (numberTickets === 1) {
            this.setState({
                isTicketJr: false
            })
        }
    }

    selectedMovie = (movieSelected, movieTime, Precio, PrecioNino) => {
        this.setState({
            movieName: movieSelected,
            movieSalaTime: movieTime,
            Precio: Precio,
            PrecioNino: PrecioNino
        })
    }

    handleSubmit = async () => {
        const { total, idUsuario, totalTickets } = this.state;
        var today = new Date(),
        time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let sale = {
            hora: time,
            total: parseInt(total),
            totalBoletos: parseInt(totalTickets),
            idUsuario: parseInt(idUsuario),
        }

        try {
            console.log(sale);
            const result = await ticketSale(sale);
            console.log(result);
            if (!result.hasError) {
                toast.success("Venta Generada Con Exito");
                this.cancelSale();
            }

            else {
                toast.error("Error al Intentar la Venta");
            }
        } catch (error) {
            toast.error("Ocurrio un error en el servidor" + error);
        }
    }

    render () {
        const { movies, error, isReady, hasError, movieName, ticketSr, ticketJr, total, isTicketSr, isTicketJr, movieSalaTime } = this.state;
        return(
            <>
                <div class="container-fluid mt-5">
                    <div class="row">
                        <div class="col-9">
                            <div class="row row-cols-3">
                            {
                                isReady ?
                                    <ListComponent
                                        movies={movies}
                                        selectedMovie={this.selectedMovie}
                                    />
                                    : hasError ?
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
                                    <p className="h3">Venta de Boletos</p>
                                </div>
                                <div class="col table-principal">
                                    <p className="mt-3 fs-6 fw-bold">Nombre Pelicula:</p>
                                    <p>{movieName}</p>
                                    <p className="mt-3 fs-6 fw-bold">Horario:</p>
                                    <p>{movieSalaTime}</p>
                                    <hr/>
                                </div>
                                <div class="col table-principal">
                                    <div class="p-3 efecto-gris">
                                        <p>{isTicketSr ? ticketSr : null}{isTicketSr ? " Boleto Adulto" : null}</p>
                                        <p>{isTicketJr ? ticketJr : null}{isTicketJr ? " Boleto Niño" : null}</p>
                                    </div>
                                    <hr/>
                                </div>
                                <div class="col table-principal text-center">
                                    <p className="fs-4 fw-bold">Total: ${total}</p>
                                    <hr/>
                                </div>
                                <div class="col table-principal">
                                    <div className="row d-flex align-items-center">
                                        <div className="col d-flex align-items-center">
                                            <p>Boletos Adultos</p>
                                        </div>
                                        <div className="col">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <button className="btn text-success" onClick={() => this.ticketSrAdd()}><i class="bi bi-plus-circle"></i></button>
                                                <p className="mx-3 mt-2">{ticketSr}</p>
                                                <button className="btn text-danger" onClick={() => this.ticketSrless()} ><i class="bi bi-dash-circle"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row d-flex">
                                        <div className="col d-flex align-items-center">
                                            <p>Boletos Niños</p>
                                        </div>
                                        <div className="col">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <button className="btn text-success" onClick={() => this.ticketJrAdd()}><i class="bi bi-plus-circle"></i></button>
                                                <p className="mx-3 mt-2">{ticketJr}</p>
                                                <button className="btn text-danger" onClick={() => this.ticketJrless()}><i class="bi bi-dash-circle"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                                <div class="col d-flex justify-content-around table-principal py-3 mb-2">
                                    <button className="btn btn-success" onClick={() => this.handleSubmit()}>Generar Venta</button>
                                    <button className="btn btn-danger" onClick={() => this.cancelSale()}>Cancelar</button>
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
            props.movies.length > 0 ?
                props.movies.map((movie) => (
                    <MovieCard
                        movie={movie}
                        selectedMovie={props.selectedMovie}
                    />
                ))
                : <p>No hay ninguna pelicula registrada</p>
        }
    </>
)

const MovieCard = ({ movie, selectedMovie }) => (
    <>
        <div class="col d-flex justify-content-center mb-5">
            <div class="card card-width card-width">
                <img src={movie.Imagen} class="card-img-top imagen-card" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{movie.Nombre}</h5>
                    <button className="btn btn-primary" onClick={() => selectedMovie(movie.Nombre, movie.Hora.slice(0, -3), movie.Precio, movie.PrecioNino)}>{movie.Hora.slice(0, -3)}</button>
                </div>
            </div>
        </div>
    </>
);
const ErrorComponent = ({ error }) => (
    <>
        <p>Ups! Algo Fallo al traer las peliculas</p>
        <p>{error}</p>
    </>
);
