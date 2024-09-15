let scene, camera, renderer, controls;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Camera setup with adjusted near and far clipping planes
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0, 0, 20);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;  // Enable shadow casting
    document.getElementById('viewer').appendChild(renderer.domElement);

    // OrbitControls setup
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minDistance = 0.1;
    controls.maxDistance = 100;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);  // Increased intensity
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);  // Brighter directional light
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;  // Enable shadows
    directionalLight.shadow.bias = -0.001;  // Reduce shadow artifacts
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);  // Brighter point light
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);  // Soft overhead lighting
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // Load the STL file
    const loader = new THREE.STLLoader();
    loader.load('./hand.stl', function (geometry) {
        geometry.center();

        const material = new THREE.MeshStandardMaterial({
            color: 0x606060,
            roughness: 0.5,  // Adjust roughness to make the surface more reflective
            metalness: 0.3   // Increase metalness for a more metallic look
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.scale.set(0.5, 0.5, 0.5);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
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
