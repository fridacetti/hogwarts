import * as coursesRepository from "../repositories/courses.repository.js";

// GET /courses - henter alle courses
export async function getAllCourses(req, res){
   try {
    const allCourses = await coursesRepository.getAllCourses(); // kalder repository-funktion, som henter alle huse fra databasen - await venter på svar fra databasen, før vi går videre.
    res.json(allCourses); // sender listen tilbage til clienten som JSON
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  } 
}

// GET /courses/:id - henter ét course
export async function getCourseById(req, res){
    try {
    const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
    const course = await coursesRepository.getCourseById(id); // beder repository om at finde student med det id i databasen

    if (course) {
      // hvis student bliver fundet
      res.status(200).json(course); // sender student som JSON og med status 200 (OK)
    } else {
      //hvis student ikke bliver fundet
      res.sendStatus(404); // sender status 404 (not found)
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }}

  // POST /courses - opretter et ny course
export async function createCourse(req, res){
    try {
    const { name, teacher_id } = req.body;
    const created = await coursesRepository.createCourse(name, teacher_id);
    res.status(201).json(created);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

// PUT /courses/:id - erstat eksisterende data
export async function updatedCourse(req, res){
try {
    const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
    const { name, teacher_id } = req.body;
    const updated = await coursesRepository.updatedCourse(id, name, teacher_id);

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

// DELETE /courses/:id - Slet et course
export async function deleteCourse(req, res){
try {
    const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
    const deleted = await coursesRepository.deleteCourse(id);

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

// Set teacher for an existing course
export async function setCourseTeacher(req, res){
   try {
       const { id, teacherId } = req.params;
       const updated = await coursesRepository.setCourseTeacher(id, teacherId);
   
       if (updated) {
         return res.status(200).json(updated);
       } else {
         res.sendStatus(404);
       }
     } catch (err) {
       console.log(err);
       res.status(500).json({ error: "Database error" });
     } 
}

// Add a student to an existing course
export async function addStudentToCourse(req, res)
{try {
    const { id, studentId } = req.params;
    await coursesRepository.addStudentToCourse(id, studentId);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }}

// Remove a student from an existing course
export async function removeStudentFromCourse(req, res){
      try {
    const { id, studentId } = req.params; // henter værdien af :id fra url og gemmer den i variablen id
    const removed = await coursesRepository.removeStudentFromCourse(id, studentId);
    if (removed) {
      return res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}