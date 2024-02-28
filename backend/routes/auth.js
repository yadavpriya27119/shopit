import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").get(loginUser)



export default router;