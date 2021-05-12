import React, { Component } from 'react';
import { getMovie } from '../../../services';
import './index.scss';


export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            isReady: false,
            hasError: false,
            error: null,
        };
    };

    componentDidMount = async () => {
        try {
            const movieId = this.props.match.params.movieId;

            if (!movieId){
                this.setState({
                    hasError: true,
                    error: "No se encontro ID de la pelicula"
                });
            }
    
            else{
                const response = await getMovie(movieId);
                if(!response.hasError){
                    this.setState({
                        movie: response,
                        isReady: true,                        
                    });
                }
            }
            
        } catch (error) {
            this.setState({
                hasError: true,
                error
            })
        }

    }

    render() {

        const { movie, isReady, error, hasError } = this.state;

        return (
            <>
                <div className="container p-4 w-75">
                    <div className="row p-3 detail">
                        <div className="col d-flex align-items-center">
                            <h4 className="text-light">Detalle de Pelicula</h4>
                        </div>
                    </div>
                    <div className="row p-4 principal">
                        <div className="col d-flex">
                            <div className="me-5">
                                <img src={movie.Imagen} id="image" width="300" height="400" alt="Imagen Pelicula" />
                            </div>
                                <div className="ms-5">
                                    {
                                        isReady ?
                                            <MovieCard
                                                movie={movie}
                                            />
                                            : hasError ?
                                                <ErrorComponent
                                                    error={error}
                                                />
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            </>
        )
    }
};


const MovieCard = ({ movie }) => (
    <>
        <h5 className="mb-4">{movie.Nombre}</h5>
        <p>Genero: {movie.Genero}</p>
        <p>Duracion: {movie.Duracion}</p>
        <p>Actores: {movie.Actores}</p>
        <p>Directores: {movie.Directores}</p>
        <p>Sala: {movie.ID_sala}</p>
        <p>Genero: {movie.Genero}</p>
    </>
);

const ErrorComponent = ({ error }) => (
    <>
        <p>Ups! Algo Fallo al traer la pelicula</p>
        <p>{error}</p>
    </>
);