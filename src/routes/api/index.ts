//Conmutador, unirá las rutas de security, Proyects y teams

import express from 'express';
const router = express.Router();
import projectsRouters from './projects';
import securityRouters from './security';
import teamsRouters from './teams';

router.use('/projects', projectsRouters);//en este le decimos que en proyects importará iondex
router.use('/security', securityRouters);
router.use('/teams', teamsRouters);

export default router;