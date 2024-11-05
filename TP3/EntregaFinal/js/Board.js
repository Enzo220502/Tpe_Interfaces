class Board{
    constructor(canvas, lineSize, width, height, ctx, posDrawX, posDrawY, cellSize, imageBoard){
        this.canvas = canvas;
        this.lineSize = lineSize;
        this.cells = [];
        this.rows = lineSize + 2;
        this.columns = lineSize + 3;
        this.lineSize = lineSize;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.posDrawX = posDrawX;
        this.posDrawY = posDrawY;
        this.cellSize = cellSize;
        this.imageBoard = imageBoard;
        this.columnGap = (this.width - (this.cellSize * this.columns)) / this.columns;
        this.rowGap = (this.height - (this.cellSize * this.rows)) / this.rows;
        this.hiddenCells = this.generateHiddenCells();
        this.initializeEmptyBoard();
    }
    
    getCells() {
        return this.cells;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    initializeEmptyBoard() {
        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.cells[i][j] = 0; //Llena todo el tablero con espacios vacios
            }
        }
    }

    dropChip(chip) {
        if (this.isChipOnDropZone(chip)) {
            let centerChipX = chip.getPosX() + chip.getSize()/2;
            for (let j = 0; j < this.columns; j++) {
                let nextLimit = this.posDrawX + (j + 1) * (this.cellSize + this.columnGap);
                if (centerChipX < nextLimit) {
                    return this.dropChipByColumn(j, chip);
                }
            }
        }
        return false;
    }

    dropChipByColumn(column, chip) {
        for (let i = this.rows - 1; i >= 0; i--) {
            if (this.cells[i][column] === 0) {
                this.cells[i][column] = chip;
                chip.setPositionX(this.posDrawX + (column * this.cellSize) + (column * this.columnGap) + this.columnGap/2- Math.abs(this.cellSize/2 - chip.getSize()/2));
                chip.setFinalPositionY(this.posDrawY + (i * this.cellSize) + (i * this.rowGap) + this.rowGap/2- Math.abs(this.cellSize/2 - chip.getSize()/2));
                chip.setMovable(false);
                return true;
            }
        }
        return false;
    }

    getCell(i, j) {
        return this.cells[i][j];
    }

    draw() {
        this.ctx.fillStyle = "rgb(0, 103, 208)"; // Relleno blanco transparente
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;

        let borderRadius = 10;
        let addOn = 15;
        let x = this.posDrawX;
        let y = this.posDrawY + 1;

        // Dibuja el cuadrado con bordes redondeados
        /*this.ctx.beginPath();
        this.ctx.moveTo(x + borderRadius, y);
        this.ctx.arcTo(x + this.width  + addOn, y, x + this.width, y + this.height, borderRadius);
        this.ctx.arcTo(x + this.width  + addOn, y + this.height, x, y + this.height, borderRadius);
        this.ctx.arcTo(x - addOn, y + this.height , x, y, borderRadius);
        this.ctx.arcTo(x - addOn, y, x + this.width, y, borderRadius);
        this.ctx.closePath();
        
        this.ctx.fill(); // Rellena el cuadrado
        this.ctx.stroke();
        */

        this.drawCells();
        this.drawHiddenCells();

        this.ctx.drawImage(this.imageBoard,x-addOn,y,this.width + (addOn*2),this.height);
    }

    drawCells() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let x = this.posDrawX + (this.columnGap / 2) + (this.cellSize / 2);// Determinamos el padding en ancho 
                let y = this.posDrawY + (this.rowGap / 2) + (this.cellSize / 2); // Determinamos el padding en alto
                if (this.cells[i][j] != 0) {
                    let c = this.cells[i][j];
                    c.draw();
                }
            }
        }
    }

    drawHiddenCells(){
        this.hiddenCells.forEach(c => {
            c.draw();
        });
    }

    isChipOnDropZone(chip) {
        let centerChipX = chip.getPosX() + chip.getSize()/2;
        let centerChipY = chip.getPosY() + chip.getSize()/2;

        let topDropZoneY = this.posDrawY - this.cellSize - this.rowGap; // LInea superior de la drop zone
        let rightDropZoneX = this.posDrawX + this.width;

        if ((centerChipY < this.posDrawY) && (centerChipY > topDropZoneY) && (centerChipX > this.posDrawX) && (centerChipX < rightDropZoneX)) {
            return true;
        }
        return false;
    }

    isOnDropZone(x,y){
        let res = null;
        // Recorre celdas en las cuales puede estar situada el centro de la ficha
        for(let i = 0; i < this.hiddenCells.length; i++){
            if(this.hiddenCells[i].isPointInside(x,y)){
                res =  this.hiddenCells[i];
            }
        }

        return res;
    }

    generateHiddenCells(){
        let x = this.posDrawX + (this.columnGap / 2);// Determinamos el padding en ancho 
        let y = this.posDrawY - this.cellSize; // Determinamos el padding en alto
        let w = this.width/this.columns;
        let res = new Array(this.columns);
        for(let i = 0; i< res.length;i++){
            res[i] = new HiddenCell(this.canvas, x + (i * this.cellSize) + (i * this.columnGap) - (this.columnGap/2), y, w, this.cellSize,this.ctx,0,i);
        }
        return res;
    }

    drawEmptyCell(x, y) {
        this.ctx.fillStyle = "red";
        this.ctx.strokeStyle = "black"; // Color del borde
        this.ctx.lineWidth = 1; // Ancho del borde
    
        let radius = this.cellSize / 2; // Radio de la celda
    
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2); // Dibuja un círculo
        this.ctx.closePath();

        this.ctx.fill();
        this.ctx.stroke(); // Dibuja el borde
    }
    
    hasEmptyCells() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.cells[i][j] === 0) {
                    return true;
                }
            }
        }
        return false;
    }

    hasAWinner() {
        // Comprobar filas
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j <= this.columns - this.lineSize; j++) {
                let count = 0;
                let currentChip = this.cells[i][j]; 
                if (currentChip != 0) {
                    let lineCoords = [];
                    for (let k = j; k < j + this.lineSize; k++) {
                        if ((this.cells[i][k] != 0) && (this.cells[i][k].equals(currentChip))) {
                            lineCoords.push({posI: i, posJ: k});
                            count++;
                        } else {
                            count = 0;
                            lineCoords = [];
                            break;
                        }
                    }
                    if (count === this.lineSize) {
                        return lineCoords;
                    }
                }
            }
        }
    
        // Comprobar columnas
        for (let j = 0; j < this.columns; j++) {
            for (let i = 0; i <= this.rows - this.lineSize; i++) {
                let count = 0;
                let currentChip = this.cells[i][j];
                if (currentChip != 0) {
                    let lineCoords = [];
                    for (let k = i; k < i + this.lineSize; k++) {
                        if ((this.cells[k][j] != 0) && (this.cells[k][j].equals(currentChip))) {
                            lineCoords.push({posI: k, posJ: j});
                            count++;
                        } else {
                            count = 0;
                            lineCoords = [];
                            break;
                        }
                    }
                    if (count === this.lineSize) {
                        return lineCoords;
                    }
                }
            }
        }
    
        // Comprobar diagonales hacia la derecha
        for (let i = 0; i <= this.rows - this.lineSize; i++) {
            for (let j = 0; j <= this.columns - this.lineSize; j++) {
                let count = 0;
                let currentChip = this.cells[i][j];
                if (currentChip != 0) {
                    let lineCoords = [];
                    for (let k = 0; k < this.lineSize; k++) {
                        if ((this.cells[i + k][j + k] != 0) && (this.cells[i + k][j + k].equals(currentChip))) {
                            lineCoords.push({posI: i + k, posJ: j + k});
                            count++;
                        } else {
                            count = 0;
                            lineCoords = [];
                            break;
                        }
                    }
                    if (count === this.lineSize) {
                        return lineCoords;
                    }
                }
            }
        }
    
        // Comprobar diagonales hacia la izquierda
        for (let i = 0; i <= this.rows - this.lineSize; i++) {
            for (let j = this.lineSize - 1; j < this.columns; j++) {
                let count = 0;
                let currentChip = this.cells[i][j];
                if (currentChip != 0) {
                    let lineCoords = [];
                    for (let k = 0; k < this.lineSize; k++) {
                        if ((this.cells[i + k][j - k] != 0) && (this.cells[i + k][j - k].equals(currentChip))) {
                            lineCoords.push({posI: i + k, posJ: j - k});
                            count++;
                        } else {
                            count = 0;
                            lineCoords = [];
                            break;
                        }
                    }
                    if (count === this.lineSize) {
                        return lineCoords;
                    }
                }
            }
        }
    
        return null;
    }

    getArrows(){
        let res = [];
        this.hiddenCells.forEach(cell =>{
            res.push(cell.getArrow());
        });
        return res; 
    }
}