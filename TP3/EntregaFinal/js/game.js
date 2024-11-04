document.addEventListener("DOMContentLoaded", function() {
  const boton_jugar = document.getElementById("juego-btn-jugar");
  const triangulo_play = document.getElementById("juego-btn-jugar-triangulo-play");
  const juego_cerrado = document.getElementById("juego-cerrado");
  const juego_ejecutandose = document.getElementById("juego-ejecutandose");
  const juego_menu = document.getElementById("juego-menu");
  const boton_comenzar = document.getElementById("juego-btn-comenzar");

boton_jugar.onmouseover = function(){
  triangulo_play.src='img/game/triangulo-play-hover.png';
}
boton_jugar.onmouseleave = function(){
  triangulo_play.src='img/game/triangulo-play.png';
}
boton_jugar.onclick = function(){
  juego_cerrado.classList.add("ocultar");
  juego_menu.classList.remove("ocultar");
}
boton_comenzar.onclick = function(){
  juego_menu.classList.add("ocultar");
  juego_ejecutandose.classList.remove("ocultar");
}



document.querySelectorAll('.ficha').forEach((ficha, index) => {
  ficha.addEventListener('mouseover', () => {
    for (let i = 0; i <= index; i++) {
      ficha.parentElement.children[i].classList.add('ficha-hover'); // Ilumina fichas a la izquierda
    }
  });

  ficha.addEventListener('mouseleave', () => {
    for (let i = 0; i <= index; i++) {
      ficha.parentElement.children[i].classList.remove('ficha-hover'); // Restaura el efecto al salir
    }
  });

  ficha.addEventListener('click', () => {
    for (let i = 0; i < ficha.parentElement.children.length; i++) {
      ficha.parentElement.children[i].classList.remove('ficha-active'); // Elimina el efecto activo de todas
    }
    for (let i = 0; i <= index; i++) {
      ficha.parentElement.children[i].classList.add('ficha-active'); // Restaura el efecto al salir
    }
  });
});



// Función para abrir el popup
document.getElementById('ficha-selector-1').addEventListener('click', () => {
  document.getElementById('ficha-popup-1').classList.remove('ocultar');
});

// Manejar la selección de la ficha
document.querySelectorAll('.fichas-1').forEach(opcion => {
  opcion.addEventListener('click', (event) => {
      const fichaSeleccionada = event.target.getAttribute('src');
      document.getElementById('ficha-imagen-1').src = fichaSeleccionada; // Actualiza la imagen en el selector
      document.getElementById('ficha-popup-1').classList.add('ocultar'); // Cierra el popup
  });
});

// Función para abrir el popup
document.getElementById('ficha-selector-2').addEventListener('click', () => {
  document.getElementById('ficha-popup-2').classList.remove('ocultar');
});

// Manejar la selección de la ficha
document.querySelectorAll('.fichas-2').forEach(opcion => {
  opcion.addEventListener('click', (event) => {
      const fichaSeleccionada = event.target.getAttribute('src');
      document.getElementById('ficha-imagen-2').src = fichaSeleccionada; // Actualiza la imagen en el selector
      document.getElementById('ficha-popup-2').classList.add('ocultar'); // Cierra el popup
  });
});

document.getElementById('ficha-selector-2').addEventListener('click', () => {
  document.getElementById('ficha-popup-2').classList.remove('ocultar');
});

});


function toggleShareOptions() {
  const shareOptions = document.getElementById("contenedor-opciones-compartir");
  shareOptions.classList.toggle("mostrar-compartir");
}



document.getElementById("pantalla-completa-btn").addEventListener("click", function () {
  const juego = document.getElementById("juego");
  
  if (juego.requestFullscreen) {
    juego.requestFullscreen();
  } else if (juego.webkitRequestFullscreen) { // Para Safari
    juego.webkitRequestFullscreen();
  } else if (juego.msRequestFullscreen) { // Para IE/Edge
    juego.msRequestFullscreen();
  }
});