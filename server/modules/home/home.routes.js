import express from 'express';
//Importando la accion que quiero enrutar
import renderHome from './home.controller.js';
//Creando un enrutador de express
const homeRouter = express.Router();
//Importando Action Methods del controlador Home

//GET de la raiz "/"
homeRouter.get('/', renderHome);
///completarrrrrrrr!!!!!!
export default homeRouter;