export default class ctk_Terrain{

    constructor(svgNode, polygonNodeArray){
        this.svgNode = svgNode;
        this.polygonNodeArray = polygonNodeArray;
        
        var waterArray = new Array();
        var oreArray = new Array();
        var agriArray = new Array();
        var goldArray = new Array();
        
        this.terrainGenerator(polygonNodeArray);
    }

    terrainGenerator(polygonNodeArray){

        setOutOfBounds(polygonNodeArray);
        findBoxBoundaries(polygonNodeArray);

        setForest(polygonNodeArray);

        let amountofWater = Math.floor(polygonNodeArray.length * 0.03);
        setWater(polygonNodeArray, amountofWater);

        setKeep();
        setPath();
    }

}

function setOutOfBounds(polygonNodeArray){
    for(let i in polygonNodeArray){
        let polygonNode = polygonNodeArray[i];
        if(($(polygonNode).attr('row')    == 0) 
        ||(($(polygonNode).attr('column') == 0) 
        || ($(polygonNode).attr('column') == 15.5))){
                    $(polygonNode).attr('OOB', true);
                    $(polygonNode).remove();
        }
    }
    for(let i in polygonNodeArray){
        if($(polygonNodeArray[i]).attr('OOB') == "true"){
            polygonNodeArray.splice(i,1);
        }
    }
}

var rowMin, rowMax, columnMin, columnMax;
function findBoxBoundaries(polygonNodeArray){

    rowMin = parseFloat($(polygonNodeArray[Math.floor(polygonNodeArray.length / 2)]).attr('row'));
    rowMax = parseFloat($(polygonNodeArray[Math.floor(polygonNodeArray.length / 2)]).attr('row'));
    columnMin = parseFloat($(polygonNodeArray[Math.floor(polygonNodeArray.length / 2)]).attr('column'));
    columnMax = parseFloat($(polygonNodeArray[Math.floor(polygonNodeArray.length / 2)]).attr('column'));

    for(let i in polygonNodeArray){
        let polygonNode = polygonNodeArray[i];
        let polygonRow = parseFloat($(polygonNode).attr('row'));
        let polygonColumn = parseFloat($(polygonNode).attr('column'));

        if((polygonRow < rowMin) && $(polygonNode).attr('OOB') != "true"){
            rowMin = polygonRow;
        }
        if((polygonRow >= rowMax) && $(polygonNode).attr('OOB') != "true"){
            rowMax = polygonRow;
        }
        if((polygonColumn < columnMin) && $(polygonNode).attr('OOB') != "true"){
            columnMin = polygonColumn;
        }
        if((polygonColumn >= columnMax) && $(polygonNode).attr('OOB') != "true"){
            columnMax = polygonColumn;
        }
    }
}

var forestArray = new Array();
function setForest(polygonNodeArray){
    for(let i in polygonNodeArray){
        let polygonNode = polygonNodeArray[i];
        if( ( ($(polygonNode).attr('row')    == 0.5)  ||   ($(polygonNode).attr('row') == 1) ) 
         || ( ($(polygonNode).attr('row')    == 18)   ||   ($(polygonNode).attr('row') == 18.5) )
         || ( ($(polygonNode).attr('column') == 0.5)) ||($(polygonNode).attr('column') == 15) ){
            $(polygonNode).attr('fill' , '#234b1e');
            $(polygonNode).attr('tile-type' , 'forest');
            forestArray[(forestArray.length)] = polygonNode;
        }
    }
}

var waterArray = new Array();
function setWater(polygonNodeArray, amountofWater){
    let startTileRow = getRandomIntInclusive(rowMin, rowMax);
    let startTileColumn = getRandomIntInclusive(columnMin, columnMax);
    let tileType = "water";

    let startTile = $('[row="'+ (startTileRow)+'"][column="'+(startTileColumn)+'"]');

    waterArray[0] = startTile.attr('id');

    startTile.attr('fill' , '#4A77f3');

    changeSurrounding(startTile, tileType);
    //propogateWater();
}

function changeSurrounding(tile, tileType){
    
    let refRow = parseFloat(tile.attr('row'));
    let refCol = parseFloat(tile.attr('column'));

    let alteredTile = $('[row="'+ (refRow)+'"][column="'+(refCol)+'"]');
    
    for(let i = 0; i <= 5; i++){
        switch(i){
            case i = 0:
                alteredTile = $('[row="'+ (refRow - 1)+'"][column="'+(refCol)+'"]');
                break;
            case i = 1:
                alteredTile = $('[row="'+ (refRow - .5)+'"][column="'+(refCol + .5)+'"]');
                break;
            case i = 2:
                alteredTile = $('[row="'+ (refRow + .5)+'"][column="'+(refCol + .5)+'"]');
                break;
            case i = 3:
                alteredTile = $('[row="'+ (refRow + 1)+'"][column="'+(refCol)+'"]');
                break;
            case i = 4:
                alteredTile = $('[row="'+ (refRow + .5)+'"][column="'+(refCol - .5)+'"]');
                break;
            case i = 5:
                alteredTile = $('[row="'+ (refRow - .5)+'"][column="'+(refCol - .5)+'"]');
                break;
        }

        waterArray[waterArray.length] = alteredTile.attr('id');
        alteredTile.attr('tile-type',''+tileType+'');
        alteredTile.attr('fill', '#4A77f3');
        
    }

}

