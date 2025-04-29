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
camera.position.set(0, 50, 0); // La caméra est à 50 unités au-dessus de la scène
camera.lookAt(0, 0, 0); // La caméra regarde le centre de la scène

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

function createRoad() {
    const road = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 10), // Une grande route
        new THREE.MeshStandardMaterial({ color: 0x333333 }) // Gris foncé
    );
    road.rotation.x = -Math.PI / 2; // Place le plan à plat sur le sol

    // Ajout des lignes blanches
    const line = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 0.2),
        new THREE.MeshStandardMaterial({ color: 0xffffff }) // Blanc
    );
    line.rotation.x = -Math.PI / 2;
    line.position.y = 0.01; // Légèrement au-dessus de la route pour éviter les artefacts visuels

    scene.add(road);
    scene.add(line);
}

// Ajouter la route
createRoad();

const cars = []; // Tableau pour stocker les voitures

function createCar(x, z) {
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1, 1),
        new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff }) // Couleur aléatoire
    );
    body.position.set(x, 0.5, z);

    // Roues
    const wheelGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 32);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Noir

    const wheels = [];
    for (let i = 0; i < 4; i++) {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2; // Rotation horizontale des roues
        wheels.push(wheel);
    }
    wheels[0].position.set(x - 0.8, 0.2, z - 0.5);
    wheels[1].position.set(x - 0.8, 0.2, z + 0.5);
    wheels[2].position.set(x + 0.8, 0.2, z - 0.5);
    wheels[3].position.set(x + 0.8, 0.2, z + 0.5);

    wheels.forEach(wheel => scene.add(wheel)); // Ajouter les roues à la scène
    scene.add(body); // Ajouter le corps de la voiture à la scène

    cars.push({ body, wheels }); // Ajouter la voiture au tableau pour l'animer plus tard
}

// Ajouter plusieurs voitures sur la route
for (let i = 0; i < 5; i++) {
    createCar(Math.random() * 40 - 20, Math.random() * 5 - 2.5); // Position aléatoire sur la route
}

function animateCars() {
    cars.forEach(car => {
        car.body.position.x += 0.1; // Déplacement horizontal

        // Réinitialiser la position lorsqu'elles sortent de la route
        if (car.body.position.x > 25) {
            car.body.position.x = -25;
        }
    });
}

camera.position.set(30, 50, 30); // Vue diagonale depuis le dessus
camera.lookAt(0, 0, 0); // Orientation vers le centre de la ville

function animate() {
    requestAnimationFrame(animate);
    animateCars(); // Animation des voitures
    renderer.render(scene, camera); // Rendu de la scène
}

animate();
