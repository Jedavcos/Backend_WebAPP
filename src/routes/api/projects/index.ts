import express, { response } from 'express';
const router = express.Router();

import {
  createProjects,
  getProjects,
  updateProject,
  deleteProject,
  getProject,
} from '@libs/projects/projects';

router.get('/', (_req, res) => {
  res.json({ version: 1, scope: 'projects' });
});

router.get('/echo/:msg', (req, res) => {
  const { msg } = req.params;
  const { variable1 = 'Hola', variable2 = 'Mundo' } = req.query;
  res.json({ msg, variable1, variable2 });
});

router.post('/echo2', (req, res) => {
  const { variable1 = 'Hola', variable2 = 'Mundo' } = req.body;
  res.json({ variable1, variable2 });
});
//Body se permite en el put y en el post

router.get('/all', async (_req, res) => {
  try {
    const projects = await getProjects();
    return res.json(projects);
  } catch (ex: any) {
    return res.status(500).json({ error: ex?.message });
    /*Error 500: Error interno del servidor, mensaje sutil para el usuario,
         para que no sepa exactamente donde falló, por privacidad y seguridad*/
  }
});

/*router.get('/all', (_req, res) => {
    getProjects()//Viene como respuestas, como parametro de un handler
        .then(projects => res.json(projects))//La promesa que devuelve proyecto lo devuelve y cerramos el json project
        .catch(ex => res.status(500).json({error: ex?.message}));//Si hay algún error en la promesa, capturamos y devolvemos el message

    //TENER MUCHO CUIDADO COMO USAR EL THEN Y TENER CUIDADO Y SABER EXACTAMENTE DONDE USARLO, Y COMO SE VAN A MANERJAR LOS PARAMETROS
    //Hoy en día esta forma casi no se usa
});*/

router.get('/byid/:id', async (req, res) => {
  try {
    const { id = '' } = req.params;
    const project = await getProject(id);
    return res.json(project);
  } catch (ex: any) {
    return res.status(500).json({ error: ex?.message });
    /*Error 500: Error interno del servidor, mensaje sutil para el usuario,
         para que no sepa exactamente donde falló, por privacidad y seguridad*/
  }
});

router.post('/new', async (req, res) => {
  try {
    const { name = '', description = '', isActive = false } = req.body;
    const newProject = { name, description, isActive: isActive && true };
    const createdProjects = await createProjects(newProject);
    return res.json(createdProjects);
  } catch (ex: any) {
    return res.status(500).json({ error: ex?.message });
    /*Error 500: Error interno del servidor, mensaje sutil para el usuario,
         para que no sepa exactamente donde falló, por privacidad y seguridad*/
  }
});

router.put('/upd/:id', async (req, res) => {
  try {
    const { id = '' } = req.params; //Buscamos el id dentro de params
    const { name = '', description = '', isActive = false } = req.body; //Estos son los datos a trabajar solicitados en el body
    const updatedProject = await updateProject(id, {
      name,
      description,
      isActive: isActive && true,
    });
    //Parcial con el nombre, la descripción e isActive y convertimos este ultimo a booleano porque devolverá cadena de texto y no es eso lo que queremos
    return res.json(updatedProject);
  } catch (ex: any) {
    return res.status(500).json({ error: ex?.message });
    /*Error 500: Error interno del servidor, mensaje sutil para el usuario,
         para que no sepa exactamente donde falló, por privacidad y seguridad*/
  }
});

router.delete('/del/:id', async (req, res) => {
  try {
    const { id = '' } = req.params; //Buscamos el id dentro de params
    const deletedProject = await deleteProject(id); //Con esto borramos el proyecto
    return res.json({ deleted: deletedProject, id }); //Devolvemos si se borró o no
  } catch (ex: any) {
    return res.status(500).json({ error: ex?.message });
    /*Error 500: Error interno del servidor, mensaje sutil para el usuario,
         para que no sepa exactamente donde falló, por privacidad y seguridad*/
  }
});

/*Datazos

    -Todos los async son promesas: Solo hay dos opciones
        1. Succes: Que funciona
        2. Error: NO funciona
    Cuando usamos el await los errores son excepciones. 

    Entonces caputuramos estos errores en un try catch

    -Del objeto response que tiene express, el método status permite definir los valores o status HTML, que va desde
    200, 202, 300, 302, 303: Redireccionamiento
    400s: no se encuentran o no autirzado, no tiene acceso aunque si esté autorizado
    401: Forbidden o unathorized
    403: Forbidden, no se le permite acceso aunque esté autenticado
    404: No se encuentra el recurso.
    500s: erorres de servidor

*/

export default router;
