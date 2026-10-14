import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1.- Ignora los build del frontend
{
  ignores:[
    "dist/**/*", //ignora carpeta de dist
    "node_modules/**" //ignora carpeta de node_modules
  ]
},
  // 2.- Configuracion del backend
  { files: ["server/**/*.{js,mjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { 
        ...globals.node
      } 
    }, 
rules: {
  "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
},
  // 2.1.- Configuracion de vite
  { files: ["vite.config.js"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { 
        ...globals.node
      } 
    } 
  },
  // 3.- Configuracion del frontend
  { files: ["src/**/*.{js,mjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { 
        ...globals.browser
      } 
    } 
  },
  // 4.- Opcional si hay javascript en public
  { files: ["public/**/*.{js,mjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { 
        ...globals.browser
      } 
    } 
  },
]);
