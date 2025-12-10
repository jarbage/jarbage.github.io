import Tile from '../assets/tile.js'


export default class Model {
    constructor() {
      
    }

    createTile(width, height, palette){
      let tile = new Tile(width,height,palette);
      return tile;
    }
    unload(){

    }
    update() {

    }
  }