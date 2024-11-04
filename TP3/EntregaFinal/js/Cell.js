class Cell extends Figure{
    constructor(posX,posY,width,height,context,row,column,chip = null,radiusChip = 17.5){
        super(posX,posY,context);
        this.id = parseInt(Math.random()*(posX + posY));
        this.width = width;
        this.height = height;
        this.centerX = posX + this.width/2;
        this.centerY = posY + this.height/2;
        this.row = row;
        this.column = column;
        this.chip = chip;
        this.radiusChip = radiusChip
    }

    getWidth(){
        return this.width;
    }
    
    getHeight(){
        return this.height;
    }

    hasChip(){
        return this.chip != null;
    }

    getId(){
        return this.id;
    }

    getCenterX(){
        return this.centerX;
    }

    getCenterY(){
        return this.centerY;
    }

    getRow(){
        return this.row;
    }

    getColumn(){
        return this.column;
    }

    setPosX(posX){
        this.posX = posX;
    }
    
    setPosY(posY){
        this.posY = posY;
    }

    setChip(chip){
        this.chip = chip;
    }
    
    getCopy(){
        return new Cell(this.posX,this.posY,this.width,this.height,this.ctx,this.row,this.column,this.chip,this.radiusChip);
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radiusChip, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "black";

        if(this.chip != null){
            this.chip.setPosX(this.posX + parseInt(this.width/2));
            this.chip.setPosY(this.posY + parseInt(this.height/2));
        }else{
            this.ctx.fillStyle = "#f2e1d7";
            this.ctx.fill();
        }
        this.ctx.closePath();
    }
}