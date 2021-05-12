var cerrarSesion = document.getElementById('logout');
var enviar = document.getElementById('sendProduct');

window.onload = function() {
    getUser();
    getDetailProduct();
  };

const getDetailProduct = () => {
    let id = location.search.substring(1);
    console.log("El ID de la Pelicula es: " + id);
    var detailUrl = "http://localhost:4000/productos/" + id; 
    axios({
        method: "GET",
        withCredentials: true,
        url: detailUrl,
      })
    .then(function(response){
        let product = response.data;
        console.log(product);

        // const { Imagen } = response.data;
        // console.log(Imagen);
        // const base64String = btoa(String.fromCharCode(...new Uint8Array(Imagen.data)));
        document.getElementById('Nombre').value = product.Nombre;
        document.getElementById('Descripcion').value = product.Descripcion;
        document.getElementById('Stock').value = product.Stock;
        document.getElementById('Precio').value = product.Precio;
        document.getElementById('Area').value = product.Area;

    })
    .catch(function (error) {
        console.log(error);
    });
};  

const editproduct_post = () => {
    let id = location.search.substring(1);
    console.log("Envio de Producto en Proceso - ID "+id);
    var Nombre = document.getElementById('Nombre').value;
    var Descripcion = document.getElementById('Descripcion').value;
    var Stock = document.getElementById('Stock').value;
    var Precio = document.getElementById('Precio').value;
    var Area = document.getElementById('Area').value;

    console.log(Imagen);

    axios({
        method: "POST",
        data: {
            id: id,
            nombre: Nombre,
            descripcion: Descripcion,
            stock: Stock,
            precio: Precio,
            tipo: "Producto",
            area: Area,
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
enviar.addEventListener('click', editproduct_post);