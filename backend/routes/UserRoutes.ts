import express from 'express';
import { Login, SignUp } from '../controllers/User';

const routes = express.Router();
routes.post("/signup", SignUp);
routes.post("/login", Login);

export default routes;