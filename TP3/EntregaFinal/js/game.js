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