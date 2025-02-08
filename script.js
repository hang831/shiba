const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


/* Buttons to handle scene switch 
$("#scene2").click(function() {
    scene = scene2
  })
  $("#scene1").click(function() {
    scene = scene1
  })*/

const scene  = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1,1000)

const renderer = new THREE.WebGLRenderer({
    antialias: true, alpha: true,
})
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadow;
renderer.physicallyConnectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2.5;
document.querySelector(".model").appendChild(renderer.domElement);


function basicAnimate(){
    renderer.render(scene, camera);
    requestAnimationFrame(basicAnimate);
}
basicAnimate();


let model;
const loader = new THREE.GLTFLoader();

loader.load("./shiba1/scene.gltf", function(gltf){
    model = gltf.scene;

const box = new THREE.Box3().setFromObject(model);
const center = box.getCenter(new THREE.Vector3());
model.position.sub(center);
scene.add(model);

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const size = box.getSize(new THREE.Vector3());
const maxDim = Math.max(size.x, size.y, size.z);
camera.position.z = maxDim * 0.75;
model.rotation.set(0, 0.5, 0);
model.scale.set(0.5, 0.5, 0.5);
playInitialRotation();
cancelAnimationFrame(basicAnimate);
animate();
});








const floatAmplitude = 0.2;
const floatSpeed = 1.5;
const rotationSpeed = 0.3;
let isFloating = true;
let currentScroll = 0;

const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;

function playInitialRotation(){
    if (model) {
        gsap.to(model.scale, {
            //x:1,
            //y:1,
            //z:1,
            duration: 1,
            ease: "power2.out",
        })
    }
}

ScrollTrigger.defaults({
    immediateRender: false,
    ease: "power1.inOut",
    scrub: true
  });
  
   
  let car_anim_tl = gsap.timeline({

    scrollTrigger: {
      trigger: ".content",
      start: "top top", 
      endTrigger: ".outintro",
      end: "bottom bottom", 
      scrub: 1, 
      markers: true,
   }
  
});


car_anim_tl
  .to(scene.rotation, { y: 4.79 })
  .to(camera.position, { x: -0.1 }) 
  .to(scene.rotation, { z: 1.6 })
  .to(scene.rotation, { z: 0.02, y: 3.1 }, "simultaneously")
  .to(camera.position, { x: 5 }, "simultaneously")
  .to(".outintro", { opacity: 0, scale: 0 }, "simultaneously")
;
    


lenis.on("scroll", (e) =>{
    currentScroll = e.scroll;
})

function animate(){
    if (model) {
        
        if (isFloating) {
            
            const floatOffset = Math.sin(Date.now() * 0.001 * floatSpeed) * floatAmplitude;
            model.position.y = floatOffset;
        }

        const scrollProgress = Math.min(currentScroll / totalScrollHeight, 1);

        const baseTilt = 0.5;
        model.rotation.x = scrollProgress * Math.PI *4 +baseTilt;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}








