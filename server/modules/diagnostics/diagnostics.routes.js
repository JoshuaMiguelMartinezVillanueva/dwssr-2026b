import express from 'express';
import {
  testLogs,
  testException,
  testRejection
} from "./diagnostics.controller.js"

const diagRouter = express.Router();

// test de viveles de logs
// GET /test-logs

diagRouter.get('/test-logs',testLogs);

//Prueba de manejo de exceptions y rejections
//Acceso solo en modo de desarrollo


  //prueba de exceptions
  // GET /test-exceptions
  diagRouter.get('/test-exception', testException);
  //rueba de la rejaction
  //GET /test-rejection
  diagRouter.get('/test-rejection', testRejection);

export default diagRouter;