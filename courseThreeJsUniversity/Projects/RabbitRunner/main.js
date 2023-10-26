/*
* 	##################
*
*	 	THREE JS IMPORTS
*		- Main Threejs Lib
*		- MTL loader (used with .obj + .mtl 3D models - We are using it for non-animated 3D models)
*		- OBJ loader (used with .obj + .mtl 3D models - We are using it for non-animated 3D models)
*		- GLB loader (used with .glb models - We are using it for animated 3D models )
*
*	##################
*/
import * as THREE from 'three';
import { MTLLoader } from '../js/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from '../js/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from '../js/examples/jsm/loaders/GLTFLoader.js';

/*
* 	--------------------------------------------------------------------------------
*
*	-------------------------------- GLOBAL VARIABLES --------------------------------
*
*	--------------------------------------------------------------------------------
*/

// Basic Threejs variables
var clock = new THREE.Clock(true);
var scene;
var camera;
var spotLight; 				//spotlight - following player

// Player animations
var mixerPlayer;			// ThreeJS Animation Mixer
var actionPlayer = {};		// animations

// MAIN LOOP Function
var render_func;

//GAME CONTROL VARS
var is_Pause 				= false;
var is_flying 				= false;

var ismoving_right 			= false;
var ismoving_left 			= false;
var scrollspeed 			= 8; 			// MAP SCROLL SPEED
var scroll_acceleration 	= 0.01; 		// SCROLL ACCELERATION
var playermaxspeed 			= 7; 			// PLAYER MOVEMENT MAXIMUM SPEED
var playerspeedpercentReduc = 100;

var effectsArray 			= new Array();	// the visual effects are stored in this array , so we can update it in the render loop

//Rabbit PLayer Mesh
var player;									// ThreeJS Mesh

// Map Blocks
var baseBlock, treeBlock, plantBlock, fenceBlock; // ThreeJS Meshes

// Game Objects
var carrot;									// ThreeJS Mesh

// -------- GAME CORE --------

// Boolean - if the game is launched
var GameLaunched 	= false;

var mapwidth 		= 20; 	//  >= 8 and !! PAIR NUMBER !! - map width ( number of blocks )
var mapMaxHeigth 	= 45;	// map max height
var mapStartAtPos 	= -35; 	// !! NEGATIVE NUMBER !! -  starting position

/* ----------------- MAP DOUBLE ARRAY  ----------------- */

var mapArray 		= new Array(); // THE MAP BLOCKS ARE STOCKED IN ROWS IN THIS VAR
for(var x = 0 ; x < mapwidth ; x++)
{
	mapArray[x] = new Array(); // EACH ROW OF THE MAPARRAY IS AN ARRAY TOO - to stock blocks of each line
}

//AUDIO - CARROT PICKING
//var beep = new Audio('../Assets/Audio/bip2.wav');

/*
*	---------------------------------------------------
*		FUNCTION LoadRabbit()
*
*		This function is loading the rabbit player animated model - called in init()
*		This function is used to load player Rabbit.glb 3D model into a Threejs mesh - stored in a global variable.
*		Called in init() function
*
*		This 3D object is a .glb file - animated model
*		The animations were exported from Blender directly into the model, so we can load the animations too.
*
*	---------------------------------------------------
*/
function LoadRabbit()
{
		/*
		*
		*	We are using GLTFLoader to load the Rabbit.glb animated model
		*
		*/
		var loader = new GLTFLoader();
		loader.load( '../Assets/Rabbit/Rabbit.glb', function ( gltf )
		{
			gltf.scene.traverse( function ( child )
			{
				if ( child.isSkinnedMesh )
				{
					child.castShadow = true;
				}
			} );

			player = gltf.scene;

			/* ----------------- ANIMATIONS SETTINGS  ----------------- */

			// WALKING ANIMATION (IDLE)
			mixerPlayer = new THREE.AnimationMixer(player);
			actionPlayer.idle = mixerPlayer.clipAction(gltf.animations[0]); // this animation is stored at index 0 of the 3D model
			actionPlayer.idle.setEffectiveWeight(1);
			actionPlayer.idle.clampWhenFinished = true;
			actionPlayer.idle.enabled = true;
			actionPlayer.idle.play(); // we start playing this animation

			// JUMPING ANIMATION (FLYING)
			actionPlayer.fly = mixerPlayer.clipAction(gltf.animations[1]); // this animation is stored at index 1 of the 3D model
			actionPlayer.fly.setEffectiveWeight(1);
			actionPlayer.fly.clampWhenFinished = true;
			actionPlayer.fly.enabled = true;
			actionPlayer.fly.setLoop( THREE.LoopOnce ); // this annimation loop once

			/* ----------------- ANIMATION MIXER FINISHED CALLBACK  ----------------- */
			// When animation is finished callback
			mixerPlayer.addEventListener('finished', function(e)
			{
				// is_flying boolean is used to check if the rabbit is curently flying
				// When this callback is triggered means the flying action is finished
				//we are setting the is_flying bool to false
				is_flying = false;

				// We are starting the idle animation (no action - walking)
				actionPlayer.fly.stop();
				actionPlayer.idle.play();
			});

			// basic settings and scene.add
			player.position.y = 1;
			player.position.z = 8;
			player.rotation.y = Math.PI;
			player.scale.set(0.5,0.5,0.5);
			scene.add(player);

			console.log("Rabbit Player Load");
		} );
}

