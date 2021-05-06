// import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.min.js' ;

import {
    OrbitControls
} from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import {
    OBJLoader
} from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/OBJLoader.js';
import {
    GLTFLoader
} from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/GLTFLoader.js';

// import Tile from './Tile.js'
import Board from './Board.js';
import keepMaker from './keepMaker.js'
import defaultMaker from './defaultMaker.js'





// $(window).on('load', function(){
const gameWin = document.getElementById('ctk_container');

let mouseX = 0,
    mouseY = 0;

let mouse = new THREE.Vector2();
let controls;
let raycaster;
let camera;
let scene, renderer;

let modelArray = new Array();
let model, model2, model3, model4, model5, model6, model7, model8, model9;

let mapArray = new Array();
let map1, map2, map3, map4, map5, map6, map7, map8, map9;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = gameWin.innerHeight / 2;

//Cube for Selecting geometries
var cursorMaterial = new THREE.MeshToonMaterial({
    transparent: true,
    opacity: 0.5
});
var cursorGeometry = new THREE.CylinderBufferGeometry(1.05, 1.05, 1.05, 6);
var cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);

//UI Variables
var userInput = 1;
var intersectedGeometry, selectedGeometry;
var selectedX, selectedY, selectedZ;

let boardTileTotal = 81;
//                      light grn | dark grn | orang | red rock | med tan | tan | light tan 
const colorPalette = [0x798d3f, 0x52611f, 0xd8a449, 0xd17042, 0xe2d277, 0xEBEBB3, 0xFFF0A5];

renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

scene = new THREE.Scene({
    antialias: true
});
scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(0x050505, 2000, 3500);
scene.add(new THREE.AmbientLight(0xffffff, 0.2));

const pointLight = new THREE.PointLight(0xffffff, 1, 100, 0, 0.2);
pointLight.position.set(20, 20, 10);
scene.add(pointLight);

for (let i = 0; i < 9; i++) {
    modelArray[i] = new Board(scene, i);
    switch (i) {
        case 1:
            modelArray[i].shift('right');
            break;
        case 2:
            modelArray[i].shift('right');
            modelArray[i].shift('right');
            break;
        case 3:
            modelArray[i].shift('down');
            break;
        case 4:
            modelArray[i].shift('down');
            modelArray[i].shift('right');
            break;
        case 5:
            modelArray[i].shift('down');
            modelArray[i].shift('right');
            modelArray[i].shift('right');
            break;
        case 6:
            modelArray[i].shift('down');
            modelArray[i].shift('down');
            break;
        case 7:
            modelArray[i].shift('down');
            modelArray[i].shift('down');
            modelArray[i].shift('right');
            break;
        case 8:
            modelArray[i].shift('down');
            modelArray[i].shift('down');
            modelArray[i].shift('right');
            modelArray[i].shift('right');
            break;

    }
    //Spread the Tiles
    // switch(i){
    //     case 0:
    //         modelArray[i].shift('left');
    //         modelArray[i].shift('up');
    //         break;
    //     case 1:
    //         modelArray[i].shift('up');
    //         break;
    //     case 2:
    //         modelArray[i].shift('right');
    //         modelArray[i].shift('up');
    //         break;
    //     case 3:
    //         modelArray[i].shift('left');
    //         break;
    //     case 5:
    //         modelArray[i].shift('right');
    //         break;
    //     case 6:
    //         modelArray[i].shift('left');
    //         modelArray[i].shift('down');
    //         break;
    //     case 7:
    //         modelArray[i].shift('down');
    //         break;
    //     case 8:
    //         modelArray[i].shift('right');
    //         modelArray[i].shift('down');
    //         break;           
    // }
    mapArray[mapArray.length] = new defaultMaker(modelArray[i]);
    modelArray[i].loadScene();

}


let pathArray0 = [27, 37, 38, 39, 48, 58, 77, 67];
mapArray[0].setPath(pathArray0);

