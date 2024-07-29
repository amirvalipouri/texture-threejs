import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'
// import { RGBMLoader } from 'three/examples/jsm/Addons.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'


let sc = new THREE.Scene()
// sc.background = new THREE.Color('#b8b1b0')
let rgba = new RGBELoader()
rgba.load("texture/envi/hdr.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    sc.background = texture;
    sc.enviroment = texture;
})

let aml = new THREE.AmbientLight('#FFFFFF', 0.5)
let direct = new THREE.DirectionalLight('#FFFFFF', 0.5)
direct.position.set(1, 1, 1)
sc.add(aml, direct)


let textureLoader = new THREE.TextureLoader()

let nama1 = textureLoader.load('gold/asli.jpg')
nama1.minFilter = THREE.NearestFilter
nama1.colorSpace = THREE.SRGBColorSpace
let nama1ao = textureLoader.load('gold/ao.jpg')
let nama1dis = textureLoader.load('gold/disc.jpg')
let nama1normal = textureLoader.load('gold/normal.jpg')

let nama2 = textureLoader.load('silver/asli.png')
nama2.minFilter = THREE.NearestFilter
nama2.colorSpace = THREE.SRGBColorSpace
let nama2ao = textureLoader.load('silver/ao.png')
let nama2dis = textureLoader.load('silver/disc.png')
let nama2normal = textureLoader.load('silver/normal.png')



let sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: nama1,
        aoMap: nama1ao,
        aoMapIntensity: 1,
        displacementMap: nama1dis,
        displacementScale: 0.1,
        normalMap: nama1normal,
        normalScale: new THREE.Vector2(1, 1),
        metalness: 0,
        roughness: 0
    })
)


sc.add(sphere)


// let vaziat = true;

let silver = document.getElementById('silver')
silver.addEventListener('click', () => {
    sphere.material.map = nama2
    sphere.material.aoMap = nama2ao
    sphere.material.displacementMap = nama2dis
    sphere.material.normalMap = nama2normal

})

let gold = document.getElementById('gold')
gold.addEventListener('click', () => {
    sphere.material.map = nama1
    sphere.material.aoMap = nama1ao
    sphere.material.displacementMap = nama1dis
    sphere.material.normalMap = nama1normal

})






let size = {
    width: window.innerWidth,
    height: window.innerHeight
}


let camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 1.5
sc.add(camera)

window.addEventListener('resize', () => {
    size.width = window.innerWidth
    size.height = window.innerHeight
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width, size.height)
})

let canvas = document.querySelector('.web')

let renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
})



renderer.setSize(size.width, size.height)

let orbit = new OrbitControls(camera, canvas)
orbit.enableDamping = true
orbit.maxDistance = 1.5
orbit.minDistance = 1.3
orbit.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.ROTATE,
    RIGHT: THREE.MOUSE.ROTATE
}

const clock = new THREE.Clock()
let animation = () => {
    orbit.update()
    const elapstime = clock.getElapsedTime()
    renderer.render(sc, camera)
    window.requestAnimationFrame(animation)
}
animation()
