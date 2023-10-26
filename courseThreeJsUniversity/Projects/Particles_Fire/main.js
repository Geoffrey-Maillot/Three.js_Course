


import * as THREE from 'three';
import { OrbitControls } from '../js/examples/jsm/controls/OrbitControls.js';

/*
* 	--------------------------------------------------------------------------------
*
*	-------------------------------- GLOBAL VARIABLES --------------------------------
*
*	--------------------------------------------------------------------------------
*/

// Basic Threejs variables
var camera, scene, renderer;

// Rotating groups of objects around fire
var numberObjects = 10;

// Fire variables
var ParticlesArray = new Array();
var MyFire;

/*
* 	##################
*
*	 	FUNCTION randpercent()
*		This function is used to generate a random percentage between a minimum and 100.
*
*		Param 1 : the minimal value of the generated percentage
*
*	##################
*/
function randpercent(minpercent)
{
	return (Math.floor(Math.random() * 100) + minpercent)/100;
}

/*
* 	##################
*
*	 	CLASS ThreeJSFire
*		This class is used to generate and animate a fire.
*
*	##################
*/
class ThreeJSFire
{
	//PARAMETERS
	/*
	* 	Particle Count
	*	Scale
	*	Max Height
	*	Opacity Degression by frame for each particles
	*	Velocity by frame for each particles
	*/
	constructor(particlecount, scale, maxheight, opacitydegression, velocity)
	{
		this.maxheight = maxheight; 				// maximul heigt reached by particles
		this.opacitydegression = opacitydegression;	// opacity degression each frame for each particles
		this.velocity = velocity;					// velocity of each particles (speed)
		this.scale = scale;							// scale of the fire

		this.particleCount = particlecount;			// Number of particles in the fire
		this.particles = [];						// Particles array

		this.Fire = new THREE.PointLight (0xff4502, 0.2*this.scale, 2*this.scale); // This is the fire parent element

		const loader = new THREE.TextureLoader();

		var texture =  loader.load("../Assets/Particles/fire.png"); // fire particle texture

		// material of each fire particle
		var material = new THREE.SpriteMaterial({
			color: 0xff4502, 					// fire color
			map: texture, 						// the particle texture we loaded
			transparent: true,					// the texture is partially transparent
			opacity: 0.5,						// particle opacity , 0.5 (half transparent)
			blending: THREE.AdditiveBlending	// particle glowing effect
		});

		// Creating all the particles in the array
		for (var i = 0; i < this.particleCount; i++)
		{
			var particle = new THREE.Sprite(material.clone()); 				// Sprite creation
			particle.scale.multiplyScalar(randpercent(20)  * this.scale);	// particle scale, depending on fire scale and random %

			particle.velocity = new THREE.Vector3( 0, randpercent(30) * this.scale, 0 ); //initial random velocity
			this.particles.push(particle);
			scene.add(particle);
		}
	}

	animate() // this function is called each engine tick, to update and animate the fire
	{
		for (var i = 0; i < this.particles.length; i++)	// for loop , looping on every particle in the array
		{
            var particle = this.particles[i];
            if(particle.position.y > this.maxheight ) 	// if the particle reached the maximum allowed height, the particle is reset
			{
                particle.position.y = 0;				// particle initial height
                particle.velocity.y = Math.random() * (this.maxheight/10) ; // random base velocity
                particle.material.opacity = 1; 			// full opacity
            }

            particle.material.opacity -= this.opacitydegression; 	// 	particle opacity degression

            particle.velocity.y += this.velocity ;					//	particle velocity update
            particle.position.add(particle.velocity);				//	particle position update

			this.Fire.intensity =  (Math.random()* (1 - 0.6) + 0.6 ) *(0.1 *this.scale); // the light os the fire is random every tick, to create a blinking effect
        }
	}
}

/*
* 	##################
*
*	 	CLASS LevitationRow
*		Simple structure to associate a random rotation speed to a ThreeJS mesh ( rotating planes)
*
*	##################
*/
class LevitationRow
{
	constructor()
	{
		this.mesh = null;
		this.pivot_rot_speed_y = Math.random(); // the rotation speed is random
	}
}

