import Board from './Board.js';
import Cube from './Cube.js';

import { TrackballControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
var WINDOW_WIDTH = window.innerWidth;
var WINDOW_HEIGHT = window.innerHeight;

var mouse = new THREE.Vector2();

var raycaster;
var camera;
var scene, renderer;
var colorPalette = [0x00ff00,0x800000,0xfabebe,0xf032e6,0xf58231,0x4363d8,0x3cb44b,0xffe119,0xe6194b];

//Cube for Selecting geometries
var cursorMaterial = new THREE.MeshToonMaterial({wireframe: true});
var cursorGeometry = new THREE.BoxBufferGeometry(1.2,1.2,1.2);
var cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);

//UI Variables
var userInput = 1;
var intersectedGeometry, selectedGeometry;
var selectedX, selectedY, selectedZ;

var gameWindow = document.getElementById("gameWindow");

var sodokuBoard;
var controls;

//[2, 3, 9, 8, 4, 1, 5, 6, 7,
let solvedBoard = 
   [2, 3, 9, 8, 4, 1, 5, 6, 7,
	1, 5, 4, 7, 9, 6, 8, 2, 3,
	7, 8, 6, 2, 3, 5, 9, 1, 4,
	6, 1, 8, 9, 7, 2, 4, 3, 5,
	4, 7, 2, 5, 1, 3, 6, 8, 9,
	5, 9, 3, 4, 6, 8, 2, 7, 1,
	3, 4, 1, 6, 8, 9, 7, 5, 2, 
	9, 6, 5, 3, 2, 7, 1, 4, 8,
	8, 2, 7, 1, 5, 4, 3, 9, 6,
]

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setPixelRatio( window.devicePixelRatio );

    scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);

	var light = new THREE.PointLight(0xebe8d6, 2.5, 100);
	light.position.set( 50, 50, 50 );
	scene.add( light );
	
	sodokuBoard = new Cube(scene, solvedBoard, colorPalette)
	sodokuBoard.loadScene();

	scene.add(cursor);

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );	//camera.position.set(8.5, 8.5, -20);
	camera.position.set(40, 40, 35);

	controls = new TrackballControls( camera, renderer.domElement );
	controls.target = new THREE.Vector3(9, 9, 9);

	controls.update();
	
	raycaster = new THREE.Raycaster();

	gameWindow.appendChild(renderer.domElement);

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	document.addEventListener('keypress', (e)=>{
		userInput = e.code;
		if(userInput.includes('Digit')){
			userInput = userInput.slice(5);
			changeGeometryColor(userInput);
		}
		if(userInput.includes('Numpad')){
			userInput = userInput.slice(6);
			changeGeometryColor(userInput);
		}
		if(userInput.includes('Space')){
			changeGeometryColor();
		}
	});

	document.addEventListener('click', geometrySelector);
	

}

function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function changeGeometryColor(){
	selectedGeometry.material.color.setHex(colorPalette[userInput - 1]);
}
function geometrySelector(){
	selectedGeometry = intersectedGeometry;
	selectedX = intersectedGeometry.position.getComponent(0); 
	selectedY = intersectedGeometry.position.getComponent(1); 
	selectedZ = intersectedGeometry.position.getComponent(2);
	moveCursor(selectedX, selectedY, selectedZ);
}

function moveCursor(x,y,z){
	cursor.position.set(x,y,z);
}

function animate(time) {
    requestAnimationFrame(animate);
	controls.update();
	camera.updateMatrixWorld();
	raycaster.setFromCamera( mouse, camera );
	checkIntersect();
	renderer.render(scene, camera);
}


function checkIntersect(){
	let intersects = raycaster.intersectObjects( scene.children, true );
	if ( intersects.length > 0 ) {
		if(intersectedGeometry != intersects[0].object){
			intersectedGeometry = intersects[0].object;
		}
	}
}

init();
animate();
