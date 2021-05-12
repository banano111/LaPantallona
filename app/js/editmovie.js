var cerrarSesion = document.getElementById('logout');
var enviar = document.getElementById('sendMovie');

window.onload = function() {
    getUser();
    getDetailMovie();
  };

const getDetailMovie = () => {
    let id = location.search.substring(1);
    console.log("El ID de la Pelicula es: " + id);
    var detailUrl = "http://localhost:4000/peliculas/" + id; 
    axios({
        method: "GET",
        withCredentials: true,
        url: detailUrl,
      })
    .then(function(response){
        let movies = response.data;
        console.log(movies);

        // const { Imagen } = response.data;
        // console.log(Imagen);
        // const base64String = btoa(String.fromCharCode(...new Uint8Array(Imagen.data)));
        document.getElementById('Nombre').value = movies.Nombre;
        document.getElementById('Genero').value = movies.Genero;
        document.getElementById('Duracion').value = movies.Duracion;
        document.getElementById('Sinopsis').value = movies.Sinopsis;
        document.getElementById('Actores').value = movies.Actores;
        document.getElementById('Directores').value = movies.Directores;
        document.getElementById('ID_Sala').value = movies.ID_sala;

    })
    .catch(function (error) {
        console.log(error);
    });
};  

const editmovie_post = () => {
    let id = location.search.substring(1);
    console.log("Envio de Pelicula en Proceso - ID "+id);
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
            id: id,
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
    .then(function(response){
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
    .then(function(response){
        console.log(response);
        window.location.replace("login.html");
    })
    .catch(function (error) {
        console.log(error);
    });
};

cerrarSesion.addEventListener('click', logout);
enviar.addEventListener('click', editmovie_post);