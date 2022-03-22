import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare'
import Flare0 from './img/lensflare0.png'
import Flare3 from './img/lensflare3.png'


let container, camera, scene, renderer, controls;

container = document.createElement( 'div' );
document.body.appendChild( container );

let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;

scene = new THREE.Scene()

// CAMERA
camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 0, 10, 80 );

// SCENE
scene = new THREE.Scene();
scene.background = new THREE.Color( 0x050505 );
scene.fog = new THREE.Fog( 0x050505, 400, 1000 );

// LIGHTS
scene.add( new THREE.AmbientLight( 0x222222 ) );

// RENDERER
renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
container.appendChild( renderer.domElement );

// GRID HELPER
const gridHelper = new THREE.GridHelper(300, 100);
scene.add(gridHelper);

// LENSFLARE
const textureLoader = new THREE.TextureLoader();


const textureFlare0 = textureLoader.load(Flare0);
const textureFlare3 = textureLoader.load(Flare3);

addLight( 1, 1, 1, 0, 0, - 100 );

function addLight( h, s, l, x, y, z ) {

  const light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
  light.color.setHSL( h, s, l );
  light.position.set( x, y, z );
  scene.add( light );

  const lensflare = new Lensflare();
  lensflare.addElement( new LensflareElement( textureFlare0, 700, 0, light.color ) );
  lensflare.addElement( new LensflareElement( textureFlare3, 60, 0.6 ) );
  lensflare.addElement( new LensflareElement( textureFlare3, 70, 0.7 ) );
  lensflare.addElement( new LensflareElement( textureFlare3, 120, 0.9 ) );
  lensflare.addElement( new LensflareElement( textureFlare3, 70, 1 ) );
  light.add( lensflare );

}

// CONTROLS
controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0, 0 );
controls.update();

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
}

animate()