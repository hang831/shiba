let camera2, controls2, scene2, renderer2, model2;

			init();
			//render(); // remove when using animation loop

			function init() {

				scene2 = new THREE.Scene();
				


				renderer2 = new THREE.WebGLRenderer( { antialias: true, alpha: true,} );
                renderer2.setClearColor(0x000000, 0);
				renderer2.setPixelRatio( window.devicePixelRatio );
				renderer2.setSize( window.innerWidth, window.innerHeight );
                
                renderer2.shadowMap.enabled = true;
                renderer2.shadowMap.type = THREE.PCFSoftShadow;
                renderer2.physicallyConnectLights = true;
                renderer2.toneMapping = THREE.ACESFilmicToneMapping;
                renderer2.toneMappingExposure = 2.5;

				renderer2.setAnimationLoop( animate2 );
				document.querySelector(".model2").appendChild(renderer2.domElement);


				camera2 = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
				camera2.position.set( 0,100, 1000 );

				// controls

				controls2 = new THREE.OrbitControls( camera2, renderer2.domElement );
				controls2.listenToKeyEvents( window ); // optional

				//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

				controls2.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls2.dampingFactor = 0.05;

				controls2.screenSpacePanning = false;

				controls2.minDistance = 100;
				controls2.maxDistance = 500;

				controls2.maxPolarAngle = Math.PI / 2;

				// world

                
                const loader2 = new THREE.GLTFLoader();

                loader2.load("./shiba2/scene.gltf", function(gltf){
                    model2 = gltf.scene;

                const box = new THREE.Box3().setFromObject(model2);
                const center = box.getCenter(new THREE.Vector3());
                model2.position.sub(center);
               // model2.scale.set(0.5, 0.5, 0.5);
                scene2.add(model2);
            });

				// lights

				const dirLight1 = new THREE.DirectionalLight( 0xffffff, 3 );
				dirLight1.position.set( 1, 1, 1 );
				scene2.add( dirLight1 );

				const dirLight2 = new THREE.DirectionalLight( 0x002288, 3 );
				dirLight2.position.set( - 1, - 1, - 1 );
				scene2.add( dirLight2 );

				const ambientLight = new THREE.AmbientLight( 0x555555 );
				scene2.add( ambientLight );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera2.aspect = window.innerWidth / window.innerHeight;
				camera2.updateProjectionMatrix();

				renderer2.setSize( window.innerWidth, window.innerHeight );

			}

			function animate2() {

				controls2.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

                if (model2){
                    const floatOffset2 = Math.sin(Date.now() * 0.001 * 0.3) * 0.5;
                    model2.rotation.y = floatOffset2;
                    }

				render();
			}

			function render() {

				renderer2.render( scene2, camera2 );

			}