/*
* 	##################
*
*	 	FUNCTION LOADCUBES()
*		This function is used to load all .OBJ 3D models into Threejs mesh global variables.
*		Called in init() function
*
*		These 3D objects are .obj + .mtl files - static and non animated 3D objects
*
*	##################
*/
function LoadCubes(callback)
{
	/* ----------------- BASE BLOCK  ----------------- */

	var mtlLoader = new MTLLoader();
	mtlLoader.setPath('../Assets/');
	mtlLoader.load('basecube.mtl', function(materials)
	{
		  materials.preload();
		  var objLoader = new OBJLoader();
		  objLoader.setMaterials(materials);
		  objLoader.setPath('../Assets/');
		  objLoader.load('basecube.obj', function(object)
		  {
				object.scale.set(0.5,0.5,0.5);
				object.children[0].geometry.computeVertexNormals();
				baseBlock =  object;
		  });
	});

	/* ----------------- TREE BLOCK  ----------------- */

	mtlLoader.load('treecube.mtl', function(materials)
	{
		  materials.preload();
		  var objLoader = new OBJLoader();
		  objLoader.setMaterials(materials);
		  objLoader.setPath('../Assets/');
		  objLoader.load('treecube.obj', function(object)
		  {
				object.scale.set(0.5,0.5,0.5);
				object.children[0].geometry.computeVertexNormals();
				treeBlock =  object;
		  });
	});

	/* ----------------- PLANT BLOCK  ----------------- */

	mtlLoader.load('plantcube.mtl', function(materials)
	{
		  materials.preload();
		  var objLoader = new OBJLoader();
		  objLoader.setMaterials(materials);
		  objLoader.setPath('../Assets/');
		  objLoader.load('plantcube.obj', function(object)
		  {
				object.scale.set(0.5,0.5,0.5);
				object.children[0].geometry.computeVertexNormals();
				plantBlock =  object;
		  });
	});

	/* ----------------- FENCE BLOCK  ----------------- */

	mtlLoader.load('fencecube.mtl', function(materials)
	{
		  materials.preload();
		  var objLoader = new OBJLoader();
		  objLoader.setMaterials(materials);
		  objLoader.setPath('../Assets/');
		  objLoader.load('fencecube.obj', function(object)
		  {
				object.scale.set(0.5,0.5,0.5);
				object.children[0].geometry.computeVertexNormals();
				fenceBlock =  object;

		  });
	});

	/* ----------------- CARROT OBJECT  ----------------- */

	mtlLoader.setPath('../Assets/Carrot/');
	mtlLoader.load('Carrot.mtl', function(materials)
	{
		  materials.preload();
		  var objLoader = new OBJLoader();
		  objLoader.setMaterials(materials);
		  objLoader.setPath('../Assets/Carrot/');
		  objLoader.load('Carrot.obj', function(object)
		  {
				object.scale.set(0.5,0.5,0.5);
				object.children[0].geometry.computeVertexNormals();
				carrot =  object;

		  });
	});

	callback();
}

/*
*	---------------------------------------------------
*
*	MAKES THE RABBIT FLY OVER THE FENCES
*
*	---------------------------------------------------
*/
function Fly_Action()
{
	actionPlayer.fly.reset();
	actionPlayer.idle.stop();
	actionPlayer.idle.reset();
	actionPlayer.fly.play();
	is_flying = true;
}


/*
*	---------------------------------------------------
*
*	PAUSE GAME
*
*	---------------------------------------------------
*/
function PauseGame()
{
	is_Pause = true;
}

