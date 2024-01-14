import { addUser, login, getAllUsers } from '../controllers/user.js';
import express from "express";
import { authAdmin } from '../middlwares/auth.js';

const router = express.Router();


router.post('/', addUser);
router.post('/login', login);
router.get('/',authAdmin, getAllUsers);

export default router;