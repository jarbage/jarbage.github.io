import Tile from './Tile.js'

export default class Board {
    constructor(scene){
        this.scene = scene;
        this.boardTileTotal = 81;

        this.createTiles();
    }

    createTiles(){
        let x, y, z;
        for(let i = 0; i < boardTileTotal; i++){
            let tile = new Tile(i, scene);


        }
        

    }
}