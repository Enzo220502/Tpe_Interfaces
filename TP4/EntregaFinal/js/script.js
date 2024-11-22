"use strict"
document.addEventListener('DOMContentLoaded', ()=>{

let arbolIzq = document.querySelector(".arbol-izq");
let arbolDerMediano = document.querySelector(".arbol-der-mediano");
let arbolDerPequeño = document.querySelector(".arbol-der-pequeño");
let arbustoDerGrande = document.querySelector(".arbusto-der-grande");
let arbustoDerMediano = document.querySelector(".arbusto-der-mediano");
let arbustoIzqGrande = document.querySelector(".arbusto-izq-grande");
let arbustoIzqPequeño = document.querySelector(".arbusto-izq-pequeño");
let personaje1 = document.querySelector(".personaje-1");
let personaje2 = document.querySelector(".personaje-2");
let personaje3 = document.querySelector(".personaje-3");
let piedraDerGrande = document.querySelector(".piedra-der-grande");
let piedraDerMediana = document.querySelector(".piedra-der-mediana");
let piedraDerPequeña = document.querySelector(".piedra-der-pequeña");
let piedraIzq = document.querySelector(".piedra-izq");
let personaje4 = document.querySelector(".personaje-4");
let personaje5 = document.querySelector(".personaje-5");
let marcoDeFotos = document.querySelector(".marco-de-fotos");
let textoSec2 = document.querySelector(".container-texto-sec2");


window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    aparicionNavegacionYLogo(scrollY);

    ParallaxSeccion1(scrollY);

    ParallaxSeccion2(scrollY);

    aparicionCards();

    aparicionVideo();

});

function aparicionNavegacionYLogo(scrollY) {
  let numberBlocks = document.querySelector(".img-number-blocks");
  let cabecera = document.querySelector(".header");

  // Tamaños iniciales y finales
  let anchoInicial = 560;
  let altoInicial = 320;
  let anchoFinal = 150;
  let altoFinal = 86;

  // Diferencias de tamaño
  let difAncho = anchoInicial - anchoFinal;
  let difAlto = altoInicial - altoFinal;

  // Distancia de desplazamiento
  let desplazamiento = 86;

  // Cambios por píxel
  let cambioAnchoPorPixel = difAncho / desplazamiento;
  let cambioAltoPorPixel = difAlto / desplazamiento;

  // Calcula los nuevos tamaños
  let nuevoAncho = anchoInicial - (cambioAnchoPorPixel * scrollY);
  let nuevoAlto = altoInicial - (cambioAltoPorPixel * scrollY);

  nuevoAncho = Math.max(nuevoAncho, anchoFinal);
  nuevoAlto = Math.max(nuevoAlto, altoFinal);

  // Aplica los nuevos tamaños al elemento
  numberBlocks.style.width = nuevoAncho + 'px';
  numberBlocks.style.height = nuevoAlto + 'px';

  if (scrollY > 76) {
    numberBlocks.style.position = 'fixed';
    numberBlocks.style.top = 5 + 'px'
    cabecera.style.background = 'rgb(0, 209, 213)  ';
  } else {
    numberBlocks.style.position = ''
    numberBlocks.style.top = -4.8611111111 + '%'
    cabecera.style.background = '';
  }
}

function ParallaxSeccion1(scrollY) {

    //CALCULA EL NUEVO TAMAÑO BASANDOSE EN CUANDO SCROLIO
    let newSize = 1 + scrollY * 0.00025;

    //MUEVE AL P1 Y A LOS ITEMS DE LA IZQ
    personaje1.style.left = 33 + (scrollY * -0.01) + '%';
    personaje1.style.transform = `scale(${newSize})`;

    arbolIzq.style.left = -10 + (scrollY * -0.005) + '%';

    arbustoIzqGrande.style.left = 15 + (scrollY * -0.005) + '%';

    arbustoIzqPequeño.style.left = 20 + (scrollY * -0.02) + '%';
    arbustoIzqPequeño.style.transform = `scale(${newSize})`;

    piedraIzq.style.left = 12 + (scrollY * -0.012) + '%';

    //MUEVE AL P2
    personaje2.style.top = 45 + (scrollY * -0.01) + '%';
    personaje2.style.transform = `scale(${newSize})`;

    //MUEVE AL P3 Y A LOS ITEMS DE LA DERECHA
    personaje3.style.left = 53.5 + (scrollY * 0.01) + '%';
    personaje3.style.transform = `scale(${newSize})`;

    arbolDerMediano.style.right = -2 + (scrollY * -0.007) + '%';
    arbolDerPequeño.style.right = -6 + (scrollY * -0.005) + '%';

    piedraDerPequeña.style.right = 15 + (scrollY * -0.01) + '%';
    piedraDerMediana.style.right = 15 + (scrollY * -0.009) + '%';
    piedraDerGrande.style.right = 9 + (scrollY * -0.008) + '%';

    arbustoDerGrande.style.right = -3 + (scrollY * -0.005) + '%';
    arbustoDerMediano.style.right = 5 + (scrollY * -0.005) + '%';
}

