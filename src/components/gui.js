import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let sc = new THREE.Scene()

let box = new THREE.BoxGeometry(1,1,1)
let material = new THREE.MeshBasicMaterial({color : "white"})
let mesh = new THREE.Mesh(box,material)


sc.add(mesh )

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

let orbitControls = new OrbitControls(camera,canvasTag)
orbitControls.enableDamping = true
// orbitControls.minDistance = 1
// orbitControls.maxDistance = 4


let materialChange = {
    color : "#0f8cfa"
}
let gui = new GUI({
    title : "menu",
    width : 300
})
let cube = gui.addFolder("cube")
cube.add(mesh.position , "x" ,-1,1,0.1).name("positon X")
cube.add(mesh.position , "y" ,-1,1,0.1).name("positon y")
cube.add(mesh.position , "z" ,-1,1,0.1).name("positon z")
cube.add(mesh.material , "wireframe")
cube.add(mesh.rotation , "x" ,-1,1,0.1 ).name("rotation X")
cube.add(mesh.rotation , "y" ,-1,1,0.1 ).name("rotation y")
cube.add(mesh.rotation , "z" ,-1,1,0.1 ).name("rotation z")
cube.addColor(materialChange , "color").onChange(()=>{
    material.color.set(materialChange.color)
})
const clock = new THREE.Clock()
const animation = () => {
    const elipse = clock.getElapsedTime()
    // mesh.rotation.x = elipse
    orbitControls.update()
    // move()
    renderer.render(sc , camera)
    window.requestAnimationFrame(animation)
}
animation()