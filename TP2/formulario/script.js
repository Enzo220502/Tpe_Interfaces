document.querySelector('.imagen-form').classList.add('borde-derecha');

document.getElementById('goToRegister').addEventListener('click', () => {
    // Desplazar la imagen de inicio fuera de la vista
    document.querySelector('.imagen-form').style.transform = 'translateX(-100%)';
    document.querySelector('.imagen-form').classList.remove('borde-derecha');
    document.querySelector('.imagen-form').classList.add('borde-izquierda');



    document.querySelector('.imagen-desvanecimiento-inicio').classList.add('desvanecer');
    document.querySelector('.imagen-desvanecimiento-registro').classList.add('desvanecer');
    document.querySelector('.imagen-desvanecimiento-inicio').classList.remove('desvanecer');
    document.querySelector('.imagen-desvanecimiento-inicio').classList.add('borde-izquierda');
    

    setTimeout(() => {
        document.getElementById('circulo-izquierda').classList.remove('circulo-izquierda');
        document.getElementById('circulo-izquierda').classList.add('circulo-derecha');
        document.getElementById('circulo-derecha').classList.remove('circulo-derecha');
        document.getElementById('circulo-derecha').classList.add('circulo-izquierda');
    }, 300);

});

document.getElementById('goToLogin').addEventListener('click', () => {


    document.querySelector('.imagen-form').style.transform = 'translateX(0%)';
    document.querySelector('.imagen-form').classList.remove('borde-izquierda');
    document.querySelector('.imagen-form').classList.add('borde-derecha');




    document.querySelector('.imagen-desvanecimiento-registro').classList.add('borde-derecha'); 
    document.querySelector('.imagen-desvanecimiento-registro').classList.remove('desvanecer'); 
    document.querySelector('.imagen-desvanecimiento-inicio').classList.add('desvanecer');
    document.querySelector('.imagen-desvanecimiento-inicio').classList.remove('borde-izquierda');




    // Limpiar inputs del formulario
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmar-password").value = "";
    document.getElementById("checkbox-captcha-registro").checked = false;


    // Limpiar alertas
    document.getElementById("alerta-nombre").innerHTML = "";
    document.getElementById("alerta-apellido").innerHTML = "";
    document.getElementById("alerta-edad").innerHTML = "";
    document.getElementById("alerta-email").innerHTML = "";
    document.getElementById("alerta-password").innerHTML = "";
    document.getElementById("alerta-confirmar-password").innerHTML = "";
    document.getElementById("alerta-captcha-registro").innerHTML = "";
    document.getElementById("alerta").innerHTML = "";

    setTimeout(() => {
        document.getElementById('circulo-izquierda').classList.add('circulo-izquierda');
        document.getElementById('circulo-izquierda').classList.remove('circulo-derecha');
        document.getElementById('circulo-derecha').classList.add('circulo-derecha');
        document.getElementById('circulo-derecha').classList.remove('circulo-izquierda');
    }, 300);
});





// animacion captcha login
const checkboxAnimadoLogin = document.querySelector(".checkbox-animado-login");
const cargandoAnimacionLogin = document.getElementById("cargando-animacion-login");

checkboxAnimadoLogin.addEventListener("change", () => {
    if (checkboxAnimadoLogin.checked) {
        checkboxAnimadoLogin.style.display = "none"; // Ocultar el checkbox
        cargandoAnimacionLogin.style.display = "block"; // Mostrar animación de carga


        setTimeout(() => {
            cargandoAnimacionLogin.style.display = "none"; // Ocultar animación
            checkboxAnimadoLogin.style.display = "inline"; // Mostrar el checkbox nuevamente
            checkboxAnimadoLogin.checked = true;
        }, 2000);
    } else {
        cargandoAnimacionLogin.style.display = "none";
    }
});

//animacion captcha registro 
const checkboxAnimadoRegistro = document.querySelector(".checkbox-animado-registro");
const cargandoAnimacionRegistro = document.getElementById("cargando-animacion-registro");

