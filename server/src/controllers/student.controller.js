import * as studentsRepository from "../repositories/students.repository.js";
import HTTPError from "../errorhandling/HTTPError.js";

// GET /students - henter alle students
export async function getAllStudents(req, res) {
  const allstudents = await studentsRepository.getAllStudents(); // kalder repository-funktion, som henter alle huse fra databasen - await venter på svar fra databasen, før vi går videre.
  res.json(allstudents); // sender listen tilbage til clienten som JSON
}

// GET /students/:id - henter én student
export async function getStudentById(req, res) {
  const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
  const student = await studentsRepository.getStudentById(id); // beder repository om at finde student med det id i databasen

  if (student) {
    // hvis student bliver fundet
    res.status(200).json(student); // sender student som JSON og med status 200 (OK)
  } else {
    //hvis student ikke bliver fundet
    throw new HTTPError(404, "Student not found"); // hvis ikke 200, så kommer 404
  }
}

// POST /students - opretter en ny student
export async function createStudent(req, res) {
  const { name, house_id } = req.body;
  const created = await studentsRepository.createStudent(name, house_id);
  res.status(201).json(created);
}

// PUT /students/:id - erstat eksisterende data
export async function updatedStudent(req, res) {
  const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
  const { name, house_id } = req.body;
  const updated = await studentsRepository.updatedStudent(id, name, house_id);

  if (updated) {
    // hvis student bliver fundet
    res.status(200).json(updated); // sender student som JSON og med status 200 (OK)
  } else {
    //hvis student ikke bliver fundet
    throw new HTTPError(404, "Student not found"); // hvis ikke 200, så kommer 404
  }
}

// DELETE /students/:id - Slet en student
export async function deleteStudent(req, res) {
  const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
  const deleted = await studentsRepository.deleteStudent(id);

  if (deleted) {
    // hvis student bliver slettet
    res.status(200).json(deleted); // sender student som JSON og med status 200 (OK)
  } else {
    //hvis student ikke bliver slettet
    throw new HTTPError(404, "Student not found"); // hvis ikke 200, så kommer 404
  }
}
