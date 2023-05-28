import express from 'express';
const router  = express.Router();

import apiRoutes from './api';


router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });//cada ruta es un endpoint

 /*Estructura de funcion gorda de JS y TS Entre () dos parametros 
 de los objetos que se van a recibir => para indicar que es funcion gorda
   y entre {} la colección de expresiones que se van a ejecutar. 
   En este caso por estandar en la interfaz de express la ruta que pasemos 
   como función como paramtro para que se ejecute viene con parametros 
   1. solicitud HTTP objeto Json que trae toda la información de la solicuitud HTTP que se hace
   2. OPbjeto que permite como programador Configurar, agregar y definir valor a la respuesta que se le enviará al cliente.
   Este objeto REST un objeto que al final genera una respuesta HTTP que se devuelve al cliente
   3. Next, este cada una de estas funciones generalmente debe retornar un valor o solicitar que el siguiente se ejecute el next es 
   función para saltarse este y hacer la siguiente función ejecutado, esta funcion Next no es necesaria.*/
 router.get('/test', (_req, res) => {
  res.json({msg:'Hello Test!'});
 });

 router.use('/api', apiRoutes);//En la carpeta api estarán todos los proyectos
 //Todos estos endpoints están en cascada

export default router;