/*
*	---------------------------------------------------
*
*	RESUME GAME
*
*	---------------------------------------------------
*/
function ResumePause()
{
	is_Pause = false;
	HidePopup();
	render_func();
}

/*
*	---------------------------------------------------
*
*	SHOW POPUP HTML DIV
*
*	---------------------------------------------------
*/
function ShowPopup()
{
	document.getElementById("popup").style.display = 'block';
}

/*
*	---------------------------------------------------
*
*	HIDE POPUP HTML DIV
*
*	---------------------------------------------------
*/
function HidePopup()
{
	document.getElementById("popup").style.display = 'none';
}

/*
*	---------------------------------------------------
*
*	RESET GAME MAP  - SETTINGS - AND RESTART GAME FROM ZERO
*
*	---------------------------------------------------
*/
function ResetGame()
{
	// REMOVING ALL BLOCKS FROM THREEJS SCENE
	for(var x = 0 ; x < mapArray.length ; x++)
	{
		for(var y = 0 ; y < mapArray[x].length ; y++)
		{
			scene.remove(mapArray[x][y]);
		}
	}

	// REMOVING ALL ROWS FROM MAPARRAY
	for(var x = 0 ; x < mapArray.length ; x++)
	{
		while(mapArray[x].length > 0)
		{
			mapArray[x].pop();
		}
	}

	//Restarting the game after cleanup
	ResumePause();

	//Reseting player position
	player.position.x = 0;


	//reseting main vars;
	GameLaunched 	= false;
	scrollspeed 	= 8;
}

/*
* 	##################
*
*	 	FUNCTION INIT()
*		This function is the entry point of our javascript application.
*		This function in creating all the basic settings like scene, camera, renderer.
*		This function is calling all the loading functions, and defining the main game render loop.
*
*	##################
*/
function init()
{
		/* ----------------- THE BASICS ----------------- */
		// Scene
		scene = new THREE.Scene();
		//scene.fog = new THREE.FogExp2( 0x2f3640, 0.045 );
		scene.fog = new THREE.Fog( 0x2f3640, 30, 35 );

		// ---------------- CAMERA ----------------

		camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 35  );
		camera.position.z = 4;
		camera.position.y = 4;
		camera.position.set( 0, 8, 13 );
		camera.lookAt (0, 0, 0 ) ;

		// ---------------- RENDERER ----------------

		var renderer = new THREE.WebGLRenderer({antialias:true, alpha : true});
		renderer.setClearColor(0x2f3640);
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setPixelRatio( window.devicePixelRatio );
		document.body.appendChild( renderer.domElement );

		/* ----------------- LIGHTS ----------------- */

		var ambientLight = new THREE.AmbientLight(0x0c0c0c);
		ambientLight.intensity = 3;
        scene.add(ambientLight);

        spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(1, 25, 9);
        spotLight.intensity = 3;
        scene.add(spotLight);
		scene.add( spotLight.target );

		// ---------------- CALLING LOADING AND INIT FUNCTIONS ----------------

		/*
		*	---------------------------------------------------
		*
		*	We are using LoadRabbit() to load rabbit player 3D model.
		*	And then, add the player to the scene
		*
		*	---------------------------------------------------
		*/
		LoadRabbit();

		// We are loading the map objects
		LoadCubes(function(){ console.log("Blocks Loaded"); });

		/* ----------------- MAIN LOOP ----------------- */

		render_func = function ()
		{
				if(is_Pause == false)
				{
					requestAnimationFrame( render_func );
				}

			  renderer.render(scene, camera);

			  var time = clock.getDelta();

			  //Main game core Tick
			  GameTick(time);
		};

		// ---------------- STARTING THE GAME MAIN LOOP ----------------

		render_func();

		/* ----------------- KEYBOARD EVENTS ----------------- */

		window.onkeydown = function(event)
		{
			var e = event || window.event;
			var key = e.which || e.keyCode;

			switch(key)
			{
				case 38 : case 122 : case 119 : case 90 : case 87 : // PRESSED KEYBORAD : UP, W, w, Z, z
					Fly_Action();
				break;

				case 37 : case 113 : case 97 : case 81 : case 65 : 	//  PRESSED KEYBOARD : LEFT, q, a, Q, A
					ismoving_left = true;
				break;

				case 39 : case 100 : case 68 : 						//  PRESSED KEYBOARD : RIGHT, d, D
					ismoving_right = true;
				break;

				default :
					return true;
				break;
			}
		}

		window.onkeyup = function(event)
		{
			var e = event || window.event;
			var key = e.which || e.keyCode;

			switch(key)
			{
				case 37 : case 113 : case 97 : case 81 : case 65 : 	//  RELEASED KEYBOARD : LEFT, q, a, Q, A
					ismoving_left = false;
				break;

				case 39 : case 100 : case 68 : 						//  RELEASED KEYBOARD : RIGHT, d, D
					ismoving_right = false;
				break;

				default :
					return true;
				break;
			}
		}

		/* ----------------- CLICK EVENTS  ----------------- */

		document.getElementById("Resetbutton").onclick = function()
		{
			ResetGame();
		};
}

