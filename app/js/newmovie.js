var cerrarSesion = document.getElementById('logout');

window.onload = function () {
    getUser();
};

var enviar = document.getElementById('sendMovie');

const newmovie_post = (event) => {
    console.log("Envio de Pelicula en Proceso");
    var Nombre = document.getElementById('Nombre').value;
    var Genero = document.getElementById('Genero').value;
    var Duracion = document.getElementById('Duracion').value;
    var Sinopsis = document.getElementById('Sinopsis').value;
    var Actores = document.getElementById('Actores').value;
    var Directores = document.getElementById('Directores').value;
    var sala = document.getElementById('ID_Sala').value;
    var Imagen = document.getElementById('Imagen').value;

    console.log(Imagen);

    axios({
        method: "POST",
        data: {
            id: 0,
            nombre: Nombre,
            genero: Genero,
            duracion: Duracion,
            sinopsis: Sinopsis,
            actores: Actores,
            directores: Directores,
            id_sala: sala,
            imagen: "imagen",
        },
        withCredentials: true,
        url: "http://localhost:4000/peliculas",
    })
        .then(function (response) {
            console.log(response);
            if ( response.status == 200){
                window.location.replace("peliculas.html");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

const getUser = () => {
    var userBox = document.getElementById('dropdownMenuButton1');
    axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/user",
    })
        .then(function (response) {
            let userget = response.data.username;
            console.log(userget);
            userBox.innerHTML = "Bienvenido, " + userget;
        })
        .catch(function (error) {
            console.log(error);
        });
};

const logout = () => {
    axios({
        method: "DELETE",
        withCredentials: true,
        url: "http://localhost:4000/logout",
    })
        .then(function (response) {
            console.log(response);
            window.location.replace("login.html");
        })
        .catch(function (error) {
            console.log(error);
        });
};

cerrarSesion.addEventListener('click', logout);
enviar.addEventListener('click', newmovie_post);