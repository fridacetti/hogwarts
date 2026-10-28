import pool from "../db.js"; // importere forbindelsen til databasen fra db.js

// henter alle huse
export async function getAllHouses() {
  // gør funktionen tilgængelig for app.js
  const result = await pool.query("SELECT * FROM houses"); // sender en SQL-forespørgelse til SQL som beder om alle koloner fra houses
  return result.rows; // Returnere en liste med alle rækker til funktionen
}

// henter ét hus
export async function getHouseById(id) {
  const one = await pool.query("SELECT * FROM houses WHERE id = $1", [id]); // sender en forspørgelse efter specifik række hvor id matcher

  if (one.rowCount === 0) {
    // antallet af rækker databasen fandt, 0 betyder at der ikke findes et hus med det id
    return null; // returnerer null så app.js ved at huset ikke blev fundet
  } else {
    return one.rows[0]; // Der blev fundet en rækker, og huset returneres som et objekt.
  }
}