/* ---------------------------------------------- */

/*
* 	##################
*
*	FUNCTION GameTick() - Called every frame
*
* 	##################
*/

function GameTick(time)
{
	/* ----------------- FIRST TICK ONLY - INIT  ----------------- */

	//IF THE GAME IS NOT STARTED YET
	if(GameLaunched == false )
	{
		// check if everything is loaded
		if( baseBlock && treeBlock && plantBlock  && player && carrot)
		{
			AddRandomRow(0);

			// Everyhting is ready we are starting the game
			// This var is used so we don't exec this code part multiple times
			GameLaunched = true;

			//Init clock to zero
			clock = new THREE.Clock(true);
		}
		else
		{
			return; //we are waiting , not everything is loaded yet
		}
	}

	// if not pause, main loop
	if(is_Pause == false)
	{
		/* ----------------- MAIN LOOP  ----------------- */

		// WE ARE LOOPING IN EACH MAPARRAY ROW
		for(var x = 0 ; x < mapArray.length ; x++)
		{
			// IF THE MAPARRAY IS NOT EMPTY
			// IF THE CURRENT MAP ROW HAS AT LEAST ONE BLOCK
			if(mapArray.length - 1 >= 0 && mapArray[x].length > 0)
			{
				// IF IT'S TIME TO CREATE A NEW ROW
				if(mapArray[ mapArray.length - 1][0].position.z >= mapStartAtPos + 1)
				{
					var offset = mapArray[ mapArray.length - 1][0].position.z - mapStartAtPos - 1 ;

					//RANDOM NUMBER - ONE CHANCE ON 50 TO CREATE A SPECIAL ROW
					switch( Math.floor(Math.random() * Math.floor(50))  )
					{
						case 1:
							AddSpecialRow(offset, 1); // special type 1 row
						break;

						default:
							AddRandomRow(offset); // normal row
						break;
					}
				}
			}

			/* ---------------------------------------------- */

			// 	STILL IN THE CURRENT ROW
			//	WE ARE LOOPING IN THE BLOCKS CONTAINED IN THE CURRENT ROW
			for(var y = 0 ; y < mapArray[x].length ; y++)
			{
				/*
				* 	var x is from the first FOR loop --> mapArray index ---> the current row we are processing
				*		var y is from this FOR loop --> block index in the current processed row
				*
				*		So, with mapArray[x][y] we can work with the "current processed block"
				*		By using these two FOR loops, we can process , move , anc check collisions with all blocks of the map
				*/

				// We are moving the current block of the current row to the bottom of the map - that's how the map is	made "scrolling"
				mapArray[x][y].position.z += (1 * scrollspeed) * time ;

				/*
				* 	CARROT ANNIMATION ROTATION
				*	If the block mesh we are currently processing has a child - we are going to make it spin
				*/
				if(mapArray[x][y].children.length > 1) // if the children count is > 1 ( = There is a carrot)
				{
					mapArray[x][y].children[1].rotation.y += 1 * time; // we are rotating the object - that's how the carrots are spining on the map
				}

				/*
				*	In this game, collision detection is ckecked with a simple distance check between the player and obstacles
				*	The hitbox_size var is used in the calculation to check if the current processed block is close enough with the player to trigger collision or carrot picking
				*/
				var hitbox_size = 0.51; // we are defining the hitbox tolerance

				// IF THE NAME OF THE CURRENT PROCESSED BLOCK IS "block_tree" --> it's a tree !
				// So, we are going to check for collisions
				if(mapArray[x][y].name == "block_tree")
				{
					//If player Z axis position and obstacle Z axis position are matching using hitbox_size var in the calculation
					if ( player.position.z < mapArray[x][y].position.z + hitbox_size && player.position.z > mapArray[x][y].position.z - hitbox_size)
					{
						//If player X axis position and obstacle X axis position are matching using hitbox_size var in the calculation
						if ( player.position.x < mapArray[x][y].position.x + hitbox_size && player.position.x > mapArray[x][y].position.x - hitbox_size)
						{
							// axis Z and X are both matching, the obtacle is close enough to trigger collision
							is_Pause = true;
							ShowPopup();
						}
					}
				}
				// IF THE NAME OF THE CURRENT PROCESSED BLOCK IS "block_base_carrot" --> it's a carrot !
				// So, we are going to check for carrot picking
				else if(mapArray[x][y].name == "block_base_carrot")
				{
					//If player Z axis position and carrot Z axis position are matching using hitbox_size var in the calculation
					if ( player.position.z < mapArray[x][y].position.z + hitbox_size && player.position.z > mapArray[x][y].position.z - hitbox_size) // player same pos Z
					{
						//If player X axis position and carrot X axis position are matching using hitbox_size var in the calculation
						if ( player.position.x < mapArray[x][y].position.x + hitbox_size && player.position.x > mapArray[x][y].position.x - hitbox_size) // player same pos X
						{
							// axis Z and X are both matching, the carrot is close enough to trigger collision

							//If the block has a child - we remove the carrot
							// So it's impossible to pick the same carrot twice
							if(mapArray[x][y].children.length > 1)
							{
								// Removing carrot from the block
								mapArray[x][y].remove(mapArray[x][y].children[1]);

								/* ----------------- CARROT PICKING EFFECT & BEEP SOUND  ----------------- */

								var geometry = new THREE.TorusGeometry( 10, 1, 3, 20 );
								var material = new THREE.MeshBasicMaterial( { color: 0xFF7F27 } );
								var torus = new THREE.Mesh( geometry, material );

								torus.rotation.x = Math.PI/2;

								torus.position.x = player.position.x;
								torus.position.z = player.position.z;
								torus.position.y = 1;

								torus.material.transparent = true;
								torus.material.opacity = 0.8;

								torus.scale.set(0.01, 0.01, 0.01);

								effectsArray.unshift(torus);
								scene.add( torus );

								//sound
								//beep.play();

							}
						}
					}
				}
				else if(mapArray[x][y].name == "block_fence")
				{
					//If player Z axis position and fence Z axis position are matching using hitbox_size var in the calculation
					if ( player.position.z < mapArray[x][y].position.z + hitbox_size && player.position.z > mapArray[x][y].position.z - hitbox_size) // player same pos Z
					{
						//If player X axis position and fence X axis position are matching using hitbox_size var in the calculation
						if ( player.position.x < mapArray[x][y].position.x + hitbox_size && player.position.x > mapArray[x][y].position.x - hitbox_size) // player same pos X
						{
							// axis Z and X are both matching, the obtacle is close enough to trigger collision
							// but, if the rabbit is flying, it's jumping over the fence, and collision is not triggered !
							if(is_flying == false)
							{
								is_Pause = true;
								ShowPopup();
							}
						}
					}
				}

			}

			if(mapArray[x].length > mapMaxHeigth)
			{
				scene.remove(mapArray[x][mapArray[x].length -1]);	 	// removing the last element
				mapArray[x].pop();										// removing the last element
			}

		} // --- END OF FOR LOOP ---

		/* ----------------- PLAYER MOVEMENT  ----------------- */

		if(ismoving_left) 		// if ismoving_left == true , we are moving the payer on the left
		{
			player.position.x -= playermaxspeed * time;
		}
		else if(ismoving_right)  // if ismoving_right == true , we are moving the payer on the right
		{
			player.position.x += playermaxspeed * time;
		}

		/* ---------------------------------------------- */

		// Camera is following player on X axis
		camera.position.x = player.position.x;

		spotLight.target.position.x = player.position.x;
		spotLight.target.position.z = player.position.z;

		// PLAYER ANNIMATION UPDATE
		if(mixerPlayer) //if mixerPlayer is ready
		{
			mixerPlayer.update(time);
		}

		/* ----------------- CARROT PICKING EFFECT ANNIMATION  ----------------- */
		if(effectsArray.length > 0)
		{
			for(var i = 0 ; i < effectsArray.length ; i ++)
			{
				effectsArray[i].scale.x += 0.2 * time;
				effectsArray[i].scale.y += 0.2 * time;

				effectsArray[i].material.opacity = effectsArray[i].material.opacity - (0.6 * time);
			}

			if(effectsArray[effectsArray.length -1].material.opacity <= 0)
			{
				scene.remove(effectsArray[effectsArray.length -1]);
				effectsArray.pop();
			}
		}
		/* ---------------------------------------------- */

	}

}

