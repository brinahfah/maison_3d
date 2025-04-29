// Initialisation de la scène, caméra et renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Lumière pour illuminer la scène
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

// Position de la caméra (vue aérienne diagonale)
camera.position.set(30, 50, 30);
camera.lookAt(0, 0, 0);


function createBuilding(x, z) {
    const height = Math.random() * 10 + 5; // Hauteur aléatoire entre 5 et 15 unités
    const springColors = [0xFFDAB9, 0xFFE4E1, 0xFFFACD, 0xE6E6FA, 0x98FB98]; // Palette pastel de printemps
    const building = new THREE.Mesh(
        new THREE.BoxGeometry(3, height, 3),
        new THREE.MeshStandardMaterial({ color: springColors[Math.floor(Math.random() * springColors.length)] })
);
    
    building.position.set(x, height / 2, z); // Centrer verticalement
    scene.add(building);
}

// Ajouter plusieurs bâtiments
for (let i = 0; i < 15; i++) {
    createBuilding(Math.random() * 40 - 20, Math.random() * 40 - 20);
}

function createRoad() {
    const road = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 10), // Une route longue
        new THREE.MeshStandardMaterial({ color: 0xCCCCCC }) // Gris clair
    );
    road.rotation.x = -Math.PI / 2; // Place le plan à plat sur le sol
    scene.add(road);
}

// Ajouter une route principale
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
    cars.push(body); // Ajouter la voiture au tableau pour l'animer
}

// Ajouter plusieurs voitures sur la route
for (let i = 0; i < 5; i++) {
    createCar(Math.random() * 40 - 20, Math.random() * 5 - 2.5);
}

function animateCars() {
    cars.forEach(car => {
        car.position.x += 0.1; // Déplacement horizontal
        if (car.position.x > 25) {
            car.position.x = -25; // Réinitialiser la position
        }
    });
}

function animate() {
    requestAnimationFrame(animate);
    animateCars(); // Animation des voitures
    renderer.render(scene, camera); // Rendu de la scène
}

animate();

function createRoadGrid() {
    const roadWidth = 10;
    for (let i = -50; i <= 50; i += 20) {
        // Routes horizontales
        const horizontalRoad = new THREE.Mesh(
            new THREE.PlaneGeometry(100, roadWidth),
            new THREE.MeshStandardMaterial({ color: 0x008000 }) // Vert
        );
        horizontalRoad.rotation.x = -Math.PI / 2;
        horizontalRoad.position.set(0, 0, i);
        scene.add(horizontalRoad);

        // Routes verticales
        const verticalRoad = new THREE.Mesh(
            new THREE.PlaneGeometry(roadWidth, 100),
            new THREE.MeshStandardMaterial({ color: 0xCCCCCC }) // Gris clair
        );
        verticalRoad.rotation.x = -Math.PI / 2;
        verticalRoad.position.set(i, 0, 0);
        scene.add(verticalRoad);
    }
}

const leaves = new THREE.Mesh(
    new THREE.ConeGeometry(0.8, 1.5, 8),
    new THREE.MeshStandardMaterial({ color: Math.random() * 0x008000 + 0x00FF00 }) // Tons de vert vif
);

const flower = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 8, 8),
    new THREE.MeshStandardMaterial({ color: Math.random() * 0xFFFF00 + 0xFF69B4 }) // Tons roses et jaunes
);

scene.background = new THREE.Color(0x87CEEB); // Bleu clair


// Ajouter un réseau routier
createRoadGrid();
for (let i = -50; i <= 50; i += 20) { // Espacement augmenté
    for (let j = -50; j <= 50; j += 20) {
        createBuilding(i, j);
    }
}



// Étendre la ville avec une grille de bâtiments
createBuildingGrid();

function createTreeGrid() {
    for (let i = -50; i <= 50; i += 15) {
        for (let j = -50; j <= 50; j += 15) {
            createTree(i + Math.random() * 5 - 2.5, j + Math.random() * 5 - 2.5); // Positionnement aléatoire autour de la grille
        }
    }
}

// Ajouter des arbres dans toute la ville
createTreeGrid();

camera.position.set(0, 150, 0); // Vue du dessus à 150 unités de hauteur
camera.lookAt(0, 0, 0); // Orientation vers le centre de la ville

function createCarsOnRoads() {
    for (let i = -50; i <= 50; i += 20) {
        for (let j = -50; j <= 50; j += 10) {
            createCar(i + Math.random() * 5, j); // Positionnement aléatoire sur les routes
        }
    }
}

// Ajouter des voitures animées
createCarsOnRoads();

function animateCars() {
    cars.forEach(car => {
        car.position.x += 0.3; // Déplacement horizontal rapide
        if (car.position.x > 50) {
            car.position.x = -50; // Réinitialiser la position après avoir traversé la ville
        }
    });
}

function animate() {
    requestAnimationFrame(animate);
    animateCars();
    renderer.render(scene, camera);
}

animate();

