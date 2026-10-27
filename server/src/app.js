import "dotenv/config";
import express from "express";
//import pg from "pg";
import pool from "./db.js";
import * as housesRepository from "./repositories/houses.repository.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- HOUSES ----------

app.get("/houses", async (req, res) => {
  try {
    const allHouses = housesRepository.getAllHouses;
    res.json(allHouses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/houses/:id", async (req, res) => {
  try {
    const one = await pool.query("SELECT * FROM houses WHERE id = $1", [req.params.id]);
    if (one.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ---------- TEACHERS ----------

app.get("/teachers", async (req, res) => {
  try {
    const all = await pool.query("SELECT * FROM teachers");
    res.status(200).json(all.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/teachers/:id", async (req, res) => {
  try {
    const one = await pool.query("SELECT * FROM teachers WHERE id = $1", [req.params.id]);
    if (one.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/teachers", async (req, res) => {
  try {
    const { name, house_id } = req.body;
    const created = await pool.query("INSERT INTO teachers (name, house_id) VALUES ($1, $2) RETURNING *", [name, house_id]);
    res.status(201).json(created.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/teachers/:id", async (req, res) => {
  try {
    const { name, house_id } = req.body;
    const updated = await pool.query("UPDATE teachers SET name = $1, house_id = $2 WHERE id = $3 RETURNING *", [name, house_id, req.params.id]);
    if (updated.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(updated.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/teachers/:id", async (req, res) => {
  try {
    const deleted = await pool.query("DELETE FROM teachers WHERE id = $1", [req.params.id]);
    if (deleted.rowCount === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ---------- STUDENTS ----------

app.get("/students", async (req, res) => {
  try {
    const all = await pool.query("SELECT * FROM students");
    res.status(200).json(all.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const one = await pool.query("SELECT * FROM students WHERE id = $1", [req.params.id]);
    if (one.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/students", async (req, res) => {
  try {
    const { name, year, house_id } = req.body;
    const created = await pool.query("INSERT INTO students (name, year, house_id) VALUES ($1, $2, $3) RETURNING *", [name, year, house_id]);
    res.status(201).json(created.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const { name, year, house_id } = req.body;
    const updated = await pool.query("UPDATE students SET name = $1, year = $2, house_id = $3 WHERE id = $4 RETURNING *", [name, year, house_id, req.params.id]);
    if (updated.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(updated.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const deleted = await pool.query("DELETE FROM students WHERE id = $1", [req.params.id]);
    if (deleted.rowCount === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ---------- COURSES ----------

app.get("/courses", async (req, res) => {
  try {
    const all = await pool.query("SELECT * FROM courses");
    res.status(200).json(all.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/courses/:id", async (req, res) => {
  try {
    const one = await pool.query("SELECT * FROM courses WHERE id = $1", [req.params.id]);
    if (one.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/courses", async (req, res) => {
  try {
    const { name, teacher_id } = req.body;
    const created = await pool.query("INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *", [name, teacher_id]);
    res.status(201).json(created.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/courses/:id", async (req, res) => {
  try {
    const { name, teacher_id } = req.body;
    const updated = await pool.query("UPDATE courses SET name = $1, teacher_id = $2 WHERE id = $3 RETURNING *", [name, teacher_id, req.params.id]);
    if (updated.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(updated.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/courses/:id", async (req, res) => {
  try {
    const deleted = await pool.query("DELETE FROM courses WHERE id = $1", [req.params.id]);
    if (deleted.rowCount === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Set teacher for an existing course
app.put("/courses/:id/teacher/:teacherId", async (req, res) => {
  try {
    const updated = await pool.query("UPDATE courses SET teacher_id = $1 WHERE id = $2 RETURNING *", [req.params.teacherId, req.params.id]);
    if (updated.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(updated.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Add a student to an existing course
app.put("/courses/:id/students/:studentId", async (req, res) => {
  try {
    await pool.query("INSERT INTO courses_students (course_id, student_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [req.params.id, req.params.studentId]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Remove a student from an existing course
app.delete("/courses/:id/students/:studentId", async (req, res) => {
  try {
    const removed = await pool.query("DELETE FROM courses_students WHERE course_id = $1 AND student_id = $2", [req.params.id, req.params.studentId]);
    if (removed.rowCount === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server kører på http://localhost:${PORT}`);
});
