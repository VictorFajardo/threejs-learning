import './style.css'
import EARTH_SURFACE from './img/earth-surface.jpg'

import * as THREE from 'three'

import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'


let container, camera, scene, renderer, controls;

container = document.createElement( 'div' );
				document.body.appendChild( container );


let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;

scene = new THREE.Scene()
// CAMERA

camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 0, 150, 400 );

// SCENE

scene = new THREE.Scene();
scene.background = new THREE.Color( 0x050505 );
scene.fog = new THREE.Fog( 0x050505, 400, 1000 );

// LIGHTS

scene.add( new THREE.AmbientLight( 0x222222 ) );

const light1 = new THREE.SpotLight( 0xffffff, 5, 1000 );
light1.position.set( 200, 250, 500 );
light1.angle = 0.5;
light1.penumbra = 0.5;

light1.castShadow = true;
light1.shadow.mapSize.width = 1024;
light1.shadow.mapSize.height = 1024;

// scene.add( new THREE.CameraHelper( light1.shadow.camera ) );
scene.add( light1 );

const light2 = new THREE.SpotLight( 0xffffff, 5, 1000 );
light2.position.set( - 100, 350, 350 );
light2.angle = 0.5;
light2.penumbra = 0.5;

light2.castShadow = true;
light2.shadow.mapSize.width = 1024;
light2.shadow.mapSize.height = 1024;

// scene.add( new THREE.CameraHelper( light2.shadow.camera ) );
scene.add( light2 );

// RENDERER

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
container.appendChild( renderer.domElement );

//

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;

const geometry = new THREE.SphereGeometry( 50, 64, 32 );
const textureLoader = new THREE.TextureLoader();
const surface = textureLoader.load(EARTH_SURFACE);
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const material = new THREE.MeshPhongMaterial({map: surface});
const sphere = new THREE.Mesh( geometry, material );
sphere.position.set(0,50,0)
scene.add( sphere );

// scene.add(sphere);

const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.set(0, 10, 40)

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.25)
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(lightHelper)
const gridHelper = new THREE.GridHelper(300, 100)
scene.add(gridHelper)

controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 50, 0 );
controls.update();

function addStar() {
  const geometry = new THREE.SphereGeometry(50, 24, 24)
  const material = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF
  })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150))

  star.position.set(x, y, z)
  scene.add(star)
}

// Array(200).fill().forEach(addStar)

function animate() {
  requestAnimationFrame(animate)

  // sphere.rotation.x += 0.005
  sphere.rotation.y -= 0.0005
  // torus.rotation.z += 0.005
  controls.update()
  renderer.render(scene, camera)
}

animate()