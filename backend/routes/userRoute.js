import express from 'express';
import { Register } from '../controllers/user.js';
import { login } from '../controllers/user.js';
import { Logout } from '../controllers/user.js';

const router= express.Router();

router.route("/register").post(Register);
router.route("/login").post(login)
router.route("/logout").get(Logout)

export default router;


