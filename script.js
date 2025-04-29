// Initialisation de la scène, de la caméra et du renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lumière pour éclairer la scène
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Position de la caméra
camera.position.set(30, 50, 30); // La caméra est en diagonale en haut
camera.lookAt(0, 0, 0); // La caméra reste orientée vers le 

function animateCamera() {
    const time = Date.now() * 0.0005; // Temps pour l'animation
    camera.position.x = Math.sin(time) * 50; // Rotation sur l'axe X
    camera.position.z = Math.cos(time) * 50; // Rotation sur l'axe Z
    camera.lookAt(0, 0, 0); // Toujours regarder le centre
}

function animate() {
    requestAnimationFrame(animate);
    animateCamera(); // Ajouter l'animation de la caméra
    renderer.render(scene, camera);
}

animate();

function createBuilding(x, z) {
    const height = Math.random() * 10 + 5; // Hauteur aléatoire entre 5 et 15 unités

    const building = new THREE.Mesh(
        new THREE.BoxGeometry(3, height, 3),
        new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff }) // Couleur aléatoire
    );
    building.position.set(x, height / 2, z); // Positionner au centre verticalement

    scene.add(building);
}

// Ajouter plusieurs bâtiments aléatoires
for (let i = 0; i < 15; i++) {
    createBuilding(Math.random() * 20 - 10, Math.random() * 20 - 10);
}

const colors = [0x1E90FF, 0x32CD32, 0xFFD700, 0xFF4500];
const buildingColor = colors[Math.floor(Math.random() * colors.length)];

function animateBuildings() {
    scene.children.forEach((child) => {
        if (child.geometry?.type === 'BoxGeometry') {
            child.scale.y = 1 + Math.sin(Date.now() * 0.001); // Ajustement de la hauteur
        }
    });
}

function animate() {
    requestAnimationFrame(animate);
    animateBuildings(); // Animation des bâtiments
    renderer.render(scene, camera);
}
animate();