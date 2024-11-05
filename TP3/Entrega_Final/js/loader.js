// LOADING

let contador = 0;
let tiempo = 5000 / 100;
let contenedorHome = document.querySelector(".content");
let contenedorLoader = document.querySelector(".contenedor-loading");
let incrementador = document.querySelector(".contador");

let temporizador = setInterval(() => {
    if (contador <= 100) {
        incrementador.innerHTML = contador + "%"
        contador++;
    }
    else {
        contenedorHome.classList.remove("ocultar");
        contenedorLoader.classList.add("ocultar");
        clearInterval(temporizador)//Limpio en consola
    }

}, tiempo);