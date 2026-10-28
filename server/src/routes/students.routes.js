import express from "express";
import * as studentsController from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", studentsController.getAllStudents);
router.get("/:id", studentsController.getStudentById);
router.post("/", studentsController.createStudent);
router.put("/:id", studentsController.updatedStudent);
router.delete("/:id", studentsController.deleteStudent);

export default router;
