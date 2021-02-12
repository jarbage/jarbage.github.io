

//On Load Declare the SVG and append it to DOM
$(window).on('load', function(){

    const targetDiv = document.getElementById('gamewindow');

    const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgNode.setAttributeNS(null, 'preserveAspectRatio' , 'xMidYMid slice')

    var hexArray = new Array();

    var windowInnerWidth = targetDiv.clientWidth;
    var windowInnerHeight = targetDiv.clientHeight;

    svgNode.setAttributeNS(null, 'viewBox' , '0 0 '+ windowInnerWidth + ' ' + windowInnerHeight + '');

    targetDiv.appendChild(svgNode);

    mapBuilder(svgNode, windowInnerWidth, windowInnerHeight);



    function mapBuilder(svgNode, width, height){
        
        var hexXInc = 0;
        var hexYInc = 0;

        var offsetBoolean = false;

        //var polygonWidth = 100;
        //var polygonHeight = (polygonWidth * 0.86);

        for(i = 0; i < 900; i++){
            let polygonNode = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygonNode.setAttributeNS(null, 'id' , 'hexTile' + i + '');
            polygonNode.setAttributeNS(null, 'class', 'hexTile');
            polygonNode.setAttributeNS(null, 'tile-type','default')
            polygonNode.setAttributeNS(null, 'points', "0,-21.5 25,-21.5 37.5,0 25,21.5 0,21.5 -12.5,0");
            polygonNode.setAttributeNS(null, 'fill', '#498c40');
            polygonNode.setAttributeNS(null, 'stroke', '#000');
            polygonNode.setAttributeNS(null, 'stroke-width', '2px');
            polygonNode.setAttributeNS(null, 'transform', 'translate('+ hexXInc + ' ' + hexYInc + ')');


            if(hexXInc < windowInnerWidth){
                hexXInc += 75;
            }
            if(hexXInc > windowInnerWidth && offsetBoolean == false){
                hexXInc = 37.5;
                hexYInc += 21.5;
                offsetBoolean = true;
            }
            if(hexXInc > windowInnerWidth && offsetBoolean == true){
                hexXInc = 0;
                offsetBoolean = false;
                hexYInc += 21.5;
            }

            //Adds event function 
            polygonNode.addEventListener('click', function(){
                let polygonID = polygonNode.getAttributeNS(null, 'id');
                tileSelected(polygonID);
            });
            
            //Stores the Array of Polygons
            hexArray[i] = polygonNode;

            //Appends them to the HTML Element
            svgNode.appendChild(polygonNode);

            
        }
        
    
    }
    var tileHistoryArray = new Array();
    var tileHistoryInc = 0;

    function tileSelected(tile){
        tileHistoryArray[tileHistoryInc] = tile;
         if(tileHistoryInc != 0){
            $('#'+ tileHistoryArray[tileHistoryInc-1] +'').toggleClass('selected');
            $('#' + tileHistoryArray[tileHistoryInc] + '').toggleClass('selected');
        }else{
            $('#' + tileHistoryArray[tileHistoryInc] + '').toggleClass('selected');        
        }
        $('#input_register').appendChild('<li>'+tileHistoryArray[tileHistoryInc].substring(7,12)+'</li>');


        
        tileHistoryInc++;
    }   

    //function mapPopulator(hexArray, pathIDArray, forestIDArray, waterIDArray, goldIDArray, cooperIDArray, acricultureIDArray, keepTile){
    function mapPopulator(){
        var pathIDArray = ['14','30','46','62','78','94','110','118','134','141','149','140','132','139','131','122','114','105','89','82','90','99','91','84','76','60','52','43','51','58','50','41'];
        //var pathIDArray = ["1","33","65","81","113","145","177","193","225","257","273","290","306","338","370","386","369","385","400","432","464","481","497","482","466","483","515","530","546","578","594","611","595","580","564","549","565","582","598","583","551","535","552","536","521","537","554","570","587","571","556","524","492","460","428","396","379","363","346","330","362","394","426","458","473","489","504","488","471","455","438","422","390","358","326","310","295","279","296","280","265","249","234","202","185","169","136","152","120","121","105","89","74","90","107","123","140","156","173","205","237","252","236","219","203","218"];
        var forestIDArray = ['160','144','128','112','96','80','64','48','32','16','0','8','1','9','2','10','3','11','4','12','5','13','6','7','15','31','47','63','79','95','111','127','143','159','175','167','174','166','173','165','172','164','171','163','170','162','169','161','168'];
        var waterIDArray = ['98','106','83','74','66','67','75','59','68'];
        var goldIDArray = ['37','21','29'];
        var copperIDArray = ['28','36','20','27'];
        var oreIDArray = ['24','17','25'];
        var agricultureIDArray = ['152','136','145','129','137','120','113','153'];
        var keepTile = '33';

        for(i in hexArray){
            let checkValue = hexArray[i];


            //Compares Tile ID to Path ID
            for(PIA in pathIDArray){
                if(hexArray[i].getAttributeNS(null,'id') == 'hexTile' + pathIDArray[PIA]){
                    hexArray[i].setAttributeNS(null,'fill','#fcee9e');
                    $('#' + hexArray[i].getAttributeNS(null,'id') + '').addClass('path_class');
                }
            }
            //Compares Tile ID to Forest ID
            for(FIA in forestIDArray){
                if(hexArray[i].getAttributeNS(null,'id') == 'hexTile' + forestIDArray[FIA]){
                    hexArray[i].setAttributeNS(null,'fill','#234b1e');
                    $('#' + hexArray[i].getAttributeNS(null,'id') + '').addClass('forest_class');
                }
            }
            //Compares Tile ID to Water ID
            for(WIA in waterIDArray){
                if(hexArray[i].getAttributeNS(null,'id') == 'hexTile' + waterIDArray[WIA]){
                    hexArray[i].setAttributeNS(null,'fill','#4A77F3');
                    $('#' + hexArray[i].getAttributeNS(null,'id') + '').addClass('water_class');
                }
            }
            //Compares Tile ID to gold ID
            for(GIA in goldIDArray){
                if(hexArray[i].getAttributeNS(null,'id') == 'hexTile' + goldIDArray[GIA]){
                    hexArray[i].setAttributeNS(null,'fill','#F2C53D');
                    $('#' + hexArray[i].getAttributeNS(null,'id') + '').addClass('gold_class');
                }
            }
            //Compares Tile ID to copper ID
            for(CIA in copperIDArray){
                if(hexArray[i].getAttributeNS(null,'id') == 'hexTile' + copperIDArray[CIA]){
                    hexArray[i].setAttributeNS(null,'fill','#E19B35');
                    $('#' + hexArray[i].getAttributeNS(null,'id') + '').addClass('copper_class');
                }
            }
            //Compares Tile ID to ore ID
            for(OIA in oreIDArray){
                if(hexArray[i].getAttributeNS(null,'id') == 'hexTile' + oreIDArray[OIA]){
                    hexArray[i].setAttributeNS(null,'fill','#717878');
                    $('#' + hexArray[i].getAttributeNS(null,'id') + '').addClass('ore_class');
                }
            }
            //Compares Tile ID to agriculture ID
            for(AIA in agricultureIDArray){
                if(hexArray[i].getAttributeNS(null,'id') == 'hexTile' + agricultureIDArray[AIA]){
                    hexArray[i].setAttributeNS(null,'fill','#AFAA23');
                    $('#' + hexArray[i].getAttributeNS(null,'id') + '').addClass('agriculture_class');
                }
            }
            //Compares Tile ID to Keep ID
            if(hexArray[i].getAttributeNS(null,'id') == 'hexTile' + keepTile){
                hexArray[i].setAttributeNS(null,'fill','#e80cd0');
                $('#' + hexArray[i].getAttributeNS(null,'id') + '').addClass('keep_class');
            }
            
        }
    }


    mapPopulator();
});






