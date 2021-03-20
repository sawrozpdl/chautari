import { Router } from 'express';

import { authenticateRequest } from '../services/auth';
import { getUserSettings, syncUserSettings } from '../controllers/settings';

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

APIRouter.get('/users/:id/settings', getUserSettings);
APIRouter.put('/users/:id/settings', syncUserSettings);

export default APIRouter;
