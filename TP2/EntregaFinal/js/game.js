document.addEventListener("DOMContentLoaded", function() {
  const botonJugar = document.getElementById("juego-boton-jugar");
const triangulo_play = document.getElementById("juego-boton-jugar-triangulo-play");

botonJugar.onmouseover = function(){
  triangulo_play.src='img/game/triangulo-play-hover.png';
}
botonJugar.onmouseleave = function(){
  triangulo_play.src='img/game/triangulo-play.png';
}
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