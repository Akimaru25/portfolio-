// Variables pour gérer le carrousel
let index = 0;
const carousel = document.getElementById('carousel');
const images = carousel.children;
const totalImages = images.length;

// Fonction pour mettre à jour la position du carrousel
function updateCarousel() {
    const offset = -index * 100; // Déplacement basé sur la largeur d'une image (100%)
    carousel.style.transform = `translateX(${offset}%)`;
}

// Fonction pour ajuster la hauteur du carrousel en fonction de l'image active
function adjustCarouselHeight() {
    const activeImage = images[index]; // Image actuellement visible
    const wrapper = document.getElementById('carousel-wrapper');
    const imageHeight = activeImage.naturalHeight * (wrapper.offsetWidth / activeImage.naturalWidth); // Calculer la hauteur de l'image selon sa largeur
    wrapper.style.height = `${imageHeight}px`; // Ajuste la hauteur du wrapper
}

// Bouton "Suivant"
document.getElementById('next').addEventListener('click', () => {
    index = (index + 1) % totalImages; // Passe à l'image suivante (revient à la première après la dernière)
    updateCarousel();
    adjustCarouselHeight(); // Ajuste la hauteur après le changement d'image
});

// Bouton "Précédent"
document.getElementById('prev').addEventListener('click', () => {
    index = (index - 1 + totalImages) % totalImages; // Passe à l'image précédente (revient à la dernière après la première)
    updateCarousel();
    adjustCarouselHeight(); // Ajuste la hauteur après le changement d'image
});

// Ajuste la hauteur au chargement initial
window.addEventListener('load', adjustCarouselHeight);
