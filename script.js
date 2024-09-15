// Load three.js from CDN
const scriptThree = document.createElement("script");
scriptThree.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
document.head.appendChild(scriptThree);

scriptThree.onload = () => {
    // Load STLLoader and OrbitControls from CDN
    const scriptSTLLoader = document.createElement("script");
    scriptSTLLoader.src = "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/STLLoader.js";
    document.head.appendChild(scriptSTLLoader);

    const scriptOrbitControls = document.createElement("script");
    scriptOrbitControls.src = "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js";
    document.head.appendChild(scriptOrbitControls);

    // Wait for STLLoader and OrbitControls to load before initializing the scene
    scriptSTLLoader.onload = () => {
        scriptOrbitControls.onload = () => {
            init();
        };
    };
}

let scene, camera, renderer, controls;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('viewer').appendChild(renderer.domElement);

    // OrbitControls setup
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Load STL file
    const loader = new THREE.STLLoader();
    loader.load('path/to/your/file.stl', function (geometry) {
        const material = new THREE.MeshStandardMaterial({ color: 0x606060 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -0.5 * Math.PI;  // Align with Z-axis
        mesh.scale.set(0.1, 0.1, 0.1);    // Adjust scale
        scene.add(mesh);
    });

    // Handle window resizing
    window.addEventListener('resize', onWindowResize, false);
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
