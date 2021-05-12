var cerrarSesion = document.getElementById('logout');

window.onload = function() {
    getUser();
    getDetailMovie();
  };

const getDetailMovie = () => {
    var id = location.search.substring(1);
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
  

        const detailBox = document.getElementById("movieDetail");        
        
        let movieInfo =     `<h5 class="mb-4">`+movies.Nombre + `</h5>
                            <p>Genero: `+movies.Genero + `</p>
                            <p>Duracion: `+ movies.Duracion + `</p>
                            <p>Actores: `+ movies.Actores + `</p>
                            <p>Directores: `+ movies.Directores + `</p>
                            <p>Sala: `+ movies.ID_sala + `</p>
                            <p>`+movies.Sinopsis + `</p>
                            `;

        detailBox.innerHTML = movieInfo;

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