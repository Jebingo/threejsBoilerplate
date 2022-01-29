import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

// SCENE, CAMERA AND RENDERER SETUP
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#webgl')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(5)

// DEBUG
const gui = new dat.GUI()

// TEXTURE LOADER
const loader = new THREE.TextureLoader()

// OBJECTS
const geometry = new THREE.TorusGeometry(1, .3, 16, 100)

// MATERIALS
const material = new THREE.MeshBasicMaterial({color: 0x00aaff})

// MESH
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

// LIGHTS
const pointLight = new THREE.PointLight(0xffffff)
const ambientLight = new THREE.AmbientLight(0xffffff)
pointLight.position.set(2,3,4)
scene.add(pointLight, ambientLight)

// SIZES
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
window.addEventListener('resize', () =>{
  // UPDATE SIZES
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // UPDATE CAMERA
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // UPDATE RENDERER
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(window.devicePixelRatio)
})

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)

// GUI CONTROLS
const color = { color: 0xffffff }
gui.addColor(color, 'color').onChange(() =>{
  material.color.set(color.color)
})

// EVENT LISTENERS
document.addEventListener('mousemove', (e) =>{
  torus.rotation.x += e.clientX * .0001
  torus.rotation.y += e.clientY * .0001
})

// ANIMATE FUNCTION
function animate()
{
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()