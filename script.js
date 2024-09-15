let scene, camera, renderer, controls;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Camera setup with adjusted near and far clipping planes
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0, 0, 20);  // Adjust camera position to a comfortable starting point

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('viewer').appendChild(renderer.domElement);

    // OrbitControls setup with limits
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.panSpeed = 1.0;

    // Zoom limits to prevent disappearing
    controls.minDistance = 0.5;    // Prevent zooming in too close
    controls.maxDistance = 100;    // Allow zooming out up to this distance

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Add a point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Load the STL file
    const loader = new THREE.STLLoader();
    loader.load('./path/to/your-large-file.stl', function (geometry) {
        geometry.center();

        const material = new THREE.MeshStandardMaterial({ color: 0x606060 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.scale.set(0.5, 0.5, 0.5);

        scene.add(mesh);

        // Calculate the bounding box and set the camera to focus on the model
        const boundingBox = new THREE.Box3().setFromObject(mesh);
        const center = boundingBox.getCenter(new THREE.Vector3());
        const size = boundingBox.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

        camera.position.z = center.z + cameraZ * 1.5;  // Adjust the camera based on model size
        camera.lookAt(center);  // Ensure camera is looking at the model

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
    controls.update();  // Updates the controls (including panning, zooming, rotating)
    renderer.render(scene, camera);
}

// Initialize the scene
init();
