import * as teacherRepository from "../repositories/teachers.repository";

export async function getAllTeachers(req, res) {
  try {
    const allTeachers = await teachersRepository.getAllTeachers(); // kalder repository-funktion, som henter alle huse fra databasen - await venter på svar fra databasen, før vi går videre.
    res.json(allTeachers); // sender listen tilbage til clienten som JSON
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function getTeacherById(req, res) {
  try {
    const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
    const teacher = await teachersRepository.getTeacherById(id); // beder repository om at finde teacher med det id i databasen

    if (teacher) {
      // hvis teacher bliver fundet
      res.status(200).json(teacher); // sender teacher som JSON og med status 200 (OK)
    } else {
      //hvis teacher ikke bliver fundet
      res.sendStatus(404); // sender status 404 (not found)
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function createTeacher(req, res) {
  try {
    const { name, house_id } = req.body;
    const created = await teachersRepository.createTeacher(name, house_id);
    res.status(201).json(created);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function updatedTeacher(req, res) {
  try {
    const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
    const { name, house_id } = req.body;
    const updated = await teachersRepository.updatedTeacher(id, name, house_id);

    if (updated) {
      // hvis teacher bliver fundet
      res.status(200).json(updated); // sender teacher som JSON og med status 200 (OK)
    } else {
      //hvis teacher ikke bliver fundet
      res.sendStatus(404); // sender status 404 (not found)
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}
export async function deleteTeacher(req, res) {
  try {
    const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
    const deleted = await teachersRepository.deleteTeacher(id);

    if (deleted) {
      // hvis teacher bliver slettet
      res.status(200).json(deleted); // sender teacher som JSON og med status 200 (OK)
    } else {
      //hvis teacher ikke bliver slettet
      res.sendStatus(404); // sender status 404 (not found)
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}
