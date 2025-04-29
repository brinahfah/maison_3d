// Initialisation de la scène, caméra et renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajouter une lumière
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

function createHouse(x, z) {
    const house = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshStandardMaterial({ color: 0x8B4513 })
    );
    house.position.set(x, 1, z);

    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(2, 1, 4),
        new THREE.MeshStandardMaterial({ color: 0xB22222 })
    );
    roof.position.set(x, 3, z);

    scene.add(house);
    scene.add(roof);
}

// Ajouter plusieurs maisons
for (let i = 0; i < 10; i++) {
    createHouse(Math.random() * 20 - 10, Math.random() * 20 - 10);
}

function createRoad() {
    const road = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 5),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    road.rotation.x = -Math.PI / 2;
    scene.add(road);
}

// Ajouter une route au centre
createRoad();

function createTree(x, z) {
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 1),
        new THREE.MeshStandardMaterial({ color: 0x8B4513 })
    );
    trunk.position.set(x, 0.5, z);

    const leaves = new THREE.Mesh(
        new THREE.ConeGeometry(0.8, 1.5, 8),
        new THREE.MeshStandardMaterial({ color: 0x228B22 })
    );
    leaves.position.set(x, 1.8, z);

    scene.add(trunk);
    scene.add(leaves);
}

// Ajouter plusieurs arbres
for (let i = 0; i < 15; i++) {
    createTree(Math.random() * 20 - 10, Math.random() * 20 - 10);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

function createCar(x, z) {
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1, 1),
        new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff }) // Couleur aléatoire
    );
    body.position.set(x, 0.5, z);

    const wheelGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 32);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

    const wheels = [];
    for (let i = 0; i < 4; i++) {
        wheels[i] = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheels[i].rotation.z = Math.PI / 2; // Rotation pour que les roues soient horizontales
    }
    wheels[0].position.set(x - 0.8, 0.2, z - 0.5);
    wheels[1].position.set(x - 0.8, 0.2, z + 0.5);
    wheels[2].position.set(x + 0.8, 0.2, z - 0.5);
    wheels[3].position.set(x + 0.8, 0.2, z + 0.5);

    scene.add(body, ...wheels);
}

// Ajouter des voitures à des positions aléatoires
for (let i = 0; i < 5; i++) {
    createCar(Math.random() * 20 - 10, Math.random() * 20 - 10);
}

function createHouse(x, z) {
    const house = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff }) // Couleur aléatoire
    );
    house.position.set(x, 1, z);

    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(2, 1, 4),
        new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff }) // Couleur aléatoire
    );
    roof.position.set(x, 3, z);

    scene.add(house);
    scene.add(roof);
}

// Ajouter plusieurs maisons
for (let i = 0; i < 10; i++) {
    createHouse(Math.random() * 20 - 10, Math.random() * 20 - 10);
}

function createTree(x, z) {
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 1),
        new THREE.MeshStandardMaterial({ color: 0x8B4513 }) // Couleur du tronc
    );
    trunk.position.set(x, 0.5, z);

    const leaves = new THREE.Mesh(
        new THREE.ConeGeometry(0.8, 1.5, 8),
        new THREE.MeshStandardMaterial({ color: Math.random() * 0x00ff00 + 0x007700 }) // Tons de vert
    );
    leaves.position.set(x, 1.8, z);

    scene.add(trunk);
    scene.add(leaves);
}

// Ajouter plusieurs arbres
for (let i = 0; i < 15; i++) {
    createTree(Math.random() * 20 - 10, Math.random() * 20 - 10);
}

function createRoad() {
    const road = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 5),
        new THREE.MeshStandardMaterial({ color: 0x555555 }) // Gris clair
    );
    road.rotation.x = -Math.PI / 2;
    scene.add(road);
}

// Ajouter une route
createRoad();

function animateCars() {
    scene.children.forEach((child) => {
        if (child.geometry?.type === 'BoxGeometry' && child.material.color) { // Identifier les voitures
            child.position.x += 0.05; // Déplacement des voitures
            if (child.position.x > 20) {
                child.position.x = -20; // Réinitialiser la position
            }
        }
    });
}

function animate() {
    requestAnimationFrame(animate);
    animateCars(); // Animation des voitures
    renderer.render(scene, camera);
}

animate();



