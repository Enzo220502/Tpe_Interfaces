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

});