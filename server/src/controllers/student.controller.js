import * as studentsRepository from "../repositories/students.repository.js";

// GET /students - henter alle students
export async function getAllStudents(req, res) {
  try {
    const allstudents = await studentsRepository.getAllStudents(); // kalder repository-funktion, som henter alle huse fra databasen - await venter på svar fra databasen, før vi går videre.
    res.json(allstudents); // sender listen tilbage til clienten som JSON
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

// GET /students/:id - henter én student
export async function getStudentById(req, res) {
  try {
    const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
    const student = await studentsRepository.getStudentById(id); // beder repository om at finde student med det id i databasen

    if (student) {
      // hvis student bliver fundet
      res.status(200).json(student); // sender student som JSON og med status 200 (OK)
    } else {
      //hvis student ikke bliver fundet
      res.sendStatus(404); // sender status 404 (not found)
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

// POST /students - opretter en ny student
export async function createStudent(req, res) {
  try {
    const { name, house_id } = req.body;
    const created = await studentsRepository.createStudent(name, house_id);
    res.status(201).json(created);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

// PUT /students/:id - erstat eksisterende data
export async function updatedStudent(req, res) {
  try {
    const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
    const { name, house_id } = req.body;
    const updated = await studentsRepository.updatedStudent(id, name, house_id);

    if (updated) {
      // hvis student bliver fundet
      res.status(200).json(updated); // sender student som JSON og med status 200 (OK)
    } else {
      //hvis student ikke bliver fundet
      res.sendStatus(404); // sender status 404 (not found)
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

// DELETE /students/:id - Slet en student
export async function deleteStudent(req, res) {
  try {
    const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
    const deleted = await studentsRepository.deleteStudent(id);

    if (deleted) {
      // hvis student bliver slettet
      res.status(200).json(deleted); // sender student som JSON og med status 200 (OK)
    } else {
      //hvis student ikke bliver slettet
      res.sendStatus(404); // sender status 404 (not found)
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}
