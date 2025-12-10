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
      this.palette = new Array();

      paletteInputs.forEach((child) => this.palette.push(child.value))
      
      this.mouse = new Mouse(this.view.canvas);

      this.brush = new Array();

      this.build();
      this.addListeners()
    }
    build(){
      for(let i = 0; i < amountInput.value; i++){
        let tile = this.model.createTile(widthInput.value, heightInput.value, this.palette);
        this.view.canvas.append(tile.div);
        this.view.assetArray.push(tile);
      }
    }

    addListeners(){
      amountInput.addEventListener("change", this.inputsChanged);
    }

    inputsChanged(){
      //clear the view
      this.view.clear();
      //rebuild
      this.build()
    }
    update(){
      this.view.setMotion(this.mouse.x, this.mouse.y)

      if(this.changed != false){
        this.model.update(this.amount, this.palette);
      }
    }
    
  }

  