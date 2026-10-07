// VERSION VIEJA var createError = require('http-errors');
import createError from 'http-errors';

// VERSION VIEJA var express = require('express');
import express from 'express';

// VERSION VIEJITA var path = require('path');
import path from 'node:path';

// VERSION VIEJA var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';

// VERSION VIEJA var logger = require('morgan');
import logger from 'morgan';

// Herramienta de depuracion
import Debug from 'debug';


// Import para crear __dirname en ES Modules
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

//Importando el template engine de Handlebars
import hbs from 'hbs';

// Inicializa debug con el namespace deseado (una sola declaración)
const debug = Debug('dwssr-2026b:app');

// Creando las variables para __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Import de dependencias relativas de tu proyecto
import indexRouter from '#routes/index.js'; //forma con alias
import usersRouter from '#routes/users.js'; //forma con alias

//Importando el registrador del Helper 
import { registerViteHelper } from './lib/vite.js';

// Mensaje de log al inicializar
debug("🪓 Creando backend");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//Register Helper
registerViteHelper(hbs);

//Archivos estaticos de Produccion
if (process.env.NODE_ENV == 'production') {
app.use(express.static(path.join(__dirname, '..', 'dist')));
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configurar la carpeta de archivos estaticos
debug("💾 Configurando carpeta de archivos estaticos");
app.use(express.static(path.join(__dirname, '..', 'public')));

// Registrando rutas 
debug("🛣️ Registrando rutas");
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;