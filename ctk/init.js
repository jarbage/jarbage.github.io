// import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.min.js' ;

import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/GLTFLoader.js';

import { Tile } from './_js/Tile.js'





$(window).on('load', function(){

    let WINDOW_WIDTH = window.innerWidth;
    let WINDOW_HEIGHT = window.innerHeight;

    let mouseX = 0, mouseY = 0;

    let mouse = new THREE.Vector2();
    let controls;
    let raycaster;
    let camera;
    let scene, renderer;
    let object, model;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    let boardTileTotal = 81;

    const targetDiv = document.getElementById('ctk_container');

    scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );
    scene.add( new THREE.AmbientLight( 0xcccccc, 0.8 ) );

    function createTiles(){
        let tiles = new Array();
        for(let i = 0; i < boardTileTotal; i++){
            let tile = new Tile(i, scene);
            tiles[i] = tile;
        }
    }
    createTiles();

    

//     // manager

//     function loadModel() {
//         object.traverse( function ( child ) {
//             if ( child.isMesh ) child.material = material;
//         } );
//         //object.position.y = - 95;
//         scene.add( object );
//     }

//     const manager = new THREE.LoadingManager( loadModel )
//     manager.onProgress = function ( item, loaded, total ) {
//         console.log( item, loaded, total );
//     };

//     const loader = new GLTFLoader();
    

//     // load a resource
//     loader.load( './models/ctk_draft--5.glb', function ( gltf ) {
// 	    model = gltf.scene;	
// 	    scene.add( model );
//     }, undefined,
// //       function(xhr){
// //  	    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
// //  	let load_data =  xhr.loaded;
// //  	$('#loading_info').html(load_data);
// //   }, 
 
//     function ( error ) {
// 	    console.error( error );
//     }
//     );

    
    

    function loadModel() {
        object.traverse( function ( child ) {
            //if ( child.isMesh ) child.material = material;
        } );
        //object.position.y = - 95;
        scene.add( object );
    }

    const manager = new THREE.LoadingManager( loadModel )
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    // instantiate a loader
    const materialloader = new THREE.MaterialLoader();

    // load a resource
    const material = materialloader.load(
	// resource URL
	'./models/ctk_draftv2.mtl',

	    // onLoad callback
	    function ( material ) {
		    loadcustomMaterial(object);
	    },

	    // onProgress callback
	    function ( xhr ) {
		    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	    },

	    // onError callback
	    function ( err ) {
		    console.log( 'An error happened' );
	    }
    );



    // model
    function onProgress( xhr ) {
        if ( xhr.lengthComputable ) {
            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

        }
    }

    function onError() {}

    const objloader = new OBJLoader( manager );
    objloader.load( './models/ctk_draftv2.obj', function ( obj ) {
        object = obj;
    }, onProgress, onError );

    function loadcustomMaterial(object){
        console.log(object);
    }



    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.01, 200 );
    camera.position.set(15, 5, -5);

	controls = new OrbitControls( camera, targetDiv );
    //---------------------------------(X, Y, Z)
	controls.target = new THREE.Vector3(0, 1, -6);
	controls.enableDamping = true;
 	controls.dynamicDampingFactor = 1;
	controls.noZoom = false;
 	controls.noPan = false;
	controls.update();

    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );

    targetDiv.appendChild(renderer.domElement);
    document.addEventListener( 'mousemove', onDocumentMouseMove );

    function onDocumentMouseMove( event ) {

        mouseX = ( event.clientX - windowHalfX ) / 2;
        mouseY = ( event.clientY - windowHalfY ) / 2;
    
    }
    
    
    
    function animate() {
    
        requestAnimationFrame( animate );
        controls.update();
	    camera.updateMatrixWorld();
	    raycaster.setFromCamera( mouse, camera );
	    //checkIntersect();
	    renderer.render(scene, camera);
    
    }

    // function setColors(model){
    //     for (let i in model){
    //         console.log(model.children[i]);
    //     }
    // }

    //setColors(scene);
    animate();
});



