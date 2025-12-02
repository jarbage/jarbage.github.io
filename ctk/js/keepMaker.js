

export default class mapMaker{
    constructor(model){
        this.model = model;
        this.usedTiles = new Array();
        this.keepTile = this.model.scene.children[15]
        
        
        this.setGrass();
        this.setKeep(this.keepTile, 15);
        this.setPath();
        
        
    
        let ls1 = [1,2,3,10,11,12,19,20,21];
        let ls2 = [4,5,6,13,15,22,23,24];
        let ls3 = [7,8,9,16,17,18];
        let ls4 = [28,29,30,37,38,39,46,47,48];
        let ls5 = [31,32,33,40,41,42,49,50,51];
        let ls6 = [34,35,36,43,44,45,52,53,54];
        let ls7 = [55,56,57,64,65,66,73,74,75];
        let ls8 = [58,59,60,67,68,69,76,77,78];
        let ls9 = [61,62,63,70,71,72,79,80,81];


        this.setForest(ls1, 3);
        this.setForest(ls2, 3);
        
        this.setForest(ls4, 3);
        this.setForest(ls6, 3);
        this.setForest(ls7, 3);

        this.setGold(ls3, 3);

        this.setAgriculture(ls9, 3);
        this.setCopper(ls4);
        this.setStone(ls7);

        //this.makeLeft();

        //this.randomHeight();
    }
    
    setKeep(keepTile, KTnum){
        let position = [keepTile.position.getComponent(0), keepTile.position.getComponent(1), keepTile.position.getComponent(2)];
        this.keepTile.material.color.setHex('0x775ebe');
        this.keepTile.geometry.scale(1, 4, 1 );
        this.keepTile.position.set(position[0], 1, position[2] );
        
        this.usedTiles[this.usedTiles.length] = KTnum;
    }
    setPath(){
        let pathArray = [77, 67, 59, 49, 41, 31, 27, 23, 24, 25, 26];
        for(let i in pathArray){
            let tile = this.model.scene.children[pathArray[i] + 1];
            let position = [tile.position.getComponent(0), tile.position.getComponent(1), tile.position.getComponent(2)];
            tile.material.color.setHex('0xc0aa3e');
            tile.geometry.scale(1, 0.025, 1);
            tile.position.set(position[0], (position[1] - 0.3), position[2]);
            this.usedTiles[this.usedTiles.length] = pathArray[i];
        }
    }
    setGrass(){
        let tile, uTile;
        let grassArray = new Array();
        for(let i in this.model.scene.children){
            tile = this.model.scene.children[i];
            let heightNoise = ('0.' + (Math.ceil(Math.random() * 3)));
            if(tile.type == "Mesh"){
                tile.material.color.setHex('0x698a1e');
                tile.geometry.scale(1, 0.5,1);
                tile.position.set(tile.position.getComponent(0), heightNoise, tile.position.getComponent(2));
                }
            }   
    }
    setCopper(latinSquare){
        let randomTile = Math.floor(Math.random() * latinSquare.length);
        let tile = this.model.scene.children[(latinSquare[randomTile] + 1)];

        tile.material.color.setHex('0xb66e06');
        tile.geometry.scale(1, 1.25, 1);
        tile.position.set(tile.position.getComponent(0), 0.5, tile.position.getComponent(2))

        this.usedTiles[this.usedTiles.length] = latinSquare[randomTile];
    }
    setStone(latinSquare){
        let randomTile = Math.floor(Math.random() * latinSquare.length);
        let tile = this.model.scene.children[(latinSquare[randomTile] + 1)];
        
        tile.material.color.setHex('0x94af9c');
        tile.geometry.scale(1, 1.25, 1);
        tile.position.set(tile.position.getComponent(0), 0.5, tile.position.getComponent(2))

        this.usedTiles[this.usedTiles.length] = latinSquare[randomTile];
    }
    setGold(latinSquare){
        let randomTile = Math.floor(Math.random() * latinSquare.length);
        let tile = this.model.scene.children[(latinSquare[randomTile] + 1)];
        
        tile.material.color.setHex('0xd9b136');
        tile.geometry.scale(1, 1.25, 1);
        tile.position.set(tile.position.getComponent(0), 0.5, tile.position.getComponent(2))

        this.usedTiles[this.usedTiles.length] = latinSquare[randomTile];
    }
    setForest(latinSquare, spliceAmount){
        let spliceIndex;
        let j = latinSquare.length;
        for(let i in this.usedTiles){
            let uTile = this.usedTiles[i];
            for(let e = 0; e < j; e++){
                if(latinSquare[e] == uTile){
                    console.log(latinSquare[e] + ' | ' + uTile);
                    latinSquare.splice(e, 1);
                }
            }
        }
        for(let i = 0; i < spliceAmount; i++){
            spliceIndex = Math.floor(Math.random()* latinSquare.length)
            latinSquare.splice(spliceIndex, 1);
        }
        let tile;
        for(let i in latinSquare){
            let heightNoise = '0.' + Math.ceil(Math.random() * 5);
            tile = this.model.scene.children[(latinSquare[i] + 1)]
            tile.material.color.setHex('0x335808');
            tile.geometry.scale(1,3,1);
            tile.position.set(tile.position.getComponent(0), heightNoise ,tile.position.getComponent(2));
        }

    }
    setAgriculture(latinSquare, spliceAmount){
        let spliceIndex;
        let j = latinSquare.length;
        //Checks usedTiles Array
        for(let i in this.usedTiles){
            let uTile = this.usedTiles[i];
            for(let e = 0; e < j; e++){
                if(latinSquare[e] == uTile){
                    console.log(latinSquare[e] + ' | ' + uTile);
                    latinSquare.splice(e, 1);
                }
            }
        }
        //Modifies the LatinSquare
        for(let i = 0; i < spliceAmount; i++){
            spliceIndex = Math.floor(Math.random()* latinSquare.length)
            latinSquare.splice(spliceIndex, 1);
        }
        for(let i in latinSquare){
            this.model.scene.children[(latinSquare[i] + 1)].material.color.setHex('0xa7a83b');
            this.model.scene.children[(latinSquare[i] + 1)].geometry.scale(1,0.6,1);
        }

    }
    



    randomHeight(){
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