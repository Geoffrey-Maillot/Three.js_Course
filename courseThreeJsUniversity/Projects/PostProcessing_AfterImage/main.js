/*
* 	##################
*
*	 	THREE JS IMPORTS
*		- Main Threejs Lib
*
*	##################
*/

import * as THREE from 'three';

import { EffectComposer } from '../js/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../js/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from '../js/examples/jsm/postprocessing/AfterimagePass.js';


/*
* 	--------------------------------------------------------------------------------
*
*	-------------------------------- GLOBAL VARIABLES --------------------------------
*
*	--------------------------------------------------------------------------------
*/

// Basic Threejs variables
var camera, scene, renderer;

var backgroundMesh; 				// background Wireframe sphere
var numberRocks = 20; 				// number of floating rocks
var ParticlesArray = new Array();	// Floating rocks are stored in this array

var composer;
var pass_afterimage;

/*
* 	##################
*
*	 	CLASS LevitationRock
*		Simple structure to associate random rotation speeds ( X and Y axis) and a ThreeJS mesh ( rotating rocks)
*
*	##################
*/
class LevitationRock
{
	constructor()
	{
		this.mesh = null;							// Rotating rock mesh
		this.pivot_rot_speed_x = Math.random();  	// the rotation speed X axis is random
		this.pivot_rot_speed_y = Math.random();  	// the rotation speed Y axis is random
	}
}

/*
* 	##################
*
*	 	FUNCTION INIT()
*		This function is the entry point of our javascript application.
*		This function in creating all the basic settings like scene, camera, renderer.
*		This function is calling the scene creation functions, and defining the main game render loop.
*
*	##################
*/
function init()
{
	scene = new THREE.Scene();

	// ---------------- CAMERA ----------------

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1200;
	camera.position.y = 500;

	camera.rotation.x = -Math.PI/8;

	// ---------------- LIGHTS ----------------

	var light = new THREE.DirectionalLight(0xffffff, 0.5);
	light.position.set(0, 1, 0)
	scene.add(light);

	// ---------------- INIT FUNCTIONS ----------------

	createUniverse();

	// ---------------- RENDERER ----------------

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor(0x333333, 1.0);
	document.body.appendChild( renderer.domElement );

	// ---------------- EVENTS ----------------

	window.addEventListener( 'resize', onWindowResize, false );

	function onWindowResize()
	{
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		composer.setSize( window.innerWidth, window.innerHeight );
	}


	var afterimagebutton = document.getElementById("afterimage").onclick = function() {

		if(pass_afterimage.enabled)
		{
				pass_afterimage.enabled = false;
		}
		else
		{
				pass_afterimage.enabled = true;
		}

	};

	// ---------------- POSTPROCESSING ----------------

	composer = new EffectComposer( renderer );
	composer.addPass( new RenderPass( scene, camera ) );

	pass_afterimage = new AfterimagePass();
	pass_afterimage.uniforms[ "damp" ].value = 0.96;
	composer.addPass( pass_afterimage );

	// ---------------- STARTING THE GAME MAIN LOOP ----------------

	animate();
}

/*
* 	##################
*
*	 	FUNCTION randomRange()
*		This function returns a random number between two arguments.
*
* 	##################
*/
function randomRange(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

/*
* 	##################
*
*	 	FUNCTION generateRandomRock()
*		This function is creating a IcosahedronGeometry (random size) at random distance from the center of the scene.
*		This mesh is added to a "pivot" (empty THREE.Object3D).
*		The pivot initial Y rotation is random.
*		The "pivot" THREE.Object3D (containing the IcosahedronGeometry) is returned.
*
* 	##################
*/
function generateRandomRock()
{
	var geometry = new THREE.IcosahedronGeometry(randomRange(50,150) , 0);
	var material = new THREE.MeshPhongMaterial( {  color: 0xffffff, emissive : 0xcccccc } );

	// IcosahedronGeometry mesh
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = randomRange(500,1500);

	// pivot
	var pivot = new THREE.Object3D();
	pivot.rotation.y = randomRange(0,180);

	// the IcosahedronGeometry geometry is added to the "pivot"  THREE.Object3D object
	pivot.add(mesh);

	return pivot; // the "pivot" is returned
}

/*
* 	##################
*
*	 	FUNCTION createUniverse()
*		This function is called in init() function.
*		The main purpose of this function is creating all the geometries in the scene (floor + rotating geometries) , all around the center of the scene.
*
* 	##################
*/
function createUniverse()
{
	// background big wireframe SphereGeometry
	var geometry = new THREE.SphereGeometry(2000, 48, 48);
	var material = new THREE.MeshBasicMaterial( { color: 0xdddddd, wireframe: true } );
	backgroundMesh = new THREE.Mesh( geometry, material );
	scene.add( backgroundMesh );



	// floating Rocks geometries
	for(var i = 0 ; i <= numberRocks ; i++)
	{
		var tmprock = new LevitationRock();
		tmprock.mesh = generateRandomRock();

		scene.add( tmprock.mesh ); // the new rock is added to the scene

		ParticlesArray.push(tmprock); // the new rock is added to the ParticlesArray array
	}
}

/*
* 	##################
*
*	 	FUNCTION animate()
*		This function is the main loop of our ThreeJS application.
*		This function is used for all the works needed to be done every game tick.
*
*		1) update position of the rotating geometries
*		2) render the 3D world
*		3) calling itself - that's how the "render loop" works as an endless loop
*
* 	##################
*/
function animate()
{
	// updating all floating rocks
	for(var i = 0 ; i < ParticlesArray.length ; i++)
	{
		// the rocks is rotating around the center on two axis ( X and Y)
		ParticlesArray[i].mesh.rotation.x += 0.001 * ParticlesArray[i].pivot_rot_speed_x;
		ParticlesArray[i].mesh.rotation.y += 0.02 * ParticlesArray[i].pivot_rot_speed_y;

		// the rocks is also rotating on itself
		ParticlesArray[i].mesh.children[0].rotation.x += 0.01;
		ParticlesArray[i].mesh.children[0].rotation.y += 0.001;
	}

	// rotating the background big wireframe sphere
	backgroundMesh.rotation.y -= 0.002;

	//render the 3D world
	//renderer.render( scene, camera );
	composer.render();

	//calling next frame
	requestAnimationFrame( animate );
}

init();
