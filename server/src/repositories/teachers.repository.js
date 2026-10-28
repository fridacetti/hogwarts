import pool from "../db.js"; // importere forbindelsen til databasen fra db.js

// henter alle tecahers
export async function getAllTeachers() {
  // gør funktionen tilgængelig for app.js
  const result = await pool.query("SELECT * FROM teachers"); // sender en SQL-forespørgelse til SQL som beder om alle koloner fra teachers
  return result.rows; // Returnere en liste med alle rækker til funktionen
}

// henter én teacher
export async function getTeacherById(id) {
  const one = await pool.query("SELECT * FROM teachers WHERE id = $1", [id]); // sender en forspørgelse efter specifik række hvor id matcher

  if (one.rowCount === 0) {
    // antallet af rækker databasen fandt, 0 betyder at der ikke findes et hus med det id
    return null; // returnerer null så app.js ved at huset ikke blev fundet
  } else {
    return one.rows[0]; // Der blev fundet en rækker, og huset returneres som et objekt.
  }
}

// opret en ny teacher
export async function createTeacher(name, house_id) {
  const created = await pool.query("INSERT INTO teachers (name, house_id) VALUES ($1, $2) RETURNING *", [name, house_id]); // opret en ny række i tabellen teachers
  return created.rows[0]; // den nye række kommer til at ligge først
}

// erstat eksisterende data
export async function updatedTeacher(id, name, house_id) {
  const updated = await pool.query("UPDATE teachers SET name = $1, house_id = $2 WHERE id = $3 RETURNING *", [name, house_id, id]);

  if (updated.rowCount === 0) {
    return null;
  } else {
    return updated.rows[0];
  }
}

// slet en teacher
export async function deleteTeacher(id) {
  const deleted = await pool.query("DELETE FROM teachers WHERE id = $1 RETURNING *", [id]);
  if (deleted.rowCount === 0) {
    return null;
  } else {
    return deleted.rows[0];
  }
}
