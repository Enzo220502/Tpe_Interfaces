document.addEventListener("DOMContentLoaded", function() {
  const boton_jugar = document.getElementById("juego-btn-jugar");
  const triangulo_play = document.getElementById("juego-btn-jugar-triangulo-play");
  const juego_cerrado = document.getElementById("juego-cerrado");
  const juego_ejecutandose = document.getElementById("canvas-4-in-line");
  const juego_menu = document.getElementById("juego-menu");
  const boton_comenzar = document.getElementById("juego-btn-comenzar");
  const fichas = document.querySelectorAll('.fichas');
  const popup = document.getElementById("ficha-popup");
  const seleccionJ1 = document.getElementById("ficha-seleccionada-1");
  const seleccionJ2 = document.getElementById("ficha-seleccionada-2");
  const btn_exit_open_init = document.getElementById("btn-exit-open-init");
  const btn_reset_game = document.getElementById("btn-reset");
  const btn_close_form_init = document.getElementById("btn-exit-form");

  let nombrej1 = "";
  let nombrej2 = "";
  let fichaSeleccionadaJ1 = "";
  let fichaSeleccionadaJ2 = "";
  let tamanoLinea = "4";

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
  nombrej1 = document.getElementById("nombre-jugador-1").value;
  nombrej2 = document.getElementById("nombre-jugador-2").value;
  fichaSeleccionadaJ1 = seleccionJ1.getAttribute('src');
  fichaSeleccionadaJ2 = seleccionJ2.getAttribute('src');
  if(nombrej1 != "" && nombrej2 != ""){
    juego_menu.classList.add("ocultar");
    juego_ejecutandose.classList.remove("ocultar");
    btn_reset_game.classList.remove("ocultar");
    btn_exit_open_init.classList.remove("ocultar");
    jugar();
  }
}

btn_close_form_init.onclick = function (){
  juego_cerrado.classList.remove("ocultar");
  juego_menu.classList.add("ocultar");
};

document.querySelectorAll('.ficha').forEach((ficha, index) => {
  
  if(ficha.classList.contains('ficha-tamaño-seleccionable')){
  ficha.addEventListener('mouseover', () => {
      for (let i = 0; i <= index; i++) {
        ficha.parentElement.children[i].classList.add('ficha-hover'); // Ilumina fichas a la izquierda
      }
    }
  );
  ficha.addEventListener('mouseleave', () => {
      for (let i = 0; i <= index; i++) {
        ficha.parentElement.children[i].classList.remove('ficha-hover'); // Restaura el efecto al salir
      }
  });
  ficha.addEventListener('click', () => {
    tamanoLinea = ficha.getAttribute('data-value');
    for (let i = 0; i < ficha.parentElement.children.length; i++) {
      ficha.parentElement.children[i].classList.remove('ficha-active'); // Elimina el efecto activo de todas
    }
    for (let i = 0; i <= index; i++) {
      ficha.parentElement.children[i].classList.add('ficha-active'); // Restaura el efecto al salir
    }
  });
  }
});



// Manejo del clic para el jugador 1
seleccionJ1.addEventListener('click', (event) => {
  gestionarFichas();
  mostrarPopup('j1');
});

// Manejo del clic para el jugador 2
seleccionJ2.addEventListener('click', (event) => {
  gestionarFichas();
  mostrarPopup('j2');
});

// Función para mostrar el popup
function mostrarPopup(jugador) {
  popup.classList.remove('ocultar'); // Mostrar el popup

  fichas.forEach(opcion => {
      // Asignamos la lógica de clic para cada ficha
      opcion.onclick = () => {
          if (jugador === 'j1') {
              seleccionJ1.src = opcion.getAttribute('src'); // Cambia la imagen de j1

          } else {
              seleccionJ2.src = opcion.getAttribute('src'); // Cambia la imagen de j2
          }
          popup.classList.add('ocultar'); // Cierra el popup
      };
  });
}

// Función para gestionar las fichas
function gestionarFichas() {
  fichas.forEach(opcion => {
    if ((opcion.getAttribute('src') === document.getElementById('ficha-seleccionada-1').getAttribute('src') || 
          opcion.getAttribute('src') === document.getElementById('ficha-seleccionada-2').getAttribute('src')) &&
          (!opcion.classList.contains('unpointer'))) {
        opcion.classList.add('unpointer');
      } else if (opcion.classList.contains('unpointer') && 
          (opcion.getAttribute('src') !== document.getElementById('ficha-seleccionada-1').getAttribute('src') && 
          opcion.getAttribute('src') !== document.getElementById('ficha-seleccionada-2').getAttribute('src'))) {
        opcion.classList.remove('unpointer');
      }
  });
}

  function jugar(){
    let canvas = document.getElementById('canvas-4-in-line');
    let ctx = canvas.getContext('2d');
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let game = null;
    
    let form = document.getElementById("4-in-line-menu");

    
    let nameP1Input = nombrej1;
    let nameP2Input = nombrej2;
    let colorChipP1 = "black";   
    let colorChipP2 = "black";   

    let inLine = tamanoLinea; // Aca deberia ir si es 4, 5, 6 ó 7 en linea

        let chipP1Input = fichaSeleccionadaJ1;
        let chipP2Input = fichaSeleccionadaJ2;

        let image_chip_p1 = new Image();
        
        // Aqui deberian ir: url de imagenes y numero del color para la pila de fichas del jugador 1
        switch (chipP1Input) {
            case 'img/game/ficha-finn.png':
                image_chip_p1.src = './img/game/ficha-finn.png';
                colorChipP1 = "#43BAFE"; 
                break;
            case 'img/game/ficha-jake.png':
                image_chip_p1.src = './img/game/ficha-jake.png';
                colorChipP1 = "#F4B826";
                break;
            case 'img/game/ficha-bmo.png':
                image_chip_p1.src = './img/game/ficha-bmo.png';
                colorChipP1 = "#61CDC0";
                break;
            case 'img/game/ficha-princesa.png':
                image_chip_p1.src = './img/game/ficha-princesa.png';
                colorChipP1 = "#D31FC9";
                break;
            case 'img/game/ficha-rey-helado.png':
                image_chip_p1.src = './img/game/ficha-rey-helado.png';
                colorChipP1 = "#0725F5";
                break;
        }
        
        let image_chip_p2 = new Image();
        
        // Aqui deberian ir: url de imagenes y numero del color para la pila de fichas del jugador 2
        switch (chipP2Input) {
            case 'img/game/ficha-finn.png':
                image_chip_p2.src = './img/game/ficha-finn.png';
                colorChipP2 = "#43BAFE"; 
                break;
            case 'img/game/ficha-jake.png':
                image_chip_p2.src = './img/game/ficha-jake.png';
                colorChipP2 = "#F4B826";
                break;
            case 'img/game/ficha-bmo.png':
                image_chip_p2.src = './img/game/ficha-bmo.png';
                colorChipP2 = "#61CDC0";
                break;
            case 'img/game/ficha-princesa.png':
                image_chip_p2.src = './img/game/ficha-princesa.png';
                colorChipP2 = "#D31FC9";
                break;
            case 'img/game/ficha-rey-helado.png':
                image_chip_p2.src = './img/game/ficha-rey-helado.png';
                colorChipP2 = "#0725F5";
                break;
        }
        

        let image_background = new Image();
        image_background.src = './img/game/background-game.jpeg';

        let image_board = new Image();

        switch (inLine) {
            case "4":
                image_board.src = './img/game/tablero-4-en-linea.png'
                break;
            case "5":
                image_board.src = './img/game/tablero-5-en-linea.png'
                break;
            case "6":
                image_board.src = './img/game/tablero-6-en-linea.png'
                break;
            case "7":
                image_board.src = './img/game/tablero-7-en-linea.png'
                break;
            default:
                image_board.src = './img/game/tablero-4-en-linea.png'
                break;
        }

        image_chip_p1.onload, image_chip_p2.onload, image_background.onload, image_board.onload = function() {
            if (game === null) {
                let boardSize = parseInt( inLine, 10);  // En este caso 'inLine' indica cuanto en linea es

                crearJuego(ctx, canvas, nameP1Input, nameP2Input, boardSize, image_chip_p1, image_chip_p2,colorChipP1,colorChipP2, image_background, image_board);
            }
        }
  }
    

    function crearJuego( ctx, canvas, playerName1, playerName2, lineSize, image_chip1, image_chip2, colorChipP1, colorChipP2, image_background, image_board) {

        game = new Game(canvas, ctx, playerName1, playerName2, lineSize, image_chip1, image_chip2, colorChipP1,colorChipP2, image_background, image_board); 
        game.drawFrame();
        
        canvas.addEventListener('mousedown' , function(e) { game.onMouseDown(e);  }, false);
        canvas.addEventListener('mousemove' , function(e) { game.onMouseMove(e);  }, false);
        canvas.addEventListener('mouseup'   , function(e) { game.onMouseUp(e);    }, false);
        canvas.addEventListener('mouseleave', function(e) { game.onMouseLeave(e); }, false);
        canvas.addEventListener('click'     , function(e) { game.onClick(e);      }, false);

        
        btn_exit_open_init.addEventListener("click", function(e) {
            if(game != null){
              game.endGame();
              game = null;
              btn_exit_open_init.classList.add("ocultar");
              btn_reset_game.classList.add("ocultar");
              juego_menu.classList.remove("ocultar");
              juego_ejecutandose.classList.add("ocultar");
              nombrej1 = "";
              nombrej2 = "";
              fichaSeleccionadaJ1 = "";
              fichaSeleccionadaJ2 = "";
              tamanoLinea = "4";
            }
        });

        btn_reset_game.addEventListener("click", function(e) {
            game.reset();
        });
    }    
});