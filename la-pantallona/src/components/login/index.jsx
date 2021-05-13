import React, { Component } from 'react';
import './index.scss';
import Logo from '../../assets/Logo_LaPantallona.png';
import { Login, getUser } from '../../services';
import toast from 'react-hot-toast';


export default class LoginComponent extends Component {
    constructor(){
        super();
        this.state = {
            user: {
                username: "",
                password: "",
            }
        }
    }

    clearData = () => {
        this.setState({
            user: {
                username: "",
                password: ""
            }
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;
        user[name] = value;
        this.setState({
            user
        })
    }

    buttonLogin = async () => {
        const { user } = this.state;
        const username = await Login(user);
        if (!username.hasError) {
            sessionStorage.setItem('isAuth', "true");
            sessionStorage.setItem('username', user.username);
            const userData = await getUser()
            console.log(userData)
            toast.success("Inicio de Sesión Correcto, Bienvenido " + user.username);
            setTimeout(() => { window.location.replace("/home"); }, 500);
        }

        else {
            console.log("Hay Un Error" + username);
            toast.error("Usuario o Contraseña Invalido Intente de Nuevo")
            this.setState({
                user: {
                    username: "",
                    password: ""
                }
            })
        }
    }
    
    render () {
        
        const { username, password } = this.state.user;

        return (

            <>
                {
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col">
                                <img className="mx-auto d-block logo-pantallona" src={Logo} alt="Logo La Pantallona" />
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center mt-5">
                            <div className="col-4">
                                <div className="card border-white">
                                    <div className="card-body color-background">
                                        <h3 className="text-center text-white">Inicio de Sesión</h3>
                                        <form autoComplete="off">
                                            <div className="row">
                                                <div className="col d-flex justify-content-center">
                                                    <div className="input-group mb-3 mt-3 w-75 ">
                                                        <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                                                        <input type="text" className="form-control" name="username" value={username} onChange={(event) => this.handleChange(event)} placeholder="Usuario"
                                                            required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col d-flex justify-content-center">
                                                    <div className="input-group mb-4 w-75">
                                                        <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                                                        <input type="password" className="form-control" name="password" value={password} onChange={(event) => this.handleChange(event)} placeholder="Contraseña"
                                                            required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button type="button" className="btn btn-outline-secondary me-3" id="login_post" onClick={() => this.buttonLogin()}>Iniciar Sesión</button>
                                                <button type="button" className="btn btn-outline-secondary" onClick={() => this.clearData()}>Limpiar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}