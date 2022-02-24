import './style.css'
import EARTH_SURFACE from './img/earth-surface.jpg'

import * as THREE from 'three'

import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement);
camera.position.setZ(40)
camera.position.setY(10)

const geometry = new THREE.SphereGeometry( 15, 64, 32 );
const textureLoader = new THREE.TextureLoader();
const surface = textureLoader.load(EARTH_SURFACE);
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const material = new THREE.MeshPhongMaterial({map: surface});
const sphere = new THREE.Mesh( geometry, material );
sphere.position.setY(10)
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

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

function addStar() {
  const geometry = new THREE.SphereGeometry(.25, 24, 24)
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