import { Router, Request, Response } from 'express';

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController';

import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

import { CreateEventController } from '../modules/events/useCases/createEvent/CreateEventController';
import { ListEventsController } from '../modules/events/useCases/listEvents/ListEventsController';
import { CreateRegistrationController } from '../modules/events/useCases/createRegistration/CreateRegistrationController';
import { PerformCheckInController } from '../modules/events/useCases/performCheckIn/PerformCheckInController';

const routes = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createEventController = new CreateEventController();
const listEventsController = new ListEventsController();
const createRegistrationController = new CreateRegistrationController();
const performCheckInController = new PerformCheckInController();

routes.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'EventSync API is running' });
});

routes.post('/users', createUserController.handle);
routes.post('/sessions', authenticateUserController.handle);

routes.get('/events', listEventsController.handle);


routes.get('/profile', ensureAuthenticated, (req: Request, res: Response) => {
  return res.json({ message: 'Authenticated', userId: req.user.id });
});

routes.post('/events', ensureAuthenticated, createEventController.handle);
routes.post('/events/:eventId/registrations', ensureAuthenticated, createRegistrationController.handle);
routes.post('/events/:eventId/check-in', ensureAuthenticated, performCheckInController.handle);




export { routes };