let pathArray1 = [35, 34, 25, 24, 23, 31, 40, 48, 58, 59, 68, 77, 76, 75];
mapArray[1].setPath(pathArray1);
mapArray[1].setWater([32,33,41,42,43,,44,50,51,52,53,60,61,62,69,70,71,78,79,80])

let pathArray2 = [76, 67, 58, 57, 48, 39, 29, 28, 27];
mapArray[2].setPath(pathArray2);

let pathArray3 = [77, 68, 59, 58, 48, 47, 38, 29, 20, 11, 12, 13, 5];
mapArray[3].setPath(pathArray3);

let pathArray4 = [2, 11, 12, 20, 29, 38, 47, 48, 58, 67, 76];
mapArray[4].setPath(pathArray4);
mapArray[4].setKeep();

let pathArray5 = [77, 68, 60, 51, 43, 34, 25, 24, 23, 13, 4];
mapArray[5].setPath(pathArray5);

let pathArray6 = [5, 14, 23, 22, 21, 29, 28, 37, 47, 57, 58, 59, 50, 51, 52, 44, 46];
mapArray[6].setPath(pathArray6);

let pathArray7 = [4, 13, 14, 15, 16, 26, 34, 33, 32, 41, 50, 59, 58, 57, 47, 38, 37, 36];
mapArray[7].setPath(pathArray7);

let pathArray8 = [5, 13, 23, 32, 42, 43, 44];
mapArray[8].setPath(pathArray8);

let arrayRightTiles  = [7,8,16,17,25,26,34,35,43,44,52,53,61,62,70,71,79,80]
let arrayLeftTiles = [0,1,9,10,18,19,27,28,36,37,45,46,54,55,63,64,72,73]

mapArray[0].setMountain([7,8,14,15,16,17,24,25,26,34,35,42,43,44,52,53,60,61,62,69,70,71,79,80]);
mapArray[3].setMountain(arrayRightTiles);
mapArray[1].setMountain([0,1,2,3,9,10,11,18,19,27,28,36,37,45,46,54,55,63,64,72,73]);
mapArray[4].setMountain(arrayLeftTiles);







// let midModel = Math.floor((modelArray.length / 2));
// modelArray[midModel].setKeep(modelArray[midModel].tiles[15]);


scene.add(cursor);

camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 200);
camera.position.set(-35, 30, 35);

controls = new OrbitControls(camera, gameWin);
//---------------------------------(X, Y, Z)
let targetArray = [modelArray[4].tiles[41].metaTile.position.getComponent(0), modelArray[4].tiles[41].metaTile.position.getComponent(1), modelArray[4].tiles[41].metaTile.position.getComponent(2)]
controls.target = new THREE.Vector3(targetArray[0], 1, targetArray[2]);
controls.enableDamping = true;
controls.dynamicDampingFactor = 1;
controls.noZoom = false;
controls.noPan = false;
controls.update();

raycaster = new THREE.Raycaster();



gameWin.appendChild(renderer.domElement);
document.addEventListener('mousedown', onDocumentMouseMove);
document.addEventListener('click', moveCursor);

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

function geometrySelector() {
    selectedGeometry = intersectedGeometry;
    selectedX = intersectedGeometry.position.getComponent(0);
    selectedY = intersectedGeometry.position.getComponent(1);
    selectedZ = intersectedGeometry.position.getComponent(2);
    moveCursor(selectedX, selectedY, selectedZ);
}

function moveCursor() {
    let position = [intersectedGeometry.position.getComponent(0), intersectedGeometry.position.getComponent(1), intersectedGeometry.position.getComponent(2)]
    cursor.position.set(position[0], position[1], position[2]);
}

function animate() {

    requestAnimationFrame(animate);
    controls.update();
    camera.updateMatrixWorld();
    raycaster.setFromCamera(mouse, camera);
    checkIntersect();
    renderer.render(scene, camera);

}

function checkIntersect() {
    let intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        if (intersectedGeometry != intersects[0].object) {
            intersectedGeometry = intersects[0].object;
        }
    }
}

// function setColors(model){
//     for (let i in model){
//         console.log(model.children[i]);
//     }
// }

//setColors(scene);
animate();


// });