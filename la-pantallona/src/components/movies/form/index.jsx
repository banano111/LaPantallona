import React, { Component } from 'react';
import toast from 'react-hot-toast';
import { createMovie, getMovie, updateMovie } from '../../../services';

export default class MovieForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMovie: {
                id: 0,
                nombre: "",
                genero: "",
                duracion: "",
                sinopsis: "",
                actores: "",
                directores: "",
                id_sala: "",
                imagen: ""
            },
            isCreate: false,
            isReady: false
        }
    }

    componentDidMount = async () => {
        if (this.props.match.params.movieId) {
            //Actualizar
            try {
                const { movieId } = this.props.match.params;
                const data = await getMovie(movieId);

                if (!data.hasError) {
                    this.setState({
                        newMovie: {
                            id: data.ID,
                            nombre: data.Nombre,
                            genero: data.Genero,
                            duracion: data.Duracion,
                            sinopsis: data.Sinopsis,
                            actores: data.Actores,
                            directores: data.Directores,
                            id_sala: data.ID_sala,
                            imagen: data.Imagen
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
        const { newMovie } = this.state;
        newMovie[name] = value;
        this.setState({
            newMovie
        })
    }

    handleSubmit = async () => {
        const { newMovie, isCreate } = this.state;
        const successResponse =
            isCreate
                ? 'Pelicula Creada con Exito'
                : 'Pelicula Editada con Exito'

        const errorResponse =
            isCreate
                ? 'Algo Fallo al crear la pelicula'
                : 'Algo Fallo al editar la pelicula'

        try {
            newMovie.id_sala = parseInt(newMovie.id_sala);
            const result = await 
                    isCreate ?
                        createMovie(newMovie)
                        : updateMovie(newMovie)
            if (!result.hasError) {
                toast.success(successResponse);
                this.props.history.push('/peliculas');
            }

            else {
                toast.error(errorResponse);
            }

        } catch (error) {
            toast.error("Ocurrio un error en el servidor");
        }
    }

    render() {

        const { nombre, genero, duracion, sinopsis, actores, directores, id_sala, imagen } = this.state.newMovie;
        const { isCreate, isReady, hasError } = this.state
        const formTitleM = isCreate
            ? 'Alta de Nueva Pelicula'
            : 'Edición de Pelicula';

        const textButtonM = isCreate
            ? 'Añadir Pelicula'
            : 'Guardar Cambios'

        return (
            <>
                {
                    isReady ?
                            <div className="container mt-3 w-50 p-5">
                            <div className="row p-3 detail">
                                <h4 className="text-light">{formTitleM}</h4>
                            </div>
                            <div className="row p-3 principal">
                                <div className="col mt-3">
                                    <div>
                                        <label className="form-label">Nombre de la Pelicula</label>
                                        <input type="text" className="form-control" name="nombre" value={nombre} onChange={(event) => this.handleChange(event)} required />
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3 principal">
                                <div className="col">
                                    <div>
                                        <label className="form-label">Género de la Pelicula</label>
                                        <input type="text" className="form-control" name="genero" value={genero} onChange={(event) => this.handleChange(event)} required />
                                    </div>
                                </div>
                                <div className="col">
                                    <div>
                                        <label className="form-label">Duración de la Pelicula</label>
                                        <input type="text" className="form-control" name="duracion" value={duracion} onChange={(event) => this.handleChange(event)} required />
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3 principal">
                                <div className="col">
                                    <div>
                                        <label className="form-label">Actores</label>
                                        <input type="text" className="form-control" name="actores" value={actores} onChange={(event) => this.handleChange(event)} />
                                        <div className="form-text">Ingresar actores separados por , comas.</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div>
                                        <label className="form-label">Directores</label>
                                        <input type="text" className="form-control" name="directores" value={directores} onChange={(event) => this.handleChange(event)} />
                                        <div className="form-text">Ingresar directores separados por , comas.</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3 principal">
                                <div className="col">
                                    <div>
                                        <label className="form-label">Sala donde se Proyecta</label>
                                        <input type="text" className="form-control" name="id_sala" value={id_sala} onChange={(event) => this.handleChange(event)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3 principal">
                                <div className="col">
                                    <div>
                                        <label className="form-label">Sinopsis</label>
                                        <input type="text" className="form-control" name="sinopsis" value={sinopsis} onChange={(event) => this.handleChange(event)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3 principal">
                                <div className="col">
                                    <div>
                                        <label className="form-label">Poster de la Pelicula</label>
                                        <input className="form-control" type="text" name="imagen" value={imagen} onChange={(event) => this.handleChange(event)}/>
                                        <div className="form-text">Ingresar la dirección de una imagen en Linea</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3 principal">
                                <div className="col mt-3">
                                    <button type="button" className="btn btn-secondary" onClick={() => this.handleSubmit()}>{textButtonM}</button>
                                </div>
                            </div>
                        </div>
                        : hasError ?
                                    <p>Esta Cosa Tiene Error</p>
                                    : null
                }
            </>
        )
    };
};
