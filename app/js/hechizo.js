var boton = document.getElementById('login_post');

const login_post = () => {
    var loginusername = document.getElementById('username').value;
    var loginpassword = document.getElementById('password').value;

    if(loginusername == "admin" && loginpassword == "12345"){
        console.log("Autorizado :)");
        window.location.replace("index.html");
    }
    else{
        console.log("Error en Datos de Ingreso");
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
        const divError = document.getElementById("login_error");
        let alertError = `
        <div class="alert alert-danger alert-dismissible fade show w-50" role="alert">
        <strong>Error al Iniciar Sesión,</strong> Verifica tus datos de Acceso
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
            `;
        divError.innerHTML = alertError;
        
    }
};

boton.addEventListener('click', login_post);