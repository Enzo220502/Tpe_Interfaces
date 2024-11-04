class Game{

    constructor(canvas, ctx, playerName1, playerName2, lineSize, chipImage1, chipImage2, colorChipP1, colorChipP2, imageBackground, image_board){
        this.winnerName = 0;
        this.isMouseDown = false;
        this.boardWidth = 400;
        this.boardHeight = 350;
        this.playerZoneWidth = 200;
        this.playerZoneHeight = 250;
        this.chipSize = 35;
        this.time = 500;    // En caso de querer hacer pruebas, este es el tiempo que dura el juego
        
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width; 
        this.canvasHeight = this.canvas.height;
        this.ctx = ctx;
        this.imageBackground = imageBackground;
        this.imageBoard = image_board;
        
        this.lineSize = lineSize;

        this.rows = lineSize + 2;
        this.columns = lineSize + 3;

        this.posBoardX = this.canvasWidth / 2 - this.boardWidth / 2; 
        this.posBoardY = this.canvasHeight / 2 - this.boardHeight / 2;

        this.posPlayerZone1X = this.posBoardX / 2 - this.playerZoneWidth / 2;
        this.posPlayerZone1Y = this.posBoardY + this.boardHeight - this.playerZoneHeight;

        this.posPlayerZone2X = this.canvasWidth - this.posBoardX / 2 - this.playerZoneWidth / 2;
        this.posPlayerZone2Y = this.posBoardY + this.boardHeight - this.playerZoneHeight;

        this.colorChipP1 = colorChipP1;
        this.colorChipP2 = colorChipP2;
        
        this.board = new Board(canvas,lineSize,this.boardWidth,this.boardHeight,ctx,this.posBoardX,this.posBoardY,this.chipSize, this.imageBoard);

        this.playerZone1 = new PlayerZone(this.posPlayerZone1X, this.posPlayerZone1Y, this.playerZoneWidth, this.playerZoneHeight, playerName1, 1, chipImage1, this.chipSize, this.ctx, ((this.columns*this.rows)/2),colorChipP1);
        
        this.playerZone2 = new PlayerZone(this.posPlayerZone2X, this.posPlayerZone2Y, this.playerZoneWidth, this.playerZoneHeight, playerName2, 2, chipImage2, this.chipSize, this.ctx, ((this.columns*this.rows)/2),colorChipP2);
    
        this.arrows = this.board.getArrows();
        
        // Posicion del texto de turnos
        this.textTurnPosX = this.canvasWidth / 2;
        this.textTurnPosY = (this.canvasHeight - (this.canvasHeight - this.board.getHeight()) / 4) + 10;

        // Posicion del texto de tiempo
        this.timePosX = this.canvasWidth / 2;
        this.timePosY = (this.canvasHeight - this.board.getHeight()) / 4;
        
        // Setear turno
        this.teamTurn = Math.floor(Math.random() * 2) + 1; // Devuelve aleatoriamente 1 o 2
        
        this.activeChip = null;

        this.secondsLeft = this.time;
        this.intervalId;
        
        this.startTimer();
        this.drawFrame();
    }

    //<-------------------- FUNCIONES DE EVENTOS DE USUARIO --------------------> 

    onMouseDown(e) {
        this.isMouseDown = true;
        let pos = this.getMousePos(e);
        if ((this.teamTurn === this.playerZone1.getTeam()) && (this.playerZone1.isChipClicked(pos.x, pos.y))){
            this.activeChip = this.playerZone1.getChip();
        } else if ((this.teamTurn === this.playerZone2.getTeam()) && (this.playerZone2.isChipClicked(pos.x, pos.y))) {
            this.activeChip = this.playerZone2.getChip();
        }
    }

    onMouseMove(e) {
        let mousePos = this.getMousePos(e);

        if(this.activeChip && this.isMouseDown){

            this.activeChip.setPosition(mousePos.x, mousePos.y);
            
            let hidden = this.board.isOnDropZone(mousePos.x,mousePos.y); 

            if(hidden !== null){
                let pos = hidden.getMiddle();
                this.activeChip.setPosition( pos.x - (this.chipSize/2), pos.y - (this.chipSize/2));
            }

            hidden = null;
        }
    }

    onMouseUp(e) {
        this.isMouseDown = false;
        let mousePos = this.getMousePos(e);
        if (this.activeChip) {
            if (this.board.isOnDropZone(mousePos.x,mousePos.y) != null) {
                if(this.board.dropChip(this.activeChip)){
                    if (this.teamTurn === 1) {
                        this.playerZone1.decreaseChips();
                    } else if (this.teamTurn === 2){
                        this.playerZone2.decreaseChips();
                    }
                    if (this.board.hasAWinner()) {  
                        if (this.teamTurn === 1) {
                            this.winnerName = this.playerZone1.getName();
                        } else if (this.teamTurn === 2){
                            this.winnerName = this.playerZone2.getName();
                        }
                        this.teamTurn = 0;
                        this.endGame();
                    } else if (this.board.hasEmptyCells()){
                        if (this.teamTurn === 1) {
                            this.teamTurn = 2;
                        } else if (this.teamTurn === 2){
                            this.teamTurn = 1;
                        }
                    } else {
                        this.endGame();
                    }
                }
            }
            this.activeChip = null;
        }
    }

    onMouseLeave(e){
        if(this.activeChip){
            this.activeChip = null;
        }
    }

    //<-------------------- FIN DE FUNCIONES DE EVENTOS DE USUARIO --------------------> 

    //<-------------------- FUNCIONES DE DIBUJADO EN CANVAS --------------------> 

    clearCanvas() {
        this.ctx.fillStyle = 'transparent';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    drawFrame = () => {
        this.clearCanvas(); // Borrar pantalla
        this.drawBackground(); // Dibujar fondo
        this.board.draw(); // Dibujar tablero

        // Indicar de quien es el turno
        if (this.teamTurn === 1) {
            this.drawText("Turno de " + this.playerZone1.getName(), this.textTurnPosX, this.textTurnPosY);
            this.playerZone1.highlightName(true);
            this.playerZone2.highlightName(false);
        } else if (this.teamTurn === 2){
            this.drawText("Turno de " + this.playerZone2.getName(), this.textTurnPosX, this.textTurnPosY);
            this.playerZone2.highlightName(true);
            this.playerZone1.highlightName(false);
        }

        switch (this.teamTurn) {
            case 0:
                this.endGame();
                break;
            case 1:
                this.drawText("Turno de " + this.playerZone1.getName(), this.textTurnPosX, this.textTurnPosY);
                break;
            case 2:
                this.drawText("Turno de " + this.playerZone2.getName(), this.textTurnPosX, this.textTurnPosY);
                break;
        }

        this.playerZone1.draw();
        
        if ((this.teamTurn === 2) || (!this.activeChip)) {// Si no se esta moviendo la ficha en su turno, esta se dibuja en la ubicacion del jugador
            this.playerZone1.drawChip();
        }

        this.playerZone2.draw();

        if ((this.teamTurn === 1) || (!this.activeChip)) {
            this.playerZone2.drawChip();
        }



        if(this.activeChip){
            this.activeChip.draw();
        }


        this.drawTimer();
        this.drawArrows();
        
        requestAnimationFrame(this.drawFrame);
    }

    drawBackground() {
        this.ctx.drawImage(this.imageBackground, 0, 0, this.canvasWidth,this.canvasHeight);
    }

    drawTimer() {
        let font = '25px Rowdies';
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        let text = 'Tiempo: ' + this.secondsLeft + ' segundos';
        this.drawText(text, this.timePosX, this.timePosY, font, 4);
    }

    drawText(text, x, y, font, strokeWidth) {
        let gradient = this.ctx.createLinearGradient(0, 0, this.canvasWidth, 0);

        this.ctx.font = '40px Rowdies';
        if (font) {
            this.ctx.font = font; // Default
        }
        // Definir colores del gradiente
        gradient.addColorStop(0.45, this.colorChipP1);
        gradient.addColorStop(0.55, this.colorChipP2);
        this.ctx.fillStyle = gradient;

        let textWidth = this.ctx.measureText(text).width;
        let centerX = x - textWidth / 2;

        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.lineWidth = 4; // Default
        if (strokeWidth) {
            this.ctx.lineWidth = strokeWidth;
        }
        this.ctx.strokeText(text, centerX, y);

        this.ctx.fillText(text, centerX, y);
    }

    drawArrows = () => {
        this.arrows.forEach(arrow => {
            arrow.draw();
        });
    }

    //<-------------------- FIN DE FUNCIONES DE DIBUJADO EN CANVAS --------------------> 

    //<-------------------- FUNCIONES DE FUNCIONALIDADES DE JUEGO --------------------> 

    endGame() {
        if ((this.teamTurn == 0) && (this.winnerName)) {
            this.drawText("GANADOR " + this.winnerName, this.textTurnPosX, this.textTurnPosY); // Caso donde un jugador gana
        }
        if ((!this.winnerName) || (this.secondsLeft === 0)) {
            this.teamTurn = 0;
            this.drawText("EMPATE", this.textTurnPosX, this.textTurnPosY);
        }
        if (this.intervalId) {
            clearInterval(this.intervalId); // Detiene el intervalo actual
        }
        this.activeChip = null;
        this.intervalId = null;
        this.playerZone1.highlightName(false);
        this.playerZone2.highlightName(false);
    }

    reset() {
        this.teamTurn = Math.floor(Math.random() * 2) + 1; // Devuelve aleatoriamente 1 o 2
        this.activeChip = null;
        this.secondsLeft = this.time;
    
        // Reinicia el tablero
        this.board.initializeEmptyBoard();
        
        // Reinicia el timer
        this.startTimer();

    }

    startTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId); // Detiene el intervalo actual
        }
        this.intervalId = setInterval(() => {
            this.secondsLeft--;
            if (this.secondsLeft <= 0) {
                clearInterval(this.intervalId);
                this.endGame();
            }
        }, 1000);
    }
        
    //<-------------------- FIN DE FUNCIONES DE FUNCIONALIDADES DE JUEGO --------------------> 

    //<-------------------- OBTENCION DE POSICIÓN DE MOUSE CON RESPECTO AL CANVAS --------------------> 

    getMousePos(e) {
        let rect = this.canvas.getBoundingClientRect(); // Esta funcionalidad del canvas nos proporciona un objeto el cual contiene datos del canvas en este caso, tanto de espaciado como de tamaño.
        let scaleX = this.canvasWidth / rect.width;   
        let scaleY = this.canvasHeight / rect.height; 

        return {
            x: (e.layerX - rect.left) * scaleX, 
            y: (e.layerY - rect.top) * scaleY   
        };
    }

}
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