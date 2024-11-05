class HiddenCell{
    constructor(canvas,posX,posY,width,height,ctx,row,column){
        this.canvas = canvas;
        this.ctx = ctx;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.row = row;
        this.column = column;
        this.arrow = new Arrow(canvas,posX,posY,width,height,ctx);
    }

    draw(){} // Este elemento no cuenta con una visualización grafica en el canvas
    
    isPointInside(x,y){
        let x_max = this.posX + (this.width);
        let y_max = this.posY + (this.height);
        return ((x >= this.posX && x <= x_max) && ( y >= this.posY && y <= y_max));
    }

    getArrow(){
        return this.arrow;
    }

    getCenter(){
        return{
            x:(this.posX + (this.width)),
            y:(this.posY)
        }
    }

    getMiddle(){
        let x = this.posX + (this.width / 2);
        let y = this.posY + (this.height / 2);
        return {
            x: x,
            y: y
        };
    }
}