var cerrarSesion = document.getElementById('logout');

window.onload = function() {
    getUser();
    getProducts();
  };

const eliminar = (valor) => {
    console.log("Se va a Eliminar la Pelicula");
    let urlDelete = "http://localhost:4000/productos/delete/" + valor;
    axios.delete(urlDelete)
        .then((response) => {
            console.log(response.data);
            window.location.replace("productos.html");
        });
};

const getProducts = () => {
    axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/productos",
      })
    .then(function(response){
        let products = response.data;
        console.log(products);

        const tabla = document.getElementById("tablebody");
        
        for(let i = 0; i < products.length; i++){
            console.log(products[i].Nombre);
            let tableElement = 
                            `<tr>
                                <th scope="row">`+ (i+1) + `</th>
                                <td>`+ products[i].Nombre + `</td>
                                <td>`+ products[i].Area + `</td>
                                <td>`+ products[i].Precio + `</td>
                                <td>`+ products[i].Stock + `</td>
                                <td class="d-flex justify-content-center">
                                    <a href="editarproductos.html?`+products[i].ID_producto+`" class="btn btn-sm btn-warning me-2 text-dark">
                                        <i class="bi bi-pencil-fill"></i>
                                    </a>
                                    <a href="" class="btn btn-sm btn-danger me-2 text-light" onclick="eliminar(`+products[i].ID_producto+`)">
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