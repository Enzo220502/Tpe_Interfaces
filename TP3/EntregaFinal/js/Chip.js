class Chip {
    constructor(posX, posY, size, image, ctx, team) {
        this.posX = posX;
        this.posY = posY;
        this.posYFinal = 0;
        this.rest = 0;
        this.size = size;
        this.image = image;
        this.ctx = ctx;
        this.team = team;
        this.movable = false;
        this.highlighted = false;

        this.velocityY = 2.5; // Velocidad inicial en Y
        this.gravity = 0.3;   // Gravedad que acelera la ficha hacia abajo
        this.bounceFactor = -0.5; // Factor de rebote (negativo para invertir dirección)
        this.isBouncing = false; // Indica si está en modo rebote
    }

    setHighlighted(boolean) {
        this.highlighted = boolean;
    }

    setPosition(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    setPositionX(x){
        this.posX = x;
    }

    setFinalPositionY(y){
        this.posYFinal = y;
        this.rest = (y-this.posY)/180;
    }

    setSize(newSize) {
        this.size = newSize;
    }

    setMovable(boolean) {
        this.movable = boolean;
    }

    setImage(image) {
        this.image = image;
    }

    getImage() {
        return this.image;
    }

    getPosition() {
        return {
            x: this.getPosX,
            y: this.getPosY
        }
    }
    
    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getTeam() {
        return this.team;
    }

    getSize() {
        return this.size;
    }

    isPointInside(x, y) {
        let _x = this.posX - x + this.size/2;
        let _y = this.posY - y + this.size/2;
        return Math.sqrt(_x * _x + _y * _y) < (this.size/2);
    }

    isMovable() {
        return this.movable;
    }

    move(xMove, yMove) {
        this.setPosition(this.posX + xMove, this.posY + yMove);
    }

    newCopy() {
        return new Chip(this.getPosX()
                        , this.getPosY()
                        , this.getSize()
                        , this.getImage()
                        , this.ctx
                        , this.getTeam());
    }

    equals(chip) {
        return this.team === chip.getTeam();
    }

    draw() {
        if (this.image) {
            
            // Si la posición actual es menor a la posición final, sigue cayendo
            if (this.posYFinal > 0 && this.posY < this.posYFinal) { 
                this.velocityY += this.gravity;  // Acelera hacia abajo
                this.posY += this.velocityY;     // Actualiza la posición en Y
            } else if(this.posYFinal>0){

                // La ficha ha llegado a la posición final, empieza a rebotar
                if (!this.isBouncing) {
                    this.isBouncing = true;
                    this.posY = this.posYFinal; // Asegura que no pase de la posición final
                }

                // Rebote
                this.velocityY *= this.bounceFactor; // Invierte dirección y reduce la velocidad
                if (Math.abs(this.velocityY) < 0.5) {
                    // Si la velocidad es muy pequeña, detiene el rebote
                    this.velocityY = 0;
                    this.isBouncing = false;
                } else {
                    this.posY += this.velocityY; // Aplica el rebote
                }
            }

            // Dibuja la imagen de la ficha en el canvas
            this.ctx.beginPath();
            this.ctx.drawImage(this.image, this.posX, this.posY, this.size, this.size);
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 1;
            this.ctx.arc(this.posX + (this.size / 2), this.posY + (this.size / 2), (this.size / 2), 0, Math.PI * 2); // Dibuja un círculo
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
}