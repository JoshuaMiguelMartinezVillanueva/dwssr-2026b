import logger from '../../lib/winston.js';

export  function testLogs(req, res){
  logger.info('Mensaje de log de prueba INFO');
  logger.warn('Mensaje de log de prueba WARN');
  logger.error('Mensaje de log de prueba ERROR');

  res.json ({ 
    message: 'Logs de prueba generados. Revisa los archivos de log.',
    files: [
      'logs/error.log',
      'logs/readable.log',
      'logs/app-YYYY-MM-DD.log'
    ],
  });
 }

export function testException(req, res){
    res.json({ 
      message: 'Generando excepción de prueba...'
    });
    setTimeout(() => {
      throw new Error("Excepción de prueba lanzada después de 5 segundos");
    },100);
}

export function testRejection(req, res){
 res.json({ 
  message: 'Generando rejection de prueba. revisaa archivo logs/rejections.log...' 
});
//Promesa rechazada sin catch
  Promise.reject(new Error('Rejection de prueba lanzada después de 5 segundos'
  ));
  }  

