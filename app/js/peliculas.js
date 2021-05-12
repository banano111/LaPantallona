var cerrarSesion = document.getElementById('logout');

window.onload = function() {
    getUser();
    getMovies();
  };

const eliminar = (valor) => {
    console.log("Se va a Eliminar la Pelicula");
    let urlDelete = "http://localhost:4000/peliculas/" + valor;
    axios.delete(urlDelete)
        .then((response) => {
            console.log(response.data);
            window.location.replace("peliculas.html");
        });
};

const getMovies = () => {
    axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/peliculas",
      })
    .then(function(response){
        let movies = response.data;
        console.log(movies);

        const tabla = document.getElementById("tablebody");
        
        for(let i = 0; i < movies.length; i++){
            console.log(movies[i].Nombre);
            let tableElement = 
                            `<tr>
                                <th scope="row">`+ (i+1) + `</th>
                                <td>`+ movies[i].Nombre + `</td>
                                <td>`+ movies[i].Genero + `</td>
                                <td>`+ movies[i].Duracion + `</td>
                                <td>`+ movies[i].ID_sala + `</td>
                                <td class="d-flex justify-content-center">
                                    <a href="detallepelicula.html?`+ movies[i].ID+`" class="btn btn-sm btn-success me-2 text-light">
                                        <i class="bi bi-eye-fill"></i>
                                    </a>
                                    <a href="editarpelicula.html?`+ movies[i].ID+`" class="btn btn-sm btn-warning me-2 text-dark">
                                        <i class="bi bi-pencil-fill"></i>
                                    </a>
                                    <a href="" class="btn btn-sm btn-danger me-2 text-light" onclick="eliminar(`+movies[i].ID+`)">
                                        <i class="bi bi-trash-fill"></i>
                                    </a>
                                </td>
                            </tr>`;

            tabla.innerHTML += tableElement;
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