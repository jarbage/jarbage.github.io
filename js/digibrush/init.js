const renderWindow = document.getElementById('render_window');

import Canvas from './canvas.js'

let frametimer, gametimer;

$(window).on('load', () =>{
    let canvas = new Canvas(renderWindow);
    let timer = setInterval(()=>{
        canvas.onTimer();
    }, 30); 
})

