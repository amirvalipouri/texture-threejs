import GUI from 'lil-gui'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

let sc = new THREE.Scene()

let box = new THREE.BoxGeometry(1,1,1)
let material = new THREE.MeshBasicMaterial({color : "white"})
let mesh = new THREE.Mesh(box,material)

let planeGeometry = new THREE.PlaneGeometry(100,100)
const planeMaterial = new THREE.MeshBasicMaterial( {color: "green", side: THREE.DoubleSide} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial )
plane.rotation.x = Math.PI / 2
plane.position.y = -0.51
sc.add(mesh , plane )

let size = {width : window.innerWidth, height : window.innerHeight}
let camera = new THREE.PerspectiveCamera(75,size.width/size.height)
camera.position.set(1,1,5)
sc.add(camera)

// let axes = new THREE.AxesHelper(20)
// sc.add(axes)

let canvasTag = document.querySelector(".web")
let renderer = new THREE.WebGLRenderer({
    canvas : canvasTag,
    antialias : true
})
renderer.setSize(size.width , size.height)

// let orbitControls = new OrbitControls(camera,canvasTag)
// orbitControls.enableDamping = true
// orbitControls.minDistance = 1
// orbitControls.maxDistance = 4

let pointer = new PointerLockControls(camera,canvasTag)
let keyboard = []
window.addEventListener("keydown" , (e) => {
    keyboard[e.key] = true
})
window.addEventListener("keyup" , (e) => {
    keyboard[e.key] = false
})
let move = () => {
    if(keyboard["w"] || keyboard["W"]){
        pointer.moveForward(0.2)
    }
    if(keyboard["s"] || keyboard["S"]){
        pointer.moveForward(-0.2)
    }
    if(keyboard["d"] || keyboard["D"]){
        pointer.moveRight(0.2)
    }
    if(keyboard["a"] || keyboard["A"]){
        pointer.moveRight(-0.2)
    }
}
window.addEventListener("keydown" , (e) => {
    if(e.keyCode == 13){
        pointer.lock()
    }
    if(e.keyCode == 97){
        pointer.unlock()
    }
})

const clock = new THREE.Clock()
const animation = () => {
    const elipse = clock.getElapsedTime()
    // mesh.rotation.x = elipse
    // orbitControls.update()
    move()
    renderer.render(sc , camera)
    window.requestAnimationFrame(animation)
}
animation()