function ParallaxSeccion2(scrollY) {

  //MUEVE AL TEXTO
  textoSec2.style.right = 40 + (scrollY * 0.002) + '%';

  //MUEVE AL P4
  personaje4.style.left = 0 + (scrollY * 0.0025) + '%';

  //MUEVE AL MARCO
  marcoDeFotos.style.left = 5 + (scrollY * 0.005) + '%';

  //MUEVE AL P5
  personaje5.style.right = -5 + (scrollY * 0.0025) + '%';
}

async function aparicionCards(){
  var cards_ocultas = document.querySelectorAll('.ocultar-abajo');
  var delay = 500; // Tiempo de retraso en milisegundos
  var windowheight = window.innerHeight;
  var revelartop = cards_ocultas[1].getBoundingClientRect().top;
  if (revelartop < windowheight) {
    for (let i = 0; i < cards_ocultas.length; i++) {
      await new Promise(resolve => {
          setTimeout(() => {
                  cards_ocultas[i].classList.add('aparecer');
              resolve();
          }, delay); // Solo se aplica el delay, ya que se usa await
      });
  }
  }
}

//PARALLAX DE LA SECCION DE DESCARGA
let seccion_descarga = document.querySelector(".seccion-descarga");
seccion_descarga.addEventListener("mousemove", parallaxDescarga);
let personajes_descarga = document.querySelector(".fondo-personajes")

function parallaxDescarga(e) {
    // Obtenemos las coordenadas del centro del div
    let rect = seccion_descarga.getBoundingClientRect();
    let centerX = rect.left + rect.width / 2;
    let centerY = rect.top + rect.height / 2;

    // Calculamos la distancia del mouse al centro del div
    let distX = e.clientX - centerX;
    let distY = e.clientY - centerY;

    let x = -distX / 50
    let y = -distY / 50

    personajes_descarga.style.transform = 'translate(' + (x / 1) + 'px, ' + (y / 1) + 'px)';

}


const menu = document.querySelector(".cabecera-menu-hamburguesa");
let menuDes = 0;
let miCarrito = document.querySelector(".mi-carrito")
let misPersonajes = document.querySelector(".mis-personajes")
let misCompras = document.querySelector(".mis-compras")
let menuDesplegable = document.querySelector(".cabecera-menu-desplegable")
let linea1 = document.getElementById("hamburguesa-linea-1");
let linea2 = document.getElementById("hamburguesa-linea-2");
let linea3 = document.getElementById("hamburguesa-linea-3");

menu.addEventListener('click', function () {

  if (menuDes == 0) {
      linea1.classList.remove("volver1");
      linea3.classList.remove("volver3");
      linea2.classList.add("ocultar");
      linea1.classList.add("girar1");
      linea3.classList.add("girar3");
      menu.classList.add("centro");
      menu.style.filter = "none";
      menuDes = 1;
      miCarrito.classList.remove("ocultar")
      misPersonajes.classList.remove("ocultar")
      misCompras.classList.remove("ocultar")
      menuDesplegable.classList.remove("ocultar")
  }
  else {
      menuDes = 0;
      linea1.classList.remove("girar1");
      linea3.classList.remove("girar3");
      linea2.classList.remove("ocultar");
      linea2.classList.add("volver2");
      linea1.classList.add("volver1");
      linea3.classList.add("volver3");
      menu.style.filter = "";
      miCarrito.classList.add("ocultar")
      misPersonajes.classList.add("ocultar")
      misCompras.classList.add("ocultar")
      menuDesplegable.classList.add("ocultar")
  }
});

let index = 0; // Índice de la imagen activa
const carrusel = document.querySelector('.carrusel'); // Selecciona todas las imágenes

function mostrarSiguienteImagen() {
  if(index==0){
    index++;
    carrusel.style.transform = 'translateX(' + '-' +518 + 'px)';
  }
  else if(index==1){
    index++;
    carrusel.style.transform = 'translateX(' + '-' +518*2 + 'px)';
  }
  else{
    index=0;
    carrusel.style.transform = 'translateX(' +  0 + 'px)';
  }
}
// Cambia la imagen cada 3 segundos (3000 ms)
setInterval(mostrarSiguienteImagen, 3000);

