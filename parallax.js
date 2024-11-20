// Sélection des éléments nécessaires
const carouselSection = document.getElementById('carousel-section');
const projectsSection = document.getElementById('projects-section');
const scrollArrow = document.getElementById('scroll-arrow');
const scrollText = document.getElementById('scroll-text');

// Effet de défilement parallaxe
window.addEventListener('scroll', () => {
    // Calculer la position de défilement
    const scrollPosition = window.scrollY;

    // Activer la visibilité du carrousel lorsque l'utilisateur défile
    if (scrollPosition > 85) {
        carouselSection.classList.add('visible');
        scrollText.style.display = 'none'; // Masquer le texte "Scroll down"
        scrollArrow.style.display = 'none'; // Masquer la flèche
    } else {
        carouselSection.classList.remove('visible');
        scrollText.style.display = 'block'; // Rendre visible le texte "Scroll down"
        scrollArrow.style.display = 'block'; // Rendre visible la flèche
    }

    // Désactiver la visibilité du carrousel si trop loin
    if (scrollPosition > 400) {
        carouselSection.classList.remove('visible');
    }

    // Activer la visibilité des projets lorsque l'utilisateur défile plus loin
    if (scrollPosition > 400) {
        projectsSection.classList.add('visible');
    } else {
        projectsSection.classList.remove('visible');
    }
});

// Événement de clic pour la flèche
scrollArrow.addEventListener('click', () => {
    // Faire défiler la page jusqu'au carrousel
    window.scrollTo({
        top: 100,  // Descendre jusqu'à la section carrousel
        behavior: 'smooth'
    });
});
