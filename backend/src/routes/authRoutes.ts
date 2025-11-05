import { Router } from 'express';
import { login, logout, me, register } from '#controllers';
import { authenticate } from '#middlewares';

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.delete('/logout', logout);
authRoutes.get('/me', authenticate, me);

export default authRoutes;
