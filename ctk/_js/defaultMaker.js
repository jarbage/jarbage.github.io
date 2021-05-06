

export default class defaultMaker{
    constructor(model){
        this.model = model;
        this.usedTiles = new Array();
        this.edgeTiles = [0,1,2,3,4,5,6,7,8,9,17,18,26,27,35,36,44,45,53,54,62,63,71,72,73,74,75,76,77,78,79,80]
        
        this.setGrass();
        
        // this.setPath();
        
        
    
        // let ls1 = [1,2,3,10,11,12,19,20,21];
        // let ls2 = [4,5,6,13,15,22,23,24];
        // let ls3 = [7,8,9,16,17,18];
        // let ls4 = [28,29,30,37,38,39,46,47,48];
        // let ls5 = [31,32,33,40,41,42,49,50,51];
        // let ls6 = [34,35,36,43,44,45,52,53,54];
        // let ls7 = [55,56,57,64,65,66,73,74,75];
        // let ls8 = [58,59,60,67,68,69,76,77,78];
        // let ls9 = [61,62,63,70,71,72,79,80,81];


        this.setForest();
        // this.setForest(ls2, 3);
        
        // this.setForest(ls4, 3);
        // this.setForest(ls6, 3);
        // this.setForest(ls7, 3);

        // this.setGold(ls3, 3);

        // this.setAgriculture(ls9, 3);
        // this.setCopper(ls4);
        // this.setStone(ls7);

        //this.makeLeft();

        //this.randomForm();
    }
    setUsed(index){
        if(this.usedTiles.includes(index) == false){
            this.usedTiles[this.usedTiles.length] =  index;
        }
    }


    setGrass(){
        let tile, uTile;
        let grassArray = new Array();
        for(let i = 0; i < this.model.tiles.length; i++){
            tile = this.model.tiles[i].metaTile;
            let heightNoise = ('0.' + (Math.ceil(Math.random() * 3)));
            if(tile.type == "Mesh"){
                tile.material.color.setHex('0x698a1e');
                tile.geometry.scale(1, 0.5,1);
                tile.position.set(tile.position.getComponent(0), heightNoise, tile.position.getComponent(2));
                }
            }   
    }
    setForest(){
        let tile;
        let heightNoise;
        for(let i = 0; i < this.model.tiles.length; i++){
            tile = this.model.tiles[i].metaTile;
            heightNoise = '0.' + Math.ceil(Math.random() * 5);
            if((tile.type == "Mesh") && (heightNoise != '0.3')){
                tile.material.color.setHex('0x335808');
                tile.geometry.scale(1,3,1);
                tile.position.set(tile.position.getComponent(0), heightNoise, tile.position.getComponent(2));
             }
        }
    }
    setKeep(){
        let keepTile = this.model.tiles[22].metaTile;
        let position = [keepTile.position.getComponent(0), keepTile.position.getComponent(1), keepTile.position.getComponent(2)];
        keepTile.material.color.setHex('0x775ebe');
        keepTile.geometry.scale(1, 2.5, 1 );
        keepTile.position.set(position[0], 1, position[2] );
    }
    setPath(pathArray){
        let tile, index, position;
        for(let i in pathArray){
            index = pathArray[i];
            this.setUsed(index);

            tile = this.model.tiles[index].metaTile;

            position = [tile.position.getComponent(0), tile.position.getComponent(1), tile.position.getComponent(2)];
            tile.material.color.setHex('0xc0aa3e');
            tile.geometry.scale(1, 1.5, 1);
            tile.position.set(position[0], (position[1] - 0.3), position[2]);
        }
    }
    setWater(waterArray){
        let tile, index, position;
        for(let i in waterArray){
            index = waterArray[i];
            this.setUsed(index, 'water');
            tile = this.model.tiles[index].metaTile;
            position = [tile.position.getComponent(0), tile.position.getComponent(1), tile.position.getComponent(2)];

            tile.material.color.setHex('0x76bac4');
            tile.geometry.scale(1, 0.5, 1);
            tile.position.set(position[0], (position[1] - 0.3), position[2]);
        }
    }
    setMountain(metaArray){
        let tile, index, position;
        let noise;
        for(let i in metaArray){
            index = metaArray[i];
            
            tile = this.model.tiles[index].metaTile;
            position = [tile.position.getComponent(0), tile.position.getComponent(1), tile.position.getComponent(2)];
            noise = Math.floor(Math.random() * 2);

            switch(this.edgeTiles.includes(index)){
                case true:
                    tile.material.color.setHex('0x95b0be');
                    tile.geometry.scale(1, 2.66, 1);
                    tile.position.set(position[0], parseFloat(position[1] + noise), position[2]);
                    this.setUsed(index);
                    break;
                case false:
                    if(noise != 0){
                    tile.material.color.setHex('0x81969a');
                    tile.geometry.scale(1, 2.33, 1);
                    tile.position.set(position[0], parseFloat(position[1] + noise), position[2]);
                    this.setUsed(index);
                    }else{
                        tile.material.color.setHex('0x7f8d88');
                        tile.geometry.scale(1, 2, 1);
                        tile.position.set(position[0], parseFloat(position[1]), position[2]);
                        this.setUsed(index);

                    }
                    break;
            }
            console.log(tile.matrix);
        }

    }


    randomForm(){
        let randomHeight;
        let colorArray = [Math.floor(Math.random()*16777215).toString(16),Math.floor(Math.random()*16777215).toString(16) ,Math.floor(Math.random()*16777215).toString(16) ]
        console.log(colorArray[0] + ' | ' + colorArray[1] + ' | ' + colorArray[2] );
        for(let i in this.model.scene.children){
            let tile = this.model.scene.children[i];
            randomHeight = Math.ceil(Math.random() * 3)
            if(tile.type == "Mesh"){
                let position = [tile.position.getComponent(0), tile.position.getComponent(1), tile.position.getComponent(2)];
                switch(randomHeight){
                    case 1:
                        tile.material.color.setHex('0x' + colorArray[0]);
                        tile.position.set(position[0], 0, position[2]);
                        break;
                    case 2:
                        tile.material.color.setHex('0x' + colorArray[1]);
                        tile.position.set(position[0], 0.25, position[2]);
                        tile.geometry.scale(1, 1.1, 1 )
                        break;
                    case 3:
                        tile.material.color.setHex('0x' + colorArray[2]);
                        tile.position.set(position[0], 0.5, position[2]);
                        tile.geometry.scale(1, 1.2, 1)
                        break;
                }
            }   
        }
    }
}