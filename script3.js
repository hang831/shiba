let camera3, controls3, scene3, renderer3, model3;

			init2();
			//render(); // remove when using animation loop

			function init2() {

				scene3 = new THREE.Scene();
				


				renderer3 = new THREE.WebGLRenderer( { antialias: true, alpha: true,} );
                renderer3.setClearColor(0x000000, 0);
				renderer3.setPixelRatio( window.devicePixelRatio );
				renderer3.setSize( window.innerWidth, window.innerHeight );
                
                renderer3.shadowMap.enabled = true;
                renderer3.shadowMap.type = THREE.PCFSoftShadow;
                renderer3.physicallyConnectLights = true;
                renderer3.toneMapping = THREE.ACESFilmicToneMapping;
                renderer3.toneMappingExposure = 2.5;

				renderer3.setAnimationLoop( animate3 );
				document.querySelector(".model3").appendChild(renderer3.domElement);


				camera3 = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
				camera3.position.set( 1000,100, 500 );

				// controls

				controls3 = new THREE.OrbitControls( camera3, renderer3.domElement );
				controls3.listenToKeyEvents( window ); // optional

				//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

				controls3.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls3.dampingFactor = 0.05;

				controls3.screenSpacePanning = false;

				controls3.minDistance = 100;
				controls3.maxDistance = 500;

				controls3.maxPolarAngle = Math.PI / 2;

				// world

                
                const loader3 = new THREE.GLTFLoader();

                loader3.load("./shiba3/scene.gltf", function(gltf){
                    model3 = gltf.scene;

                const box = new THREE.Box3().setFromObject(model3);
                const center = box.getCenter(new THREE.Vector3());
                model3.position.sub(center);
               // model2.scale.set(0.5, 0.5, 0.5);
                scene3.add(model3);
            });

				// lights

				const dirLight3 = new THREE.DirectionalLight( 0xffffff, 3 );
				dirLight3.position.set( 1, 1, 1 );
				scene3.add( dirLight3 );

				const dirLight4 = new THREE.DirectionalLight( 0x002288, 3 );
				dirLight4.position.set( - 1, - 1, - 1 );
				scene3.add( dirLight4 );

				const ambientLight2 = new THREE.AmbientLight( 0x555555 );
				scene3.add( ambientLight2 );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera3.aspect = window.innerWidth / window.innerHeight;
				camera3.updateProjectionMatrix();

				renderer3.setSize( window.innerWidth, window.innerHeight );

			}

			function animate3() {

				controls3.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

                if (model3){
                    const floatOffset3 = Math.sin(Date.now() * 0.001 * 0.3) * 0.5;
                    model3.rotation.y = floatOffset3;
                    }

				render2();
			}

			function render2() {

				renderer3.render( scene3, camera3 );

			}