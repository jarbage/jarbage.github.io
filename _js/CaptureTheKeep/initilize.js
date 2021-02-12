import Map from './map.js'

$(window).on('load', function(){

    const targetDiv = document.getElementById('gamewindow');

    const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    //Ensures no distortion of Canvas material after initilization
    svgNode.setAttributeNS(null, 'preserveAspectRatio' , 'xMidYMid slice')
    svgNode.setAttributeNS(null, 'id' , 'ctk_svg')

    //Width and Height of the Browser Window
    var screenWidth = window.DOMRectReadOnly.width;
    var screenHeight = window.DOMRectReadOnly.height

    //Width and Height of the ViewBox || Window in which the Canvas is being viewed through
    var svgVBWidth = targetDiv.clientWidth;
    var svgVBHeight = targetDiv.clientHeight;

    //--Width and Height of the Canvas--//
    //!-Arbitrarially Defined-----------//
    var svgCanvasWidth = svgVBWidth;
    var svgCanvasHeight = svgVBHeight; 

    //SVG viewbox sizing based on Screen Size
    svgNode.setAttributeNS(null, 'viewBox' , '0 0 '+ svgVBWidth + ' ' + svgVBHeight + '');

    //Add it to the DOM
    targetDiv.appendChild(svgNode);

    //Call the map with necessary parameters
    new Map(svgNode, svgVBWidth, svgVBHeight, svgCanvasWidth, svgCanvasHeight);

});