import * as coursesRepository from "../repositories/courses.repository.js";
import HTTPError from "../errorhandling/HTTPError.js";

// GET /courses - henter alle courses
export async function getAllCourses(req, res) {
  const allCourses = await coursesRepository.getAllCourses(); // kalder repository-funktion, som henter alle huse fra databasen - await venter på svar fra databasen, før vi går videre.
  res.json(allCourses); // sender listen tilbage til clienten som JSON
}

// GET /courses/:id - henter ét course
export async function getCourseById(req, res) {
  const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
  const course = await coursesRepository.getCourseById(id); // beder repository om at finde student med det id i databasen

  if (course) {
    // hvis student bliver fundet
    res.status(200).json(course); // sender student som JSON og med status 200 (OK)
  } else {
    //hvis student ikke bliver fundet
    throw new HTTPError(404, "Course not found"); // hvis ikke 200, så kommer 404
  }
}

// POST /courses - opretter et ny course
export async function createCourse(req, res) {
  const { name, teacher_id } = req.body;
  const created = await coursesRepository.createCourse(name, teacher_id);
  res.status(201).json(created);
}

// PUT /courses/:id - erstat eksisterende data
export async function updatedCourse(req, res) {
  const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
  const { name, teacher_id } = req.body;
  const updated = await coursesRepository.updatedCourse(id, name, teacher_id);

  if (updated) {
    // hvis student bliver fundet
    res.status(200).json(updated); // sender student som JSON og med status 200 (OK)
  } else {
    //hvis student ikke bliver fundet
    throw new HTTPError(404, "Course not found"); // hvis ikke 200, så kommer 404
  }
}

// DELETE /courses/:id - Slet et course
export async function deleteCourse(req, res) {
  const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
  const deleted = await coursesRepository.deleteCourse(id);

  if (deleted) {
    // hvis student bliver slettet
    res.status(200).json(deleted); // sender student som JSON og med status 200 (OK)
  } else {
    //hvis student ikke bliver slettet
    throw new HTTPError(404, "Course not found"); // hvis ikke 200, så kommer 404
  }
}

// PUT /courses/:id/teacher/:teacherId tilføjer en teacher til et course
export async function setCourseTeacher(req, res) {
  const { id, teacherId } = req.params; // henter både course-id og teacher-id fra URL'en
  const updated = await coursesRepository.setCourseTeacher(id, teacherId); // beder repository om at sætter teacher på course

  if (updated) {
    return res.status(200).json(updated); // sender det opdaterede course som JSON med status 200 (OK)
  } else {
    // hvis course ikke findes så sendes
    throw new HTTPError(404, "Course not found"); // hvis ikke 200, så kommer 404
  }
}

// PUT /courses/:id/student/:studentId tilføjer en student til et course
export async function addStudentToCourse(req, res) {
  const { id, studentId } = req.params;
  await coursesRepository.addStudentToCourse(id, studentId);
  res.sendStatus(200);
}

// DELETE /courses/:id/student/:studentId sletter en student fra et course
export async function removeStudentFromCourse(req, res) {
  const { id, studentId } = req.params; // henter værdien af :id fra url og gemmer den i variablen id
  const removed = await coursesRepository.removeStudentFromCourse(id, studentId);
  if (removed) {
    return res.sendStatus(204);
  } else {
    throw new HTTPError(404, "Course not found"); // hvis ikke 200, så kommer 404
  }
}
