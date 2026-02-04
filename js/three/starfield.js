// ========================================
// COSMIC EAR - Starfield
// ========================================

/**
 * Crea un campo de estrellas 3D
 * @param {number} count - Número de estrellas
 * @returns {THREE.Points} - Objeto de estrellas para agregar a la escena
 */
export function createStarfield(count = 2000) {
    const THREE = window.THREE;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Generar posiciones y colores aleatorios
    for (let i = 0; i < count; i++) {
        // Distribución esférica alrededor del origen
        const radius = 500 + Math.random() * 1000;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        // Colores blancos con ligeras variaciones
        const brightness = 0.5 + Math.random() * 0.5;
        colors[i * 3] = brightness;
        colors[i * 3 + 1] = brightness;
        colors[i * 3 + 2] = brightness;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    return new THREE.Points(geometry, material);
}
