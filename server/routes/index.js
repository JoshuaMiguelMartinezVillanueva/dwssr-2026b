import express from 'express';
const router = express.Router();

let cont = 0;
const numbers = []
/* GET home page. */
router.get('/', (req, res, next) => { 
  cont++;
  numbers.push(cont);
  res.render('index', { 
    title: 'EL MAS TUTSI PINK: ANDREA GARCIA MORENO YA SE ACERCA LA NAVIDAD DIA DE FELICIDAD Y MUCHAS TOSTADAS DE TINGA Y DIA DE MORIDOS PARA COMER PAN DE MORIDO',
    counter: cont,
    numbers: numbers
  });
});

//module.exports = router;
export default router;