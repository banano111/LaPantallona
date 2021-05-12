var cerrarSesion = document.getElementById('logout');

window.onload = function () {
    getUser();
};

var enviar = document.getElementById('sendProduct');

const newproduct_post = () => {
    console.log("Envio de Pelicula en Proceso");
    var Nombre = document.getElementById('Nombre').value;
    var Descripcion = document.getElementById('Descripcion').value;
    var Stock = document.getElementById('Stock').value;
    var Precio = document.getElementById('Precio').value;
    var Area = document.getElementById('Area').value;

    console.log(Imagen);

    axios({
        method: "POST",
        data: {
            id: 0,
            nombre: Nombre,
            descripcion: Descripcion,
            stock: Stock,
            precio: Precio,
            tipo: "Producto",
            area: Area,
            imagen: "imagen",
        },
        withCredentials: true,
        url: "http://localhost:4000/productos/add",
    })
        .then(function (response) {
            console.log(response);
            if ( response.status == 200){
                window.location.replace("productos.html");
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
enviar.addEventListener('click', newproduct_post);