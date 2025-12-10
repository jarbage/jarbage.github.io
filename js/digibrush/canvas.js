import Mouse from './mouse.js'

import Tile from '../assets/tile.js'



export default class Canvas {
    constructor(renderWindow) {
      this.window = renderWindow;
      this.mouse = new Mouse(renderWindow);
      this.TOTAL_columns = Math.floor(renderWindow.clientWidth / 333);
      this.TOTAL_rows = Math.floor(renderWindow.clientHeight / 333);
      this.amount = 200;
      
      this.tileArray = this.makeTiles();

      this.inc_1 = 0;

    }

    onTimer() {
        //this.followMouse();
        this.setStuck();
        this.setMotion();
        
        //this.scatter();
        //this.motionControl();
        //this.slowConverge();
    }
    setMotion(){
        let rand = Math.floor(Math.random() * this.amount)
        this.tileArray.forEach(tile =>{
            if(Math.floor(Math.random() * 2) == 1){
                tile.motionControl(this.mouse.x, this.mouse.y)

            }
        })
    }
    setStuck(){
        let rand = Math.floor(Math.random() * this.amount)
        if(this.mouse.down == true){
            this.tileArray[rand].isStuck = true;
        }
        if(this.mouse.reset == true){
            this.tileArray.forEach(tile =>{
                tile.isStuck = false
            })
            
        }

    }

    
    followMouse(){
        let delay = this.amount * 4
        if(this.inc_1 == delay ){
           this.inc_1 = 0;
           let rand = Math.floor(Math.random() * this.amount)
           this.tileArray[rand].moveTile(this.mouse.x, this.mouse.y)
        }
        this.inc_1 += 1;
        
    }
    scatter(){
        let rand = Math.floor(Math.random() * this.amount)
        this.tileArray[rand].moveTile(Math.floor(Math.random() * this.window.clientWidth), Math.floor(Math.random() * this.window.clientWidth))
    }


    slowConverge(){
        let amount = 10
        this.tileArray.forEach(tile =>{
            
             if(tile.y != this.mouse.y || tile.x != this.mouse.x){
                tile.moveTile((tile.x % this.mouse.x) + tile.x,(tile.y % this.mouse.y ) + tile.y)
             }
        })


    }

    makeTiles(){
        let temp = [];
        for(let i = 0; i < this.amount; i++){
            let tile = new Tile(this.window, this.mouse);
            tile.append();
            temp[i] = tile;
        }
        return temp;
    }

}

