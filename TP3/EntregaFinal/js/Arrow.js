class Arrow {
    constructor(canvas,posX,posY,width,height,ctx){
        this.canvas = canvas;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.scale = 1;         // Escala inicial
        this.growing = true;    // Bandera para saber si está creciendo o encogiendo
        this.max = 60;          // Escala mínima
        this.speed = 0.02;      // Velocidad de cambio de escala
        this.maxDrop = 10;
        this.quantUp = 0;
        this.quantDown = 0;
    }

    draw(){
        let x = this.posX + (this.width / 2);
        let y = this.posY + (this.height / 2);
        
        // Dibujar la flecha
        this.ctx.beginPath();
        this.ctx.fillStyle = "#F7F7F7";
        this.ctx.moveTo(x,y-2.5) ;        // Parte superior izquierda
        this.ctx.lineTo(x + 5, y - 5);    // Punta de la flecha
        this.ctx.lineTo(x , y + 10);      // Parte inferior derecha
        this.ctx.lineTo(x-5, y-5);
        this.ctx.fill();
        this.ctx.closePath();

        
        if(this.growing){
            this.posY += 0.1;
            this.quantDown++;
            if(this.quantDown == this.max){
                this.growing = false;
                this.quantUp = 0;
            }
        }else{    
            this.posY -= 0.1;
            this.quantUp++;
            if(this.quantUp == this.max){
                this.growing = true;
                this.quantDown = 0;
            }              
        }
        
    }

    
}