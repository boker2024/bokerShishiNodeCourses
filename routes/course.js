import { addCourse, deleteCourseById, getAllCourses, getCourseById } from '../controllers/course.js';
import express from "express";
import { auth, authAdmin } from '../middlwares/auth.js';

const router = express.Router();

router.get('/', auth,getAllCourses);
router.get('/:id',auth, getCourseById);
router.post('/', auth, addCourse);
router.delete("/:id",auth,deleteCourseById)
export default router;