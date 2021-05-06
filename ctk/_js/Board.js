import Tile from './Tile.js'

export default class Board {
    constructor(scene, index){
        this.scene = scene;
        this.boardTileTotal = 81;
        this.tileSize = 3;
        this.index = index;

        this.tiles = new Array();
        
        this.createTiles();
        this.setTilePositions();
    }

    createTiles(){
        let x = 0;
        let y = 0;
        for(let i = 0; i < this.boardTileTotal; i++){
            let height = (1) ;
            if(i % 8 == 0){
                x = 0;
                y++;
            }else{
                x++;
            }
            let tile = new Tile(i, x , y, this.scene, height);
            this.tiles[i] = tile;
        }
        return this.tiles;
    }
    setTilePositions(){
        let x = 0; let z = 0;
        let offset = false;
        for(let i = 0; i < 81; i++){
            //Place cube
            let tile = this.tiles[i];
            tile.metaTile.position.set(x , 0, z);
            
            //Increment x first
            x += (this.tileSize * 0.57);
            
            //If 9 x-row cubes have been placed, increment y
            if(((i) % 9 == 8)) {
                    z += (this.tileSize *0.5);
                    offset = true;
                    x = 0.85; 
                }
            if(((i) % 18 == 17)) {
                offset = false;
                x = 0; 
            }
                     
        }
    }
    shift(direction){
        let metaX, metaY
        for(let i in this.tiles){
            switch(direction){
                case 'right':
                    metaX = ((this.tiles[i].metaTile.position.getComponent(0)) + 15.4);
                    this.tiles[i].metaTile.position.set(metaX, 0, this.tiles[i].metaTile.position.getComponent(2));
                    break;
                case 'left':
                    metaX = ((this.tiles[i].metaTile.position.getComponent(0)) - 15.4);
                    this.tiles[i].metaTile.position.set(metaX, 0, this.tiles[i].metaTile.position.getComponent(2));
                    break;
                case 'up':
                    metaY = ((this.tiles[i].metaTile.position.getComponent(2)) - 13.5);
                    this.tiles[i].metaTile.position.set((this.tiles[i].metaTile.position.getComponent(0) - 0.85), 0, metaY);
                    break;
                case 'down':
                    metaY = ((this.tiles[i].metaTile.position.getComponent(2)) + 13.5);
                    this.tiles[i].metaTile.position.set((this.tiles[i].metaTile.position.getComponent(0) + 0.85), 0, metaY);
                    break;
            }
            
        }
    }
    loadScene() {
        for(let i in this.tiles) {
            this.tiles[i].loadScene();
        }
    }
}