checkboxAnimadoRegistro.addEventListener("change", () => {
    if (checkboxAnimadoRegistro.checked) {
        checkboxAnimadoRegistro.style.display = "none"; // Ocultar el checkbox
        cargandoAnimacionRegistro.style.display = "block"; // Mostrar animación de carga


        setTimeout(() => {
            cargandoAnimacionRegistro.style.display = "none"; // Ocultar animación
            checkboxAnimadoRegistro.style.display = "inline"; // Mostrar el checkbox nuevamente
            checkboxAnimadoRegistro.checked = true;
        }, 2000);
    } else {
        cargandoAnimacionRegistro.style.display = "none";
    }
});

window.onload = function () {
    const isRegister = true;
    if (isRegister) {
        document.querySelector('.imagen-desvanecimiento-inicio').classList.add('desvanecer');
        document.querySelector('.imagen-desvanecimiento-registro').classList.remove('desvanecer');
    } else {
        document.querySelector('.imagen-desvanecimiento-registro').classList.add('desvanecer');
        document.querySelector('.imagen-desvanecimiento-inicio').classList.remove('desvanecer');
    }
};





// validacion del registro 
document.getElementById('btn-registrar').addEventListener('click', () => {
    // Obtener los valores de los campos de entrada
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const nickname = document.getElementById("nickname");
    const edad = document.getElementById("edad");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmarPassword = document.getElementById("confirmar-password");
    const checkboxCaptchaRegistro = document.getElementById("checkbox-captcha-registro");

    // Obtener los párrafos de alerta
    const alertaNombre = document.getElementById("alerta-nombre");
    const alertaApellido = document.getElementById("alerta-apellido");
    const alertaEdad = document.getElementById("alerta-edad");
    const alertaEmail = document.getElementById("alerta-email");
    const alertaPassword = document.getElementById("alerta-password");
    const alertaConfirmarPassword = document.getElementById("alerta-confirmar-password");
    const alertaCaptchaRegistro = document.getElementById("alerta-captcha-registro");
    const parrafoGeneral = document.getElementById("alerta"); // El párrafo donde se mostrarán las alertas

    let entrar = false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Limpiar alertas previas
    alertaNombre.innerHTML = "";
    alertaApellido.innerHTML = "";
    alertaEdad.innerHTML = "";
    alertaEmail.innerHTML = "";
    alertaPassword.innerHTML = "";
    alertaConfirmarPassword.innerHTML = "";
    alertaCaptchaRegistro.innerHTML = "";
    parrafoGeneral.innerHTML = "";

    if (nombre.value.length <1  ) {
        alertaNombre.innerHTML = " *COMPLETAR NOMBRE ";
        entrar = true;
    }

    if (apellido.value.length <1) {
        alertaApellido.innerHTML = " *COMPLETAR APELLIDO ";
        entrar = true;
    }

    if (isNaN(edad.value) || edad.value <= 0) {
        alertaEdad.innerHTML = " *EDAD INVALIDA ";
        entrar = true;
    }

    if (!regexEmail.test(email.value)) {
        alertaEmail.innerHTML = " *EMAIL INVALIDO ";
        entrar = true;
    }

    if (password.value.length < 8) {
        alertaPassword.innerHTML = " *LA CONTRASEÑA ES CORTA ";
        entrar = true;
    }

    if (password.value !== confirmarPassword.value) {
        alertaConfirmarPassword.innerHTML = " *LAS CONTRASEÑAS NO COINCIDEN ";
        entrar = true;
    }

    // Verificar si el captcha está chequeado
    if (!checkboxCaptchaRegistro.checked) {
        alertaCaptchaRegistro.innerHTML = " *DEBES VALIDAR EL CAPTCHA    ";
        entrar = true;
    }

    if (entrar) {
        parrafoGeneral.style.display = "block";
    } else {
        // Limpiar campos si no hay errores
        nombre.value = "";
        apellido.value = "";
        nickname.value ="";
        edad.value = "";
        email.value = "";
        password.value = "";
        confirmarPassword.value = "";
        checkboxCaptchaRegistro.checked = false; // Restablecer el estado del checkbox

        parrafoGeneral.innerHTML = "FORMULARIO ENVIADO !";
    }
});

checkboxCaptchaRegistro.addEventListener("change", () => {
    const alertaCaptchaRegistro = document.getElementById("alerta-captcha-registro");
    if (checkboxCaptchaRegistro.checked) {
        alertaCaptchaRegistro.innerHTML = "";
    }
});
