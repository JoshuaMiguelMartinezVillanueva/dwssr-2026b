// Biblioteca File Stream
import fs from 'node:fs';

// Importamos biblioteca de rutas y dirname
import path, { dirname } from 'node:path';

import { fileURLToPath } from 'node:url';

// Crear variables de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** 
 * Helper para Handlebars que genera las etiquetas de Vite 
 * EN DESARROLLO: Conecta al servidor de desarrollo de Vite 
 * EN PRODUCCION: Usa los compilados de Vite 
*/
export function viteAssets() {
  // Obtener modo de ejecucion
  const isDev = process.env.NODE_ENV !== 'production';

  // Rescatando la URL del servidor de desarrollo de Vite
  const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173';
 
  // Si estamos en modo de desarrollo
  if (isDev) {
    // En desarrollo cargamos los archivos 
    // del front-end directamente del servidor de desarrollo VITE 
    return `
    <script type="module" src="${viteDevServer}/@vite/client"></script>
    <script type="module" src="${viteDevServer}/main.js"></script>
    `;
  }

  // EN PRODUCCION leemos el manifest 
  // y generamos las etiquetas finales de produccion
  const manifestPath = path.join(__dirname, '..', '..', 'dist', '.vite', 'manifest.json');

  // Si no existe el manifest
  if (!fs.existsSync(manifestPath)) {
    console.warn("Vite manifest not found. Run 'npm run build'");
    return '';
  }

  // Leyendo y parseando a JSON el archivo 
  // de manifiesto que genera vite en la compilacion
  // de los archivos del front-end
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  // Obteniendo la ruta del puerto de entrada del front-end
  const mainEntry = manifest['main.js'];

  // Guarda el main.js
  if (!mainEntry) {
    console.warn("Archivo main.js no esta disponible en el manifest de Vite. Verifica la configuracion de Vite");
    return '';
  }

  let tags = '';

  // CSS Files
  if (mainEntry.css) {
    mainEntry.css.forEach(cssFile => {
      tags += `<link rel="stylesheet" href="/${cssFile}">\n`;
    });
  }

  // JS Files
  tags += `<script type="module" src="/${mainEntry.file}" defer></script>\n`;
  return tags;
}

/*
 * Funcion registradora del helper de Vite para Handlebars 
 */
export function registerViteHelper(hbs) {
  hbs.registerHelper('viteAssets', () => {
    // Sanitizando la salida del Helper
    return new hbs.SafeString(viteAssets());
  });
}