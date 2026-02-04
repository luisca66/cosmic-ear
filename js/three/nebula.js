// ========================================
// COSMIC EAR - Nebula
// ========================================

/**
 * Crea una nebulosa con shaders animados
 * @returns {THREE.Mesh} - Objeto de nebulosa para agregar a la escena
 */
export function createNebula() {
    const THREE = window.THREE;

    const geometry = new THREE.SphereGeometry(800, 32, 32);

    const material = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: {
            uTime: { value: 0 }
        },
        vertexShader: `
            varying vec3 vP;
            void main() {
                vP = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            varying vec3 vP;

            float noise(vec3 p) {
                return fract(sin(dot(p, vec3(12.9898, 78.233, 45.543))) * 43758.5453);
            }

            void main() {
                vec3 direction = normalize(vP);

                // Dos capas de ruido para profundidad
                float noise1 = noise(direction * 3.0 + uTime * 0.01);
                float noise2 = noise(direction * 5.0 - uTime * 0.02);

                // Colores de la nebulosa (azules y púrpuras)
                vec3 color = mix(
                    vec3(0.0, 0.03, 0.1),  // Azul oscuro
                    vec3(0.08, 0.0, 0.15), // Púrpura oscuro
                    noise1 * 0.5
                );

                // Añadir toques de cyan
                color = mix(color, vec3(0.0, 0.08, 0.08), noise2 * 0.3);

                gl_FragColor = vec4(color, 1.0);
            }
        `
    });

    return new THREE.Mesh(geometry, material);
}
