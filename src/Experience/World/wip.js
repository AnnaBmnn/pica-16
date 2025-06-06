import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'three/addons/libs/lil-gui.module.min.js';

/*
 * Three.js stuff
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('../textures/particles/1.png');

/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 25000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
    positions[i] = (random() - 0.5) * 1;
    colors[i] = random();
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.7,
    sizeAttenuation: true,
    color: new THREE.Color('#4ab8e2'),
    transparent: true,
    alphaMap: particleTexture,
    alphaTest: 0.5,
    //depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
});

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
particles.position.set(0, 0, -15);
particles.scale.set(0.5, 0.5, 0.5);
scene.add(particles);

/**
 * Resize window
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 20).setLength(30);
scene.add(camera);

// Controls
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
const controls = new OrbitControls(camera, canvas);
Object.assign(controls, {
    enableDamping: true,
    dampingFactor: 0.03,
    autoRotate: true,
    autoRotateSpeed: 2
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Axes for reference
 */
//const axesHelper = new THREE.AxesHelper(5);
//scene.add(axesHelper);

/**
 * Lorenz Attractor variation
 */
// An adaptation from Steven Wittens' work: https://acko.net/files/dump/tiles/lorenzwarp.html
const initialParams = {
    Attractor: "Lorenz variation",
    sigma: 10,
    rho: 28,
    beta: 8 / 3,
    kappa: 200,
    speed: 0.65,
    autoRotate: true
};

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#copy_an_array
const params = { ...initialParams };

let attractor = (x, y, z) => {
    const { sigma, rho, beta, kappa, speed } = params;

    const dx = (sigma * (y - x) + (sin(y / 5) * sin(z / 5) * kappa)) * speed;
    const dy = (x * (rho - z) - y + (sin(x / 5) * sin(z / 5) * kappa)) * speed;
    const dz = (x * y - beta * z + cos(y / 5) * cos(x / 5) * kappa) * speed;

    return { dx, dy, dz };
};

/*
const goToSource = () => {
    window.location.href = "https://github.com/jcponce/jcponce.github.io/blob/master/threejs/attractors/lorenz-variation/main.js";
}
*/

/**
 * Reset functions
 */
const resetInitialPositions = () => {
    initialPositions = [];
    const size = 40;
    for (let i = 0; i < count; i++) {
        initialPositions.push({
            x: (random() - 0.5) * size,
            y: (random() - 0.5) * size,
            z: (random() - 0.5) * size
        });
    }
}

const resetParameters = () => {
    params.sigma = initialParams.sigma;
    params.rho = initialParams.rho;
    params.beta = initialParams.beta;
    params.kappa = initialParams.kappa;
    sigmaController.updateDisplay();
    rhoController.updateDisplay();
    betaController.updateDisplay();
    kappaController.updateDisplay();
    speedController.updateDisplay();
    //resetInitialPositions();
};

/**
 * Controls
 */
const gui = new GUI();
gui.add(params, 'Attractor');

const sigmaController = gui.add(params, 'sigma', 1, 12, 0.01).listen().decimals(2);
const rhoController = gui.add(params, 'rho', -10, 30, 0.01).listen().decimals(2);
const betaController = gui.add(params, 'beta', -2, 5, 0.01).listen().decimals(2);
const kappaController = gui.add(params, 'kappa', 0, 300, 1).listen().decimals(0);
gui.add({ Reset: resetParameters }, 'Reset').name('Reset parameters');
gui.add({ Initial: resetInitialPositions }, 'Initial').name('Reset initial conditions');

const speedController = gui.add(params, 'speed', 0, 2, 0.01).name('Animation speed').listen().decimals(2);
gui.add(params, 'autoRotate').name('Auto Rotate').onChange(value => {
    controls.autoRotate = value;
});

gui.addColor(particlesMaterial, 'color').name('Color');
gui.add({fullScreen: toggleFullScreen}, 'fullScreen').name('Toggle Full Screen');
//gui.add({ source: goToSource }, 'source').name('Source code');
gui.close();

/**
 * Animate stuff
 */
const dt = 0.002; // Time step for attractor simulation
let initialPositions = [];

resetInitialPositions();

const animate = () => {
    for (let i = 0; i < count; i++) {
        const { x, y, z } = initialPositions[i];
        const { dx, dy, dz } = attractor(x, y, z);

        initialPositions[i].x += dx * dt;
        initialPositions[i].y += dy * dt;
        initialPositions[i].z += dz * dt;

        const i3 = i * 3;
        positions[i3] = initialPositions[i].x;
        positions[i3 + 1] = initialPositions[i].y;
        positions[i3 + 2] = initialPositions[i].z;
    }

    particlesGeometry.attributes.position.needsUpdate = true;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call animation again on the next frame
    window.requestAnimationFrame(animate);
};

/**
 * Save image function
 */
const saveImage = () => {
    renderer.render(scene, camera);
    const link = document.createElement('a');
    link.href = renderer.domElement.toDataURL('image/jpeg');
    link.download = 'my-lorenz-variation.jpg';
    link.click();
};

//Add save image button to GUI
gui.add({ Save: saveImage }, 'Save').name('Save image');

animate();