/*
*	---------------------------------------------------
*
*	This function is used to build a random basic map row
*	A map row consist of "mapwidth" number of blocks pushed into mapArray var
*
*	---------------------------------------------------
*/
function AddRandomRow(offset)
{


	//Speed up the scroll speed
	scrollspeed += scroll_acceleration;

	// FOR EACH NEW BLOCK OF THE NEW MAP ROW
	for(var x = 0 ; x < mapwidth ; x++)
	{
		var cube ;

		// SPECIAL CASE - WE PUT ONLY TREE BLOCK ON THE SIDES OF THE MAP
		// So, in a new row, block 0 and block (mapwidth - 1) are trees
		if(x == 0 || x == mapwidth - 1)
		{
			cube = treeBlock.clone();
			cube.name = "block_tree";
		}
		else // if we are not generating the sides of the map :
		{
			// RANDOM NUMBER FOR PROCEDURAL MAP GENERATION
			// We are generating a random number
			// We are setting some "special cases", if the generated number matchs one of these cases a special block will be generated
			// If not, a plain normal block will be generated
			// So, the higher will the random range be, the rarest will be the special blocks
			switch( Math.floor(Math.random() * Math.floor(30)))
			{
				case 0: // If the random number is 0 : the current block will be a PLANT BLOCK
					cube = plantBlock.clone();
				break;

				case 1: // If the random number is 1 : the current block will be a TREE BLOCK
					cube = treeBlock.clone();
					cube.name = "block_tree";
				break;

				case 10: // If the random number is 1 : the current block will be a NORMAL BLOCK - with a chance to spawn a CARROT item on it
					cube = baseBlock.clone();

					if(Math.floor(Math.random() * Math.floor(5)) == 0) // Second random number - if the condition is True, we are generating a carrot item on the normal block
					{
						// Basic settings
						var tmpcarrot = carrot.clone();
						tmpcarrot.position.y = 1;
						tmpcarrot.scale.set(1,1,1);
						tmpcarrot.rotation.y = Math.PI / 4;
						cube.add(tmpcarrot); // We are adding the carrot to the current block
						cube.name = "block_base_carrot";
					}
				break;

				default : // In all the other cases, we are generating a normal plain block
					cube = baseBlock.clone();
				break;
			}
		}

		// we are setting the current block scene position, depending of the current index on the row we are generating
		cube.position.x = x - mapwidth / 2 + 0.5 ;
		cube.position.z =  mapStartAtPos + offset;

		// the block is saved in the mapArray var
		mapArray[x].unshift(cube);

		//we spawn the block in the scene
		scene.add( cube );
	}
}

