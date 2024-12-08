import * as THREE from "three";

// Canvas constructor
function createSceneForCanvas(canvas, index) {
  const sizes = {
    width: canvas.clientWidth,
    height: canvas.clientHeight,
  };
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    100,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.z = 2;

  scene.add(camera);

  const geometry = [
    new THREE.TorusGeometry(0.5, 0.2, 16, 32),
    new THREE.BoxGeometry(1, 1, 1, 8, 8, 8),
    new THREE.SphereGeometry(1, 16, 32),
    new THREE.CylinderGeometry(1, 1, 1.4, 32, 32),
    new THREE.ConeGeometry(1, 1.5, 32),
  ];
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });
  const object = new THREE.Mesh(geometry[index], material);
  scene.add(object);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const tick = () => {
    object.rotation.y = 0.02;
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };

  tick();

  return { scene, camera, object };
}

// Utility fn
function getVisibilityPercentage(card) {
  const rect = card.getBoundingClientRect();
  const cardHeight = rect.height;

  // Get visible card
  const visibleHeight = Math.max(
    0,
    Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top)
  );

  // Get visiblity percentage
  const visibilityPercentage = visibleHeight / cardHeight;

  return visibilityPercentage;
}

// Cards init
const cards = document.querySelectorAll(".card");
const scenes = [];

cards.forEach((card, index) => {
  const canvas = card.querySelector(`#canvas-index-${index}`);
  if (canvas) {
    const { scene, camera, object } = createSceneForCanvas(canvas, index);
    scenes.push({ card, scene, camera, object });
  }
});

// Update current object position by visibility
function updatePositionBasedOnVisibility() {
  scenes.forEach(({ card, scene, camera, object }, index) => {
    const visibility = getVisibilityPercentage(card);
    object.position.x = -10 + visibility * 10; // X axis from -10 to 10

  });
}

// Up button
const scrollToTopButton = document.getElementById("scrollToTop");
const navbar = document.querySelector("nav");
scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Scroll event handler
window.addEventListener("scroll", () => {
  scrollToTopButton.style.display =
    window.scrollY > navbar.offsetHeight ? "block" : "none";
  updatePositionBasedOnVisibility();
});


