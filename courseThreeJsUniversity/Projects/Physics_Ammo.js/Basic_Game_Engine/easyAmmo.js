export const RBShape = { Box : 0, Sphere : 1, Capsule : 2, Capsule_Character : 3 }
export const UniverseType = { DiscreteDynamics : 0, SoftRigidDynamics : 1 }

const STATE = { DISABLE_DEACTIVATION : 4 }
const FLAGS = { CF_KINEMATIC_OBJECT: 2 }

export class AmmoWorld
{
    constructor( universe_type )
    {
        this.rigidBody_List                   = new Array();
        this.physicsUniverse                  = undefined;
        this.tmpTransformation 	              = new Ammo.btTransform();
        this.initPhysicsUniverse( universe_type );
    }

    initPhysicsUniverse( universe_type )
		{
        if( universe_type == UniverseType.SoftRigidDynamics )
        {
            var collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
            var dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
            var broadphase = new Ammo.btDbvtBroadphase();
            var solver = new Ammo.btSequentialImpulseConstraintSolver();
            var softBodySolver = new Ammo.btDefaultSoftBodySolver();

            this.physicsUniverse = new Ammo.btSoftRigidDynamicsWorld( dispatcher, broadphase, solver, collisionConfiguration, softBodySolver );
            this.physicsUniverse.setGravity( new Ammo.btVector3( 0, -200, 0 ) );
            this.physicsUniverse.getWorldInfo().set_m_gravity( new Ammo.btVector3( 0, -200, 0 ) );
        }
        else
        {
            var collisionConfiguration            = new Ammo.btDefaultCollisionConfiguration();
            var dispatcher                        = new Ammo.btCollisionDispatcher(collisionConfiguration);
            var overlappingPairCache              = new Ammo.btDbvtBroadphase();
            var solver                            = new Ammo.btSequentialImpulseConstraintSolver();

            this.physicsUniverse                  = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
            this.physicsUniverse.setGravity(new Ammo.btVector3(0, -200, 0));

            //OPTIMISATION
            this.physicsUniverse.getSolverInfo().m_numIterations = 4;
            console.log(this.physicsUniverse.getSolverInfo().m_numIterations  );
        }

		}

    updatePhysicsUniverse( deltaTime )
		{
		    this.physicsUniverse.stepSimulation( deltaTime, 10);

				for ( let i = 0; i < this.rigidBody_List.length; i++ )
				{
						let Graphics_Obj                  = this.rigidBody_List[ i ];
						let Physics_Obj                   = Graphics_Obj.userData.physicsBody;
						let motionState                   = Physics_Obj.getMotionState();

						if( motionState )
						{
								motionState.getWorldTransform( this.tmpTransformation );
								let new_pos                   = this.tmpTransformation.getOrigin();
								let new_qua                   = this.tmpTransformation.getRotation();
								Graphics_Obj.position.set( new_pos.x(), new_pos.y(), new_pos.z() );
								Graphics_Obj.quaternion.set( new_qua.x(), new_qua.y(), new_qua.z(), new_qua.w() );
						}
				}
		}

    rigidBodyFactory( config )
    {
          /*
          *     config.rotation = THREE.Vector3
          *     Rotation initiale du RigidBody
          *
          *     config.mesh = THREE.Mesh
          *     Mesh Three.js lié au RigidBody
          *
          *     config.shape = Integer ( Box : 1, Sphere : 2, Capsule : 3)
          *     La forme de notre RigidBody
          *
          *     config.size
          *     Box     : Three.Vector3   ( X / Y / Z )
          *     Sphere  : Integer         ( Radius )
          *     Capsule : Three.Vector2   ( Radius / Height )
          *
          *     config.friction = Number
          *     Friction du RigidBody
          *
          *     config.restitution = Number
          *     Restitution du RigidBody
          *
          *     config.mass = Number
          *     Masse du RigidBody
          *
          */

          if(!config.mass)        { config.mass         = 0; }
          if(!config.restitution) { config.restitution  = 0; }
          if(!config.friction)    { config.friction     = 1; }

          if(!config.mesh || config.shape == undefined || !config.size)
          {
              console.error("[rigidBodyFactory] Invalid arguments :");

              if(!config.mesh)
              {
                  console.error("Invalid Mesh !");
                  console.error(config.mesh);
              }

              if(!config.shape)
              {
                  console.error("Invalid Shape !");
              }

              if(!config.size)
              {
                  console.error("Invalid Size !");
              }

              return;
          }

          let quaternion = {x: 0, y: 0, z: 0, w:  1};

          var ammoquat = new Ammo.btQuaternion(  quaternion.x, quaternion.y, quaternion.z, quaternion.w )

          if(config.rotation)
          {
              ammoquat.setEulerZYX(config.rotation.z, config.rotation.y, config.rotation.x)
          }


          let transform                       = new Ammo.btTransform();
          transform.setIdentity();
          transform.setOrigin( new Ammo.btVector3( config.mesh.position.x, config.mesh.position.y, config.mesh.position.z ) );
          transform.setRotation( ammoquat );

          let defaultMotionState              = new Ammo.btDefaultMotionState( transform );
          let structColShape                  = undefined;

          if( config.shape == RBShape.Box )
          {
              structColShape                  = new Ammo.btBoxShape( new Ammo.btVector3( config.size.x, config.size.y, config.size.z ) );
          }
          else if( config.shape == RBShape.Sphere )
          {
              structColShape                   = new Ammo.btSphereShape( config.size );
          }
          else if( config.shape == RBShape.Capsule || config.shape == RBShape.Capsule_Character )
          {
              structColShape                   = new Ammo.btCapsuleShape( config.size.x, config.size.y );
          }
          else
          {
              console.error("Unknown config.shape : " + config.shape);
              return;
          }

          structColShape.setMargin( 0.05 );

          let localInertia                      = new Ammo.btVector3( 0, 0, 0 );
          structColShape.calculateLocalInertia( config.mass, localInertia );

          let RBody_Info                        = new Ammo.btRigidBodyConstructionInfo( config.mass, defaultMotionState, structColShape, localInertia );
          let RBody                             = new Ammo.btRigidBody( RBody_Info );

          RBody.setFriction( config.friction );
          RBody.setRestitution( config.restitution );

          if( config.shape == RBShape.Capsule_Character )
          {
              RBody.setAngularFactor( 0, 1, 0 );
              //RBody.setActivationState( STATE.DISABLE_DEACTIVATION );
          }

          this.physicsUniverse.addRigidBody( RBody );
          config.mesh.userData.physicsBody      = RBody;
          this.rigidBody_List.push(config.mesh);
    }
}

export default AmmoWorld;
