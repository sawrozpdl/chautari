import { Router } from 'express';

import { authenticateRequest } from '../services/auth';

/**
 * Router instance to hold routes for the application.
 */
const APIRouter = Router();

/**
 * Get /api
 */
APIRouter.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version,
  });
});

APIRouter.use(authenticateRequest);

APIRouter.get('/protected', (req, res) => {
  res.json({
    message: 'Hi!',
  });
});

export default APIRouter;
