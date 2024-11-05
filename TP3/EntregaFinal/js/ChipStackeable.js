class ChipStackeable{
    constructor(posX,posY,width,height,color,ctx){
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.ctx = ctx;
    }

    draw(){

        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#000000"; // Borde negro
        this.ctx.strokeRect(this.posX,this.posY,this.width,this.height);
        this.ctx.fillRect(this.posX,this.posY,this.width,this.height);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        
    }

    getPosition(){
        return {
            x : this.posX ,
            y : this.posY
        };
    }

    getPosY(){
        return this.posY;
    }
}