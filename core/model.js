// import tile from '../js/tile.js'
import Canvas from '../js/map/canvas.js'

export default class Model {
    constructor() {
      this.canvas = new Canvas();
    }

    load(){
      this.canvas.load();
    }
    unload(){

    }
    update() {

    }
  }