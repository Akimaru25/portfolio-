// Fonction pour générer des chiffres binaires
function createBinary() {
    const binaryWrapper = document.getElementById('binary-wrapper');
    
    // Vérifie s'il y a moins de 15 chiffres
    if (binaryWrapper.children.length < 15) {
        const binary = document.createElement('span');
        binary.classList.add('binary');

        // Choix aléatoire entre '0' et '1'
        binary.textContent = Math.random() > 0.5 ? '0' : '1';

        // Calculer une position aléatoire pour chaque chiffre
        let randomX = Math.random() * 100; // Position horizontale en pourcentage
        let randomY = Math.random() * 50;  // Limite la position verticale à la moitié supérieure (0-50%)

        // Vérifie la collision avant d'ajouter
        let isColliding = true;
        let retries = 0;

        while (isColliding && retries < 10) {  // Limiter à 10 tentatives pour éviter boucle infinie
            isColliding = false;

            // Vérifier la collision avec les autres chiffres binaires
            for (let i = 0; i < binaryWrapper.children.length; i++) {
                const existingBinary = binaryWrapper.children[i];
                const existingRect = existingBinary.getBoundingClientRect();
                const newRect = {
                    left: randomX * binaryWrapper.offsetWidth / 100,
                    top: randomY * binaryWrapper.offsetHeight / 100,
                    right: (randomX + 5) * binaryWrapper.offsetWidth / 100,  // 5% de la largeur de la fenêtre pour la taille du chiffre
                    bottom: (randomY + 5) * binaryWrapper.offsetHeight / 100  // 5% de la hauteur de la fenêtre pour la taille du chiffre
                };

                // Vérification de la collision
                if (isCollision(newRect, existingRect)) {
                    isColliding = true;
                    randomX = Math.random() * 100;  // Nouveau placement aléatoire
                    randomY = Math.random() * 50;   // Limite à nouveau la position verticale
                    retries++;
                    break;
                }
            }
        }

        // Appliquer les positions et ajouter le chiffre
        binary.style.left = `${randomX}%`;
        binary.style.top = `${randomY}%`;

        // Calculer un déplacement aléatoire pour chaque chiffre
        const moveX = (Math.random() - 0.5) * 2; // Déplacement horizontal aléatoire
        const moveY = (Math.random() - 0.5) * 2; // Déplacement vertical aléatoire

        // Ajouter les propriétés CSS pour l'animation
        binary.style.setProperty('--move-x', `${moveX}px`);
        binary.style.setProperty('--move-y', `${moveY}px`);

        // Ajouter le chiffre à la page
        binaryWrapper.appendChild(binary);
    }
}

// Vérifie si un chiffre binaire entre en collision avec un autre
function isCollision(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

// Fonction pour mettre à jour la position des chiffres
function updateBinaryPositions() {
    const binaryWrapper = document.getElementById('binary-wrapper');
    const binaries = binaryWrapper.children;

    for (let binary of binaries) {
        const rect = binary.getBoundingClientRect();
        let moveX = parseFloat(getComputedStyle(binary).getPropertyValue('--move-x'));
        let moveY = parseFloat(getComputedStyle(binary).getPropertyValue('--move-y'));

        // Mettre à jour la position
        let newX = rect.left + moveX;
        let newY = rect.top + moveY;

        // Vérifier les collisions avec les autres chiffres
        for (let otherBinary of binaries) {
            if (binary === otherBinary) continue; // Ne pas vérifier la collision avec soi-même

            const otherRect = otherBinary.getBoundingClientRect();

            if (isCollision(rect, otherRect)) {
                // Si collision détectée, inverser les directions des deux chiffres
                moveX = -moveX;
                moveY = -moveY;

                // Inverser les directions de l'autre chiffre aussi
                let otherMoveX = parseFloat(getComputedStyle(otherBinary).getPropertyValue('--move-x'));
                let otherMoveY = parseFloat(getComputedStyle(otherBinary).getPropertyValue('--move-y'));
                otherMoveX = -otherMoveX;
                otherMoveY = -otherMoveY;

                // Mettre à jour les mouvements
                otherBinary.style.setProperty('--move-x', `${otherMoveX}px`);
                otherBinary.style.setProperty('--move-y', `${otherMoveY}px`);
            }
        }

        // Vérifier les collisions avec les bords du bandeau
        if (newX < binaryWrapper.getBoundingClientRect().left || newX + rect.width > binaryWrapper.getBoundingClientRect().right) {
            moveX = -moveX; // Inverser la direction du mouvement horizontal
        }
        if (newY < binaryWrapper.getBoundingClientRect().top || newY + rect.height > binaryWrapper.getBoundingClientRect().bottom) {
            moveY = -moveY; // Inverser la direction du mouvement vertical
        }

        // Appliquer les nouveaux mouvements
        binary.style.left = `${rect.left + moveX}px`;
        binary.style.top = `${rect.top + moveY}px`;

        // Mettre à jour les propriétés de mouvement
        binary.style.setProperty('--move-x', `${moveX}px`);
        binary.style.setProperty('--move-y', `${moveY}px`);
    }
}

// Créer des chiffres binaires toutes les 500ms, sans dépasser 15
setInterval(createBinary, 500);

// Mettre à jour les positions des chiffres toutes les 50ms
setInterval(updateBinaryPositions, 50);
