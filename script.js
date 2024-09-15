let scene, camera, renderer, controls;

// Initialize the scene
function init() {
    // Create a scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Setup camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('viewer').appendChild(renderer.domElement);

    // OrbitControls for interactive view
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Load STL File
    const loader = new THREE.STLLoader();
    loader.load('path/to/your/file.stl', function (geometry) {
        const material = new THREE.MeshStandardMaterial({ color: 0x606060 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -0.5 * Math.PI;  // Rotate to align with Z-axis
        mesh.scale.set(0.1, 0.1, 0.1);    // Adjust the scaling as needed
        scene.add(mesh);
    });

    // Handle window resizing
    window.addEventListener('resize', onWindowResize, false);
}

// Adjust the renderer and camera on window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Start the application
init();
animate();
