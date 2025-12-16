import { Router, Request, Response } from 'express';

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController';

import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

import { CreateEventController } from '../modules/events/useCases/createEvent/CreateEventController';
import { ListEventsController } from '../modules/events/useCases/listEvents/ListEventsController';
import { CreateRegistrationController } from '../modules/events/useCases/createRegistration/CreateRegistrationController';
import { PerformCheckInController } from '../modules/events/useCases/performCheckIn/PerformCheckInController';
import { ListUserRegistrationsController } from '../modules/events/useCases/listUserRegistrations/ListUserRegistrationsController';
import { ListEventRegistrationsController } from '../modules/events/useCases/listEventRegistrations/ListEventRegistrationsController';
import { GetEventDetailsController } from '../modules/events/useCases/getEventDetails/GetEventDetailsController';
import { GetUserProfileController } from '../modules/users/useCases/getUserProfile/GetUserProfileController';
import { SendFriendRequestController } from '../modules/social/useCases/sendFriendRequest/SendFriendRequestController';
import { ListFriendRequestsController } from '../modules/social/useCases/listFriendRequests/ListFriendRequestsController';
import { ListFriendsController } from '../modules/social/useCases/listFriends/ListFriendsController';
import { RespondFriendRequestController } from '../modules/social/useCases/respondFriendRequest/RespondFriendRequestController';

const routes = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createEventController = new CreateEventController();
const listEventsController = new ListEventsController();
const createRegistrationController = new CreateRegistrationController();
const performCheckInController = new PerformCheckInController();
const listUserRegistrationsController = new ListUserRegistrationsController();
const listEventRegistrationsController = new ListEventRegistrationsController();
const getEventDetailsController = new GetEventDetailsController();
const sendFriendRequestController = new SendFriendRequestController();
const getUserProfileController = new GetUserProfileController();
const listFriendRequestsController = new ListFriendRequestsController();
const listFriendsController = new ListFriendsController();
const respondFriendRequestController = new RespondFriendRequestController();

routes.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'EventSync API is running' });
});

routes.post('/users', createUserController.handle);
routes.post('/sessions', authenticateUserController.handle);

routes.get('/events', listEventsController.handle);


routes.get('/profile', ensureAuthenticated, getUserProfileController.handle);

routes.post('/events', ensureAuthenticated, createEventController.handle);
routes.post('/events/:eventId/registrations', ensureAuthenticated, createRegistrationController.handle);
routes.post('/events/:eventId/check-in', ensureAuthenticated, performCheckInController.handle);

routes.get('/registrations', ensureAuthenticated, listUserRegistrationsController.handle);

routes.get('/events/:eventId/registrations', ensureAuthenticated, listEventRegistrationsController.handle);

routes.get('/events/:eventId', ensureAuthenticated, getEventDetailsController.handle);

// Social Routes
routes.post('/users/:id/friend-request', ensureAuthenticated, sendFriendRequestController.handle);
routes.get('/friends/requests', ensureAuthenticated, listFriendRequestsController.handle);
routes.get('/friends', ensureAuthenticated, listFriendsController.handle);
routes.put('/friends/requests/:requestId', ensureAuthenticated, respondFriendRequestController.handle);


export { routes };
