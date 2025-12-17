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
import { CancelRegistrationController } from '../modules/events/useCases/cancelRegistration/CancelRegistrationController';
import { GetEventDetailsController } from '../modules/events/useCases/getEventDetails/GetEventDetailsController';
import { GetUserProfileController } from '../modules/users/useCases/getUserProfile/GetUserProfileController';
import { SendFriendRequestController } from '../modules/social/useCases/sendFriendRequest/SendFriendRequestController';
import { ListFriendRequestsController } from '../modules/social/useCases/listFriendRequests/ListFriendRequestsController';
import { ListFriendsController } from '../modules/social/useCases/listFriends/ListFriendsController';
import { RespondFriendRequestController } from '../modules/social/useCases/respondFriendRequest/RespondFriendRequestController';

import { SendMessageController } from '../modules/messages/useCases/sendMessage/SendMessageController';
import { ListUserMessagesController } from '../modules/messages/useCases/listUserMessages/ListUserMessagesController';
import { ApproveRegistrationController } from '../modules/events/useCases/approveRegistration/ApproveRegistrationController';
import { RejectRegistrationController } from '../modules/events/useCases/rejectRegistration/RejectRegistrationController';
import { CreateReviewController } from '../modules/events/useCases/createReview/CreateReviewController';
import { UpdateEventController } from '../modules/events/useCases/updateEvent/UpdateEventController';
import { DeleteEventController } from '../modules/events/useCases/deleteEvent/DeleteEventController';

const routes = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createEventController = new CreateEventController();
const listEventsController = new ListEventsController();
const createRegistrationController = new CreateRegistrationController();
const performCheckInController = new PerformCheckInController();
const listUserRegistrationsController = new ListUserRegistrationsController();
const cancelRegistrationController = new CancelRegistrationController();
const listEventRegistrationsController = new ListEventRegistrationsController();
const getEventDetailsController = new GetEventDetailsController();
const sendFriendRequestController = new SendFriendRequestController();
const getUserProfileController = new GetUserProfileController();
const listFriendRequestsController = new ListFriendRequestsController();
const listFriendsController = new ListFriendsController();
const respondFriendRequestController = new RespondFriendRequestController();
const sendMessageController = new SendMessageController();
const listUserMessagesController = new ListUserMessagesController();
const approveRegistrationController = new ApproveRegistrationController();
const rejectRegistrationController = new RejectRegistrationController();
const createReviewController = new CreateReviewController();
const updateEventController = new UpdateEventController();
const deleteEventController = new DeleteEventController();

routes.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'EventSync API is running' });
});

routes.post('/users', createUserController.handle);
routes.post('/sessions', authenticateUserController.handle);

routes.get('/events', listEventsController.handle);


routes.get('/profile', ensureAuthenticated, getUserProfileController.handle);

routes.post('/events', ensureAuthenticated, createEventController.handle);
routes.put('/events/:eventId', ensureAuthenticated, updateEventController.handle);
routes.delete('/events/:eventId', ensureAuthenticated, deleteEventController.handle);
routes.post('/events/:eventId/registrations', ensureAuthenticated, createRegistrationController.handle);
routes.post('/events/:eventId/check-in', ensureAuthenticated, performCheckInController.handle);
routes.post('/events/:eventId/check-in', ensureAuthenticated, performCheckInController.handle);

routes.get('/registrations', ensureAuthenticated, listUserRegistrationsController.handle);
routes.delete('/registrations/:id', ensureAuthenticated, cancelRegistrationController.handle);

routes.get('/events/:eventId/registrations', ensureAuthenticated, listEventRegistrationsController.handle);

routes.get('/events/:eventId', ensureAuthenticated, getEventDetailsController.handle);

// Social Routes
routes.post('/users/:id/friend-request', ensureAuthenticated, sendFriendRequestController.handle);
routes.get('/friends/requests', ensureAuthenticated, listFriendRequestsController.handle);
routes.get('/friends', ensureAuthenticated, listFriendsController.handle);
routes.put('/friends/requests/:requestId', ensureAuthenticated, respondFriendRequestController.handle);

// Messages Routes
routes.post('/messages', ensureAuthenticated, sendMessageController.handle);
routes.get('/messages', ensureAuthenticated, listUserMessagesController.handle);

// Registration Management Routes
routes.patch('/registrations/:id/approve', ensureAuthenticated, approveRegistrationController.handle);
routes.patch('/registrations/:id/reject', ensureAuthenticated, rejectRegistrationController.handle);

// Review Routes
routes.post('/events/:eventId/reviews', ensureAuthenticated, createReviewController.handle);

export { routes };
