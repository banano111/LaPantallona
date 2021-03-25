var boton = document.getElementById('login_post');

const login_post = () => {
    var loginusername = document.getElementById('username').value;
    var loginpassword = document.getElementById('password').value;
    console.log(loginusername);
    console.log(loginpassword);
    axios({
        method: "POST",
        data: {
            username: loginusername,
            password: loginpassword,
        },
        withCredentials: true,
        url: "http://localhost:4000/login",
    })
        .then(function (response) {
            console.log(response);
            if (response.data == "El usuario no existe") {
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
            else {
                window.location.replace("index.html");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

boton.addEventListener('click', login_post);