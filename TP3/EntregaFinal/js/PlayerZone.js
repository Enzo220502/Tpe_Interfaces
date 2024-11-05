class PlayerZone{
    constructor (posDrawX,  posDrawY, width, height, name,  team, chipImage, chipSize, ctx, quantityChips, colorChip) {
        // Contexto
        this.ctx = ctx;
        
        // Posicionamiento
        this.posDrawX = posDrawX;
        this.posDrawY = posDrawY;
        this.width = width;
        this.height = height;
        
        // Datos del Jugador
        this.team = team;
        this.name = name;
        this.availableToPlay = false;
        
        this.chipSize = chipSize;
        this.chipRadius = ((chipSize*1.5)/2);   
        this.colorChip = colorChip;
        this.chipImage = chipImage;
        this.chipHeight = 8;                // Grosor de la ficha
        this.numChips = quantityChips;      // Número de fichas totales
        
        // Datos de ficha
        this.chip = new Chip(posDrawX + (width - chipSize * 1.5) / 2, posDrawY + height - (this.chipHeight * (quantityChips/2)), chipSize * 1.5, chipImage, ctx, team); 
        
        // Datos pilas de fichas
        this.chipStack = new Array();
        this.displacement = 3;            // Indica el valor que oscila entre x y -x para definir el desplazazmiento de la pila de fichas
        this.loadChipStack();
        
        this.drawArrow();
    }


    getStackChipPosY(){
        let pos = null;
        if(this.chipStack[0].length > this.chipStack[1].length){
            let stack = this.chipStack[0];
            pos = stack[stack.length - 1].getPosY();
        }else{
            let stack = this.chipStack[1];
            pos = stack[stack.length - 1].getPosY();
        }
        return pos;
    }

    drawChip() {
        if(this.chip != null){
            this.chip.draw();
        }else{
            this.ctx.font = '16px Rowdies';
            this.ctx.fillStyle = '#F7F7F7';
            let textWidth = this.ctx.measureText("No hay mas fichas").width;
            let centerX = this.posDrawX + (this.width - textWidth) / 2;
            this.ctx.fillText("No hay mas fichas", centerX, this.posDrawY + (this.height/2));
        }
    }

    decreaseChips(){
        if(this.chipStack[0].length > 0){
            let elem = this.chipStack[0];
            elem.pop(elem[this.chipStack.length - 1]);
        }else{
            if(this.chipStack[1].length === 0){
                this.chip = null;
            }else{
                let elem = this.chipStack[1];
                elem.pop(elem[this.chipStack.length - 1]);
            }

        }
    }

    getTeam() {
        return this.chip.getTeam();
    }

    getChip() {
        let copyChip = this.chip.newCopy();
        copyChip.setSize(this.chipSize);
        let movement = (this.chipSize * 1.5 - this.chipSize)/2;
        copyChip.move(movement, movement);
        return copyChip;
    }

    getName() {
        return this.name;
    }

    setAvailableToPlay(boolean) {
        this.availableToPlay = boolean;
    }

    highlightName(boolean) {
        this.highlighted = boolean;
    }

    isAvailableToPlay() {
        return this.availableToPlay;
    }

    isChipClicked(x, y){
        return this.chip.isPointInside(x, y);
    }

    draw() {
        
        let borderRadius = 25;
        let x = this.posDrawX;
        let y = this.posDrawY;
        
        this.ctx.fillStyle = 'rgb(0, 103, 208)'; // Relleno blanco transparente
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        
        // Dibuja el cuadrado con bordes redondeados
        this.ctx.beginPath();
        this.ctx.moveTo(x + borderRadius, y);
        this.ctx.arcTo(x + this.width, y, x + this.width, y + this.height, borderRadius);
        this.ctx.arcTo(x + this.width, y + this.height, x, y + this.height, borderRadius);
        this.ctx.arcTo(x, y + this.height, x, y, borderRadius);
        this.ctx.arcTo(x, y, x + this.width, y, borderRadius);
        this.ctx.closePath();
        
        this.ctx.fill(); // Rellena el cuadrado
        this.ctx.stroke();
        
        this.drawName();
        this.drawChipStack();
        this.chip.setPosition(this.chip.getPosX(),this.getStackChipPosY() - (this.chipSize*2));
    }
    
    drawName() {
        this.ctx.font = '22px Rowdies';
        this.ctx.fillStyle = 'rgba(247,247,247,1)';
        let textWidth = this.ctx.measureText(this.name).width;
        let centerX = this.posDrawX + (this.width - textWidth) / 2;
    
        if (this.highlighted) {
            this.ctx.fillStyle = 'rgba(247,247,247,100)';
            let textHeight = 10; 
            let arrowHeight = textHeight / 2; 
            let arrowWidth = 10; 
            let arrowSpacing = 6; 
            let arrowCenterY = this.posDrawY + 22;
    
            // Dibuja la flecha izquierda
            this.ctx.beginPath();
            this.ctx.moveTo(centerX - arrowSpacing, arrowCenterY);
            this.ctx.lineTo(centerX - arrowSpacing - arrowWidth, arrowCenterY - arrowHeight);
            this.ctx.lineTo(centerX - arrowSpacing - arrowWidth, arrowCenterY + arrowHeight);
            this.ctx.fill();
            this.ctx.closePath();
    
            // Dibuja la flecha derecha
            this.ctx.beginPath();
            this.ctx.moveTo(centerX + textWidth + arrowSpacing, arrowCenterY);
            this.ctx.lineTo(centerX + textWidth + arrowSpacing + arrowWidth, arrowCenterY - arrowHeight);
            this.ctx.lineTo(centerX + textWidth + arrowSpacing + arrowWidth, arrowCenterY + arrowHeight);
            this.ctx.fill();
            this.ctx.closePath();
        }else{
            this.ctx.fillStyle = 'rgba(247,247,247,0.5)';
        }
    
        this.ctx.fillText(this.name, centerX, this.posDrawY + 30);
    }
    
    drawArrow() {
        // Dibujar la flecha
        if(this.ctx){
            this.ctx.beginPath();
            this.ctx.moveTo(-10, -10); // Parte superior izquierda
            this.ctx.lineTo(10, 0);    // Punta de la flecha
            this.ctx.lineTo(-10, 10);  // Parte inferior derecha
            this.ctx.lineTo(-5, 0);    // Conectar al centro
            this.ctx.closePath();
            this.ctx.fillStyle = "black";
            this.ctx.fill();
        }
    }

    loadChipStack(){
        let quantityStacks = parseInt((this.numChips - 1 )/2);
        
        this.chipStack.push(new Array());
        this.chipStack.push(new Array());

        for(let i = 0; i < this.chipStack.length; i++){
            this.loadArray(this.chipStack[i], quantityStacks, i);
        }
    }

    loadArray( array, quantityChipsByStack, num){
        // Configuración de la pila de fichas
        let x = this.posDrawX + (this.width/2) - (this.chipSize/2); // Posición X del centro de la pila
        let y = this.posDrawY + (this.height - this.chipSize);      // Posición Y de la base de la pila
        
        for(let i = 0; i < quantityChipsByStack; i++){
            
            let chipY = y - i * 6;
            let randomNum = Math.random() * 2 * this.displacement - this.displacement;
            
            if(num === 0){
                // Agregando fichas a la pila 1
                array.push(new ChipStackeable((x + randomNum) - (this.chipSize*1),chipY,this.chipSize,5,this.colorChip,this.ctx));
            }else{
                // Agregando fichas a la pila 2
                array.push(new ChipStackeable((x + randomNum) + (this.chipSize*1),chipY,this.chipSize,5,this.colorChip,this.ctx));
            }
        }
    }

    drawChipStack() {
        for(let i = 0; i <this.chipStack.length; i++){
            let stack =  this.chipStack[i];
            for(let j = 0; j < stack.length; j++){
                stack[j].draw();
            }
        }
    }
}