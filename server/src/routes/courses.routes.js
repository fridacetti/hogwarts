import express from "express";
import * as coursesController from "../controllers/courses.controllers.js";

const router = express.Router();

router.get("/", coursesController.getAllCourses);
router.get("/:id", coursesController.getCourseById);
router.post("/", coursesController.createCourse);
router.put("/:id", coursesController.updatedCourse);
router.delete("/:id", coursesController.deleteCourse);

router.put("/:id/teacher/:teacherId", coursesController.setCourseTeacher);
router.put("/:id/students/:studentId", coursesController.addStudentToCourse);
router.delete("/:id/students/:studentId", coursesController.removeStudentFromCourse);

export default router;
