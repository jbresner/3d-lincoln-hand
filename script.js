let scene, camera, renderer, controls;

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Orbit Controls for zoom, pan, and rotate
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Ambient light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1); // Point light
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Load STL File
    const loader = new THREE.STLLoader();
    loader.load('hand.stl', function (geometry) {
        const material = new THREE.MeshStandardMaterial({ color: 0x606060 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -0.5 * Math.PI; // Rotate to align with Z-axis up
        mesh.scale.set(0.1, 0.1, 0.1); // Scale the object
        scene.add(mesh);
    });

    // Handle resizing
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Only required if controls.enableDamping = true
    renderer.render(scene, camera);
}

// Initialize and animate
init();
animate();
