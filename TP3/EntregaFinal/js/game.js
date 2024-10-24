document.addEventListener("DOMContentLoaded", function() {
  const botonJugar = document.getElementById("juego-boton-jugar");
  const triangulo_play = document.getElementById("juego-boton-jugar-triangulo-play");
  const juego_cerrado = document.getElementById("juego-cerrado");
  const juego_ejecutandose = document.getElementById("juego-ejecutandose");

botonJugar.onmouseover = function(){
  triangulo_play.src='img/game/triangulo-play-hover.png';
}
botonJugar.onmouseleave = function(){
  triangulo_play.src='img/game/triangulo-play.png';
}
botonJugar.onclick = function(){
  juego_cerrado.classList.add("ocultar");
  juego_ejecutandose.classList.remove("ocultar");
}

});