function directionGreenLighter(direction, arrayIndex, refRow, refColumn){

    let column = refColumn;
    let row = refRow;
    let i = arrayIndex;


    switch(direction){
        case 0:
            row -= 1;
            let potentialTile = $('[column="'+ column +'"][row="'+ row +'"]');
            if(potentialTile.attr('tile-type') != 'default'){
                //direction  = getRandomIntInclusive(0,5);
                break;
            }
            else{
                waterArray[i] = potentialTile;
            }
        case 1:
            nextTile = $('[column="'+ (column += .5) +'"][row="'+ (row -= .5) +'"]');
            if($(nextTile).attr('tile-type') != 'default'){
                direction = getRandomIntInclusive(0,5);
                break;
            }else{
                return $(nextTile);
            }
        case 2:
            nextTile = $('[column="'+ (column += .5) +'"][row="'+ (row += .5) +'"]');
            if($(nextTile).attr('tile-type') != 'default'){
                direction = getRandomIntInclusive(0,5);
                break;
            }else{
                return nextTile;
            }
        case 3:
            nextTile = $('[column="'+ (column) +'"][row="'+ (row += 1) +'"]');
            if($(nextTile).attr('tile-type') != 'default'){
                direction = getRandomIntInclusive(0,5);
                break;
            }else{
                return nextTile;
            }
        case 4:
            nextTile = $('[column="'+ (column += .5) +'"][row="'+ (row -= .5) +'"]');
            if($(nextTile).attr('tile-type') != 'default'){
                direction = getRandomIntInclusive(0,5);
                break;
            }else{
                return nextTile;
            }
        case 5:
            nextTile = $('[column="'+ (column -= .5) +'"][row="'+ (row -= .5) +'"]');
            if($(nextTile).attr('tile-type') != 'default'){
                direction = getRandomIntInclusive(0,5);
                break;
            }else{
                return nextTile;
            }
            

    }
}

function setKeep(polygonNodeArray){
    let startTileRow = getRandomIntInclusive(rowMin, rowMax);
    let startTileColumn = getRandomIntInclusive(columnMin, columnMax);

    var keepTile = $('[row="'+ (startTileRow)+'"][column="'+(startTileColumn)+'"]');

    keepTile.attr('tile-type' , 'keep');
    keepTile.attr('fill' , '#e80cd0')
    

    $('#keep_coordinates').html('Row: '+rowMin +' | '+rowMax+' | Column: '+columnMin+' | '+ columnMax + '');

}

var pathArray = new Array();
function setPath(){
    //let pathLength = Math.floor(polygonNodeArray.length / 13);
    let randomForestTile = getRandomIntInclusive(0,forestArray.length);
    let forestTile_start = forestArray[randomForestTile];
    
    $(forestTile_start).attr("fill", "#fcee9e");

    for(let i = 0; i < 2; i++){
        let subTileRow = getRandomIntInclusive(rowMin, rowMax);
        let subTileColumn = getRandomIntInclusive(columnMin, columnMax);
        pathArray[i] = $('[row="'+subTileRow+'"][column="'+subTileColumn+'"]')
        pathArray[i].attr('tile-type','path');
        pathArray[i].attr('fill', '#fcee9e' )
        pathArray.sort();
        console.log(pathArray[i].attr('row')+' | '+pathArray[i].attr('column')+'');

    }

    //surroundingTileChecker(forestTile_start);
}

function surroundingTileChecker(tile){
    let surroundTileArray = [null,null,null,null,null,null];
    let tile_row = parseFloat($(tile).attr('row'));
    let tile_column = parseFloat($(tile).attr('column'));

     for(let i in surroundTileArray){
        switch(parseInt(i)){
            //Finds the Surrounding Tiles going Clockwise
            case 0:
                //Tippity Top Tile || 12am/pm
                let TT_Row = (tile_row - 1);
                let TT_Column = (tile_column);
                surroundTileArray[0] = $('[column="'+ TT_Column +'"][row="'+ TT_Row +'"]');
                break;
            case 1:
                //Top Right Tile || 2am/pm
                let TR_Row = (tile_row - .5);
                let TR_Column = (tile_column + .5);
                surroundTileArray[1] = $('[column="'+ TR_Column +'"][row="'+ TR_Row +'"]');
                break;
            case 2:
                //Bottom Right Tile || 4am/pm
                let BR_Row = (tile_row + .5);
                let BR_Column = (tile_column + .5);
                surroundTileArray[2] = $('[column="'+ BR_Column +'"][row="'+ BR_Row +'"]');
                break;
            case 3:
                //Bippity Bottom Tile || 6am/pm
                let BB_Row = (tile_row + 1);
                let BB_Column = (tile_column);
                surroundTileArray[3] = $('[column="'+ BB_Column +'"][row="'+ BB_Row +'"]');
                break;
            case 4:
                //Bottom Left Tile || 8am/pm
                let BL_Row = (tile_row + .5);
                let BL_Column = (tile_column - .5);
                surroundTileArray[4] = $('[column="'+ BL_Column +'"][row="'+ BL_Row +'"]');
                break;
            case 5:
                //Top Left Tile || 10am/pm
                let TL_Row = (tile_row - .5);
                let TL_Column = (tile_column - .5);
                surroundTileArray[5] = $('[column="'+ TL_Column +'"][row="'+ TL_Row +'"]');
                break; 
        }
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }