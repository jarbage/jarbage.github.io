import Mouse from '../digibrush/mouse.js'

const footer = document.getElementById('footer')

const amountInput = document.getElementById('amount');
const paletteInputs = Array.from(document.getElementsByClassName('colorPalette'));
const heightInput = document.getElementById('height');
const widthInput = document.getElementById('width');

export default class Controller {
    constructor(game, model, view) {
      this.game = game;
      this.view = view;
      this.model = model;

      this.changed = false;

      this.amount = amountInput.value
      this.palette = paletteInputs;
      this.height = heightInput.value;
      this.width = widthInput.value;
      
      this.mouse = new Mouse(this.view);

      this.brush = new Array();

      this.build()
    }
    build(){
      for(let i = 0; i < amountInput.value; i++){
        let tile = this.model.createTile(this.width, this.height, this.palette);
        this.view.canvas.append(tile.div);
        this.view.assetArray.push(tile);
      }
    }


    inputsCheck(){
      //Amount
      if(amountInput.value != this.amount){
        this.amount = amountInput.value;
        this.changed = true;
      }

      //Palette
      if(paletteInputs != this.palette){
        this.palette = paletteInputs;
        this.changed = true;
      }

      //Height
      if(this.height != heightInput.value){
        this.height = heightInput.value;
        this.changed = true;
      }

      //Height
      if(this.width != widthInput.value){
        this.width = widthInput.value;
        this.changed = true;
      }

    }
    update(){
      this.inputsCheck();
      this.view.setMotion(this.mouse.x, this.mouse.y)

      if(this.changed != false){
        this.view.clear();
        this.build();
        this.changed = false;
      }
    }
    
  }

  