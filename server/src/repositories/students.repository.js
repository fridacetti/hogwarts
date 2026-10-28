import pool from "../db.js"; // importere forbindelsen til databasen fra db.js

// henter alle students
export async function getAllStudents() {
  // gør funktionen tilgængelig for app.js
  const result = await pool.query("SELECT * FROM Students"); // sender en SQL-forespørgelse til SQL som beder om alle koloner fra Students
  return result.rows; // Returnere en liste med alle rækker til funktionen
}

// henter én Student
export async function getStudentById(id) {
  const one = await pool.query("SELECT * FROM Students WHERE id = $1", [id]); // sender en forspørgelse efter specifik række hvor id matcher

  if (one.rowCount === 0) {
    // antallet af rækker databasen fandt, 0 betyder at der ikke findes et hus med det id
    return null; // returnerer null så app.js ved at huset ikke blev fundet
  } else {
    return one.rows[0]; // Der blev fundet en rækker, og huset returneres som et objekt.
  }
}

// opret en ny Student
export async function createStudent(name, house_id) {
  const created = await pool.query("INSERT INTO Students (name, house_id) VALUES ($1, $2) RETURNING *", [name, house_id]); // opret en ny række i tabellen Students
  return created.rows[0]; // den nye række kommer til at ligge først
}

// erstat eksisterende data
export async function updatedStudent(id, name, house_id) {
  const updated = await pool.query("UPDATE Students SET name = $1, house_id = $2 WHERE id = $3 RETURNING *", [name, house_id, id]);

  if (updated.rowCount === 0) {
    return null;
  } else {
    return updated.rows[0];
  }
}

// slet en Student
export async function deleteStudent(id) {
  const deleted = await pool.query("DELETE FROM Students WHERE id = $1 RETURNING *", [id]);
  if (deleted.rowCount === 0) {
    return null;
  } else {
    return deleted.rows[0];
  }
}
