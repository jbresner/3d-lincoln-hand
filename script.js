let scene, camera, renderer, controls;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0, 0, 20);  // Position the camera

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('viewer').appendChild(renderer.domElement);

    // OrbitControls setup
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enablePan = true;

    // Ambient Light (provides uniform soft lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);  // Increased intensity
    scene.add(ambientLight);

    // Directional Light (acts like sunlight, positioned to illuminate the model)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);  // Light from above and to the side
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add another Point Light to brighten the dark side
    const pointLight2 = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight2.position.set(-5, -5, -5);  // Opposite side of the model
    scene.add(pointLight2);

    // Hemisphere Light (provides natural light from above and ground reflection from below)
    const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.8);  // Sky and ground colors
    hemiLight.position.set(0, 20, 0);  // Positioned above the model
    scene.add(hemiLight);

    // Load the STL file
    const loader = new THREE.STLLoader();
    loader.load('./hand.stl', function (geometry) {
        geometry.center();  // Center the geometry

        // Material with lower roughness and higher metalness to reflect more light
        const material = new THREE.MeshStandardMaterial({
            color: 0x606060,
            roughness: 0.3,  // Lower roughness for smoother reflection
            metalness: 0.5   // Higher metalness for more reflective surfaces
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;  // Rotate model for proper viewing
        mesh.scale.set(0.5, 0.5, 0.5);  // Adjust scale as necessary
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
    controls.update();  // Update controls for smooth interaction
    renderer.render(scene, camera);
}

// Initialize the scene
init();
