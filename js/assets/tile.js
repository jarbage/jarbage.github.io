const stuck = true;

export default class Tile{
    constructor(width, height,palette){
        this.width = width;
        this.height = height;
        this.palette = palette;
        this.borderRadius = this.TOTAL_rows + 'px';


        this.holdMotion = true;
        this.motionArray = [];
        this.initialVertex = [];
        this.destinationVertex = [];
        this.frameTotal = Math.floor(Math.random() * 2) + 1;
        this.frameIndex = 0;
        this.isStuck = false;
        

        this.x = 0;
        this.y = 0;

        this.div = document.createElement('div');

        this.addAttributes();
    }

    addAttributes(){
        this.div.classList.add("tile");
        this.changeColor();
        this.changeOpacity();
        this.div.style.height = this.height + 'px';
        this.div.style.width = this.width + 'px';
        //this.div.style.borderRadius = this.borderRadius
        this.div.style.position = "absolute"
    }

    moveTile(x,y){
        this.y = y;
        this.x = x;
        this.div.style.top = y + 'px';
        this.div.style.left = x + 'px';

    }
    changeColor(){
        this.div.style.backgroundColor = this.palette[Math.floor((Math.random() * this.palette.length))]
    }
    changeOpacity(){
        this.div.style.opacity = 1;
    }


    motionControl(x,y){
        if(this.isStuck == false){
        //Start of the stroke, sets the Vector Path the tile will travel on over the duration of frames.
        if(this.holdMotion == true){
            this.motionArray = this.getNoiseyMidpoints(this.x, this.y, x,y, this.frameTotal)
            this.changeOpacity();
            this.changeColor();
            this.holdMotion = false;
        }
        if(this.frameIndex < this.frameTotal && this.holdMotion == false){
            let coords = this.motionArray[this.frameIndex]
            this.frameIndex++;
            this.moveTile(coords.x,coords.y)
            //this.moveTile(this.addNoiseToInt(coords.x), this.addNoiseToInt(coords.y))
            
        }
        if(this.frameIndex == this.frameTotal){
            this.holdMotion = true;
            this.frameIndex = 0;
        }
    }
        
        
    }
    
    getMidpoints(x1, y1, x2, y2, steps) {
        let deltaX = (x2 - x1) / (steps + 1);
        let deltaY = (y2 - y1) / (steps + 1);
        let midpoints = [];
      
        for (let i = 1; i <= steps; i++) {
          let midpointX = x1 + deltaX * i;
          let midpointY = y1 + deltaY * i;
          midpoints.push({ x: midpointX, y: midpointY });
        }
      
        return midpoints;
      }
    getNoiseyMidpoints(x1, y1, x2, y2, steps) {
        let deltaX = (x2 - x1) / (steps + 1);
        let deltaY = (y2 - y1) / (steps + 1);
        let midpoints = [];
      
        for (let i = 1; i <= steps; i++) {
          let midpointX = x1 + deltaX * i;
          let midpointY = y1 + deltaY * i;
          midpoints.push({ x: this.addNoiseToInt(midpointX), y: this.addNoiseToInt(midpointY) });
        }
      
        return midpoints;
      }

      addNoiseToInt(inputInt) {
        let noise = Math.floor(Math.random() * 15); // Generates a random integer between 1-10 (inclusive)
        let isPositive = Math.random() < 0.5; // Randomly determines whether to add or subtract the noise value
        let noiseValue = isPositive ? noise : -noise; // Adds or subtracts the noise value based on the previous random determination
        let outputInt = inputInt + noiseValue; // Adds the noise value to the input integer to get the modified output
      
        return outputInt;
      }


}