/*
*	---------------------------------------------------
*
*	This function is used to build a SPECIAL map row
*	A special map row consist of an event :
*
*	IF CASE 1 : Generating a fence, the rabbit has to jump over it
*
*	... and that's it for now ! There is only one special map row type for now - but you can add more cases
*
*	THIS FX IS REALLY SIMILAR TO AddRandomRow() without the randomisation
*
*	---------------------------------------------------
*/
function AddSpecialRow(offset, special_row_id)
{


	// THE MAP NEEDS TO BE AT LEAST 8 BLOCKS WIDTH
	if(mapwidth < 7)
	{
		console.error("[ERROR] mapwidth - too low for AddSpecialRow");
		return;
	}

	switch(special_row_id)
	{
		case 1: // IF THE WANTED TYPE IS 1, WE ARE GENERATING A FENCE EVENT

			/*
			*
			* 	THIS PART IS REALLY SIMILAR TO AddRandomRow() without the randomisation
			*	In this case, we are builing a predefined fence row and adding it to the scene anb mapArray
			*
			*/
			for(var x = 0 ; x < mapwidth ; x++)
			{
				var cube ;

				if(x == 0 || x == mapwidth - 1 || x == 1 || x == mapwidth - 2 || x == mapwidth/2 ||  x == mapwidth/2 - 1)
				{
					cube = treeBlock.clone();
					cube.name = "block_tree";
				}
				else
				{
					cube = fenceBlock.clone();
					cube.name = "block_fence";
				}

				cube.position.x = x - mapwidth / 2 + 0.5 ;
				cube.position.z =  mapStartAtPos + offset;

				mapArray[x].unshift(cube);
				scene.add( cube );
			}
		break;

		default:
			console.error("[ERROR] AddSpecialRow - invalid special_row_id param");
		break;
	}
}

init();
