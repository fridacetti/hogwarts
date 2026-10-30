import express from "express";
import * as coursesController from "../controllers/courses.controllers.js";

const router = express.Router();

router.get("/", coursesController.getAllCourses); // sender en GET til /courses videre til funktionen der henter alle courses
router.get("/:id", coursesController.getCourseById); // sender en GET til /courses/:id videre til funktionen der henter ét courses
router.post("/", coursesController.createCourse); // sender en POST til /courses videre til funktionen der opretter et nyt courses
router.put("/:id", coursesController.updatedCourse); // sender en PUT til /courses/:id videre til funktionen der erstatter data på et eksisterende courses
router.delete("/:id", coursesController.deleteCourse); // sender en DELETE til /courses/:id videre til funktionen der sletter et course

router.put("/:id/teacher/:teacherId", coursesController.setCourseTeacher); // sender en PUT videre til funktionen der tilføjer en teacher på et course
router.put("/:id/students/:studentId", coursesController.addStudentToCourse); // sender en PUT videre til funktionen der tilføjer en student på et course
router.delete("/:id/students/:studentId", coursesController.removeStudentFromCourse); // sender en DELETE videre til funktionen der fjerner en student på et course

export default router;
