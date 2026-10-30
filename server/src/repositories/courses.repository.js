import pool from "../db.js"; // importere forbindelsen til databasen fra db.js

// henter alle courses
export async function getAllCourses() {
  // gør funktionen tilgængelig for app.js
  const result = await pool.query("SELECT * FROM courses"); // sender en SQL-forespørgelse til SQL som beder om alle koloner fra courses
  return result.rows; // Returnere en liste med alle rækker til funktionen
}

// henter én courses
export async function getCourseById(id) {
  const one = await pool.query("SELECT * FROM courses WHERE id = $1", [id]); // sender en forspørgelse efter specifik række hvor id matcher

  if (one.rowCount === 0) {
    // antallet af rækker databasen fandt, 0 betyder at der ikke findes et hus med det id
    return null; // returnerer null så app.js ved at huset ikke blev fundet
  } else {
    return one.rows[0]; // Der blev fundet en rækker, og huset returneres som et objekt.
  }
}

// opret en ny courses
export async function createCourse(name, teacher_id) {
  const created = await pool.query("INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *", [name, teacher_id]); // opret en ny række i tabellen courses
  return created.rows[0]; // den nye række kommer til at ligge først
}

// erstat eksisterende data
export async function updatedCourse(id, name, teacher_id) {
  const updated = await pool.query("UPDATE courses SET name = $1, teacher_id = $2 WHERE id = $3 RETURNING *", [name, teacher_id, id]); // opdaterer navn og lærer på det course, hvor id matcher

  if (updated.rowCount === 0) {
    // ingen rækker blev opdateret, så course findes ikke
    return null; // returnerer null, så controlleren kan sende 404
  } else {
    return updated.rows[0]; // returnerer det opdaterede course
  }
}

// slet en courses
export async function deleteCourse(id) {
  const deleted = await pool.query("DELETE FROM courses WHERE id = $1 RETURNING *", [id]); // sletter course

  if (deleted.rowCount === 0) {
    // ingen rækker blev slettet, så course findes ikke
    return null; // returnerer null, så controlleren kan sende 404
  } else {
    return deleted.rows[0]; // returnerer det slettede course
  }
}

// Set teacher for an existing course
export async function setCourseTeacher(courseId, teacherId) {
  const updated = await pool.query("UPDATE courses SET teacher_id = $1 WHERE id = $2 RETURNING *", [teacherId, courseId]);
  if (updated.rowCount === 0) {
    return null;
  } else {
    return updated.rows[0];
  }
}

// tilføj student til course
export async function addStudentToCourse(courseId, studentId) {
  await pool.query("INSERT INTO courses_students (course_id, student_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [courseId, studentId]); // ON CONFLICT DO NOTHING = ingen fejl, hvis koblingen allerede findes
}

// sletter student fra course
export async function removeStudentFromCourse(courseId, studentId) {
  const removed = await pool.query("DELETE FROM courses_students WHERE course_id = $1 AND student_id = $2", [courseId, studentId]);
  return removed.rowCount > 0; // true hvis noget blev slettet, false hvis koblingen ikke fandtes
}
