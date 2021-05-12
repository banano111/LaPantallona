import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../../../services';
import './index.scss';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            isReady: false,
            hasError: false,
            error: null,
            isdeleteMovie: 0
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

    componentDidUpdate = async (prevProps) => {
        if (prevProps.isdeleteMovie !== this.state.isdeleteMovie) {
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
    }

    deleteMovie = async (buttonMovieId) => {
        if (window.confirm('¿Deseas Eliminar esta Pelicula?')) {
            try {
                const movieId = buttonMovieId;
                const response = await deleteMovie(movieId);

                if (!response.hasError) {
                    toast.success("Pelicula Eliminada Correctamente");
                    let counter = this.state.isdeleteMovie + 1
                    this.setState({
                        isdeleteMovie: counter
                    })
                }

                else {
                    toast.error("Error al intentar Eliminar la Pelicula");
                    console.log(response);
                }

            } catch (error) {
                toast.error("Error al intentar Eliminar la Pelicula");
                console.log(error)
            }
        }

    }

    render() {

        const { movies, isReady, error, hasError } = this.state;

        return (
            <>
                <div className="container rounded p-4 w-75 mt-5">
                    <div className="row p-3 table-detail">
                        <div className="col d-flex align-items-center">
                            <h4 className="text-light">Catálogo de Peliculas</h4>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <Link to="/peliculas/nuevapelicula" className="btn btn-success">
                                <span className="me-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                </span>
                                Agregar nueva Pelicula
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
                                        <th scope="col">Género</th>
                                        <th scope="col">Duración</th>
                                        <th scope="col">Sala</th>
                                        <th className="text-center w-25" scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isReady ?
                                            <ListComponent
                                                movies={movies}
                                                deleteMovie={this.deleteMovie}
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
            props.movies.length > 0 ?
                props.movies.map((movie, index) => (
                    <MovieCard
                        movie={movie}
                        index={index}
                        deleteMovie={props.deleteMovie}
                    />
                ))
                : <p>No hay ninguna pelicula registrada</p>
        }
    </>
)

const MovieCard = ({ movie, index, deleteMovie }) => (
    <>
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{movie.Nombre}</td>
            <td>{movie.Genero}</td>
            <td>{movie.Duracion}</td>
            <td>{movie.ID_sala}</td>
            <td className="d-flex justify-content-center">
                <Link to={`/peliculas/${movie.ID}`} className="btn btn-sm btn-success me-2 text-light">
                    <i className="bi bi-eye-fill"></i>
                </Link>
                <Link to={`/peliculas/editarpelicula/${movie.ID}`} className="btn btn-sm btn-warning me-2 text-dark">
                    <i className="bi bi-pencil-fill"></i>
                </Link>
                <button className="btn btn-sm btn-danger me-2 text-light" onClick={() => deleteMovie(movie.ID)}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </td>
        </tr>
    </>
);

const ErrorComponent = ({ error }) => (
    <>
        <p>Ups! Algo Fallo al traer las peliculas</p>
        <p>{error}</p>
    </>
);
