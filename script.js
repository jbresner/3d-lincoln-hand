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

    const directionalLight =


