import express from 'express';
import cors from 'cors';
import rootRoute from '@routes/index';
import errorHandler from './expressError';
import expressNotFound from './expressNotFound';
import expressLogger from './expressLogger';
const createServer = () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(expressLogger);
  app.use(cors());
  app.use(express.json());
  app.disable('x-powered-by');
  app.use('/', rootRoute);//Este define todas las rutas, lo que en Web sería el PHP. 
  app.use(expressNotFound);
  app.use(errorHandler);
  return app;
};

export { createServer };
