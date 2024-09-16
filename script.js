let scene, camera, renderer, controls;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0, 0, 20);  // Move the camera back a little for better visibility

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('viewer').appendChild(renderer.domElement);

    // OrbitControls setup
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;   // Smooth damping
    controls.dampingFactor = 0.25;   // Damping factor
    controls.enableZoom = true;      // Enable zoom
    controls.enablePan = true;       // Enable panning

    // Default Ambient Light for basic illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);  // Simple ambient light
    scene.add(ambientLight);

    // Load the STL file
    const loader = new THREE.STLLoader();
    loader.load('./path/to/your-large-file.stl', function (geometry) {
        geometry.center();  // Center the geometry

        // Use MeshStandardMaterial (basic PBR material) for default lighting
        const material = new THREE.MeshStandardMaterial({
            color: 0x606060,   // Grey color
            roughness: 0.8,    // Default roughness for diffuse reflection
            metalness: 0       // No metallic reflection
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;  // Rotate model to face the camera properly
        mesh.scale.set(0.5, 0.5, 0.5);  // Adjust scale as needed
        scene.add(mesh);

    }, function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function (error) {
        console.error('An error happened', error);
    });

    // Handle window resizing
    window.addEventListener('resize', onWindowResize, false);
    animate();
}

// Function to handle window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();  // Updates the controls
    renderer.render(scene, camera);
}

// Initialize the scene
init();
