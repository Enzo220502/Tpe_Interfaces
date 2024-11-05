class Figure{

    constructor(posX,posY,context){
        this.posX = posX;
        this.posY = posY;
        this.ctx = context;
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    setPosX(pos){
        this.posX = pos;
    }
    
    setPosY(pos){
        this.posY = pos;
    }
}