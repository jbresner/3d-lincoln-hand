let scene, camera, renderer, controls;

// Function to initialize the scene
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

    // OrbitControls setup for interactivity
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Add a point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create loading indicator
    const loadingElement = document.createElement('div');
    loadingElement.setAttribute('id', 'loading');
    loadingElement.style.position = 'absolute';
    loadingElement.style.top = '10px';
    loadingElement.style.left = '10px';
    loadingElement.style.padding = '10px';
    loadingElement.style.background = 'rgba(0, 0, 0, 0.8)';
    loadingElement.style.color = '#fff';
    loadingElement.style.fontSize = '14px';
    loadingElement.innerHTML = 'Loading...';
    document.body.appendChild(loadingElement);

    // Load the STL file
    const loader = new THREE.STLLoader();
    loader.load('./hand.stl', function (geometry) {
        // Hide loading indicator after successful loading
        loadingElement.style.display = 'none';

        // Create material and mesh
        const material = new THREE.MeshStandardMaterial({ color: 0x606060 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -0.5 * Math.PI;  // Align with Z-axis
        mesh.scale.set(0.1, 0.1, 0.1);  // Adjust scale if necessary
        scene.add(mesh);

    }, function (xhr) {
        // Update loading progress
        const progress = Math.round((xhr.loaded / xhr.total) * 100);
        loadingElement.innerHTML = 'Loading: ' + progress + '%';
    }, function (error) {
        // Handle error
        console.error('An error happened while loading the STL file:', error);
        loadingElement.innerHTML = 'Failed to load the model';
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
    controls.update();  // Only if OrbitControls are enabled
    renderer.render(scene, camera);
}

// Initialize the scene
init();