const btnComprar = document.querySelector(".cabecera-comprar");
btnComprar.addEventListener("mousedown", () => {
  btnComprar.style.transform = `scale(${0.95})`;
  btnComprar.classList.add("ocultar-sombra");
});
btnComprar.addEventListener("mouseup", () => {
  btnComprar.style.transform = `scale(${1})`;
  btnComprar.classList.remove("ocultar-sombra");
});

const btnDescarga = document.querySelector(".btn-descarga");
btnDescarga.addEventListener("mousedown", () => {
  btnDescarga.style.transform = `scale(${0.95})`;
  btnDescarga.classList.add("ocultar-sombra");
});
btnDescarga.addEventListener("mouseup", () => {
  btnDescarga.style.transform = `scale(${1})`;
  btnDescarga.classList.remove("ocultar-sombra");
});

const sVideo = document.querySelector(".seccion-video");
const imgSVideo = document.querySelector(".video");//video de la seccion video
const blockVideo = document.querySelector("#block-3-video");//personaje de la seccion video
function aparicionVideo(){
  var windowheight = window.innerHeight;
  var revelartop = sVideo.getBoundingClientRect().top;
  if (revelartop < windowheight) {
    imgSVideo.style.animation = "videoAnimation 1.5s 1 linear"; 
    blockVideo.style.animation  = "block3Animation 2s 1 linear";
  }
}

// Variable global para almacenar el índice de la imagen actual
let currentImageIndex = -1; // Inicialmente no hay imagen mostrada

window.addEventListener("scroll", () => {
    // Seleccionar los párrafos y la imagen a mostrar
    const paragraphs = document.querySelectorAll(".paragraph p");
    const dynamicImage = document.getElementById("dynamic-image");

    // Función para cambiar la imagen con animación
    const changeImage = (index) => {
        // Solo cambia la imagen si es diferente a la actual
        if (currentImageIndex !== index) {
            // Añadir animación de salida
            dynamicImage.classList.add("fade-out");

            // Esperar que termine la transición de opacidad
            setTimeout(() => {
                dynamicImage.src = `assets/img/section-mas-amigos/image${index}.png`; // Cambiar la imagen

                // Añadir animación de entrada
                dynamicImage.classList.remove("fade-out");
                dynamicImage.classList.add("fade-in");

                // Remover clase de entrada después de un momento
                setTimeout(() => {
                    dynamicImage.classList.remove("fade-in");
                }, 500); // Debe coincidir con la duración de la transición en CSS
            }, 500); // Espera que coincida con la duración de la transición en CSS

            // Actualizar el índice de la imagen actual
            currentImageIndex = index;
        }
    };

    // Función para verificar si el párrafo está en vista
    const checkParagraphVisibility = () => {
        let newImageIndex = -1; // Variable para el índice del párrafo visible

        paragraphs.forEach((paragraph, index) => {
            const rect = paragraph.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0; // Verificar si el párrafo está visible

            if (isVisible) {
                // Activar el párrafo visible
                paragraphs.forEach(p => p.parentElement.classList.remove("paragraph-active"));
                paragraph.parentElement.classList.add("paragraph-active");

                // Guardar el índice del párrafo visible
                newImageIndex = index;
            }
        });

        // Si encontramos un nuevo índice, cambia la imagen
        if (newImageIndex !== -1 && newImageIndex !== currentImageIndex) {
            changeImage(newImageIndex);
        }
    };

    // Llamamos a la función para revisar la visibilidad de los párrafos cada vez que haya un scroll
    checkParagraphVisibility();
});

window.onbeforeunload = () =>{
  window.scrollTo(0,0);
}

const modelViewer = document.querySelector('#block-3d');//block 3d de la seccion 3D
const formFoot = document.getElementById("input");//formulario de la seccion pre footer
const msgForm = document.querySelector(".msg-form");//elemento que se muestra cuando se envia el formulario

formFoot.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    msgForm.classList.add("show"); // Agrega la clase para iniciar la transición
    formFoot.reset();
});

document.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    const xRotation = ((clientY / innerHeight) - 0.5) * 30;
    const yRotation = ((clientX / innerWidth) - 0.5) * 30;


    modelViewer.setAttribute("camera-orbit", `${-75-yRotation}deg ${85 - xRotation}deg 0`);
  });

/*---------------- LOADER ----------------*/ 
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
/*---------------- FIN DE LOADER ----------------*/ 
});