/*
* 	##################
*
*	 	FUNCTION INIT()
*		This function is the entry point of our javascript application.
*		This function in creating all the basic settings like scene, camera, renderer.
*		This function is creating the fire and scene, and defining the main game render loop.
*
*	##################
*/
function init()
{
	scene = new THREE.Scene();

	// ---------------- CAMERA ----------------

	camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 50000 );
	camera.position.z = 1400;
	camera.position.y = 1400;

	// ---------------- RENDERER ----------------

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// ---------------- EVENTS ----------------

	window.addEventListener( 'resize', onWindowResize, false );
	function onWindowResize()
	{
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	// ---------------- LIGHTS ----------------

	const light = new THREE.AmbientLight( 0x404040 ); // soft white light
	light.intensity = 0.1;
	scene.add( light );

	// ---------------- CONTROLS ----------------

	// OrbitControls is used for the basic camera controls.
	const controls = new OrbitControls( camera, renderer.domElement );
	controls.target.set(0, 600, 0);
	controls.update();

	// ---------------- INIT FUNCTIONS ----------------

	//rotationg planes
	createUniverse();

	//Fire
	//PARAMETERS
	/*
	* 	Particle Count
	*	Scale
	*	Max Height
	*	Opacity Degression by frame for each particles
	*	Velocity by frame for each particles
	*/
	MyFire = new ThreeJSFire(75, 1000, 1300, 0.05, 0.0005);
	MyFire.Fire.position.set(0,500,0);
	scene.add(MyFire.Fire);

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
*	 	FUNCTION generateRow()
*		This function is creating 4 planes at equal distance from the center of the scene.
*		This distance is random, but the same for the four planes.
*		These four planes are added to a "pivot" (empty THREE.Object3D).*
*		The "pivot" THREE.Object3D (containing the planes) is returned.
*
* 	##################
*/
function generateRow()
{
	//the distance between the center of the scene and the planes is random
	var distance = randomRange(800, 2500);

	var geometry = new THREE.BoxGeometry(10, 600, 200);
	var material = new THREE.MeshPhongMaterial( {  color: 0xffffff } );

	//plane 1
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = distance;

	//plane 2
	var mesh2 = new THREE.Mesh(geometry, material);
	mesh2.position.x = -distance;

	//plane 3
	var mesh3 = new THREE.Mesh(geometry, material);
	mesh3.position.z = -distance;
	mesh3.rotation.y = Math.PI/2;

	//plane 4
	var mesh4 = new THREE.Mesh(geometry, material);
	mesh4.position.z = distance;
	mesh4.rotation.y = Math.PI/2;

	//all the planes are set children of a THREE.Object3D called "pivot"
	var pivot = new THREE.Object3D();
	pivot.add(mesh);
	pivot.add(mesh2);
	pivot.add(mesh3);
	pivot.add(mesh4);

	//we are returning the THREE.Object3D
	return pivot;
}

/*
* 	##################
*
*	 	FUNCTION createUniverse()
*		This function is called in init() function.
*		The main purpose of this function is creating all the geometries in the scene (floor + rotating planes) , all around the Fire.
*
* 	##################
*/
function createUniverse()
{

	// rotating geometries
	for(var i = 0 ; i < numberObjects ; i++)
	{
		var tmpRow = new LevitationRow();
		tmpRow.mesh = generateRow();

		scene.add( tmpRow.mesh );

		ParticlesArray.push(tmpRow);
	}

	// floor
	const geometry = new THREE.PlaneGeometry( 5000, 5000 );
	const material = new THREE.MeshStandardMaterial( {color: 0x000000, side: THREE.DoubleSide} );
	const plane = new THREE.Mesh( geometry, material );
	plane.rotation.x = Math.PI/2;
	plane.position.y = -300;
	scene.add( plane );
}

/*
* 	##################
*
*	 	FUNCTION animate()
*		This function is the main loop of our ThreeJS application.
*		This function is used for all the works needed to be done every game tick.
*
*		1) update position of the rotating planes
*		2) update the fire animation
*		3) render the 3D world
*		4) calling itself - that's how the "render loop" works as an endless loop
*
* 	##################
*/
function animate()
{
	// rotating planes
	for(var i = 0 ; i < ParticlesArray.length ; i++)
	{
		ParticlesArray[i].mesh.rotation.y += 0.03 * ParticlesArray[i].pivot_rot_speed_y;
	}

	//fire animation
	MyFire.animate();

	//render the 3D world
	renderer.render( scene, camera );

	//calling next frame
	requestAnimationFrame( animate );
}

init();
