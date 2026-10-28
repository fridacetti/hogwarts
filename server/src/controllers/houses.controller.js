import * as housesRepository from "../repositories/houses.repository";

// GET /houses - henter alle huse
export async function getAllHouses(req, res) {
  try {
    const allHouses = await housesRepository.getAllHouses(); // kalder repository-funktion, som henter alle huse fra databasen - await venter på svar fra databasen, før vi går videre.
    res.json(allHouses); // sender listen tilbage til clienten som JSON
  } catch (err) {
    //kører kun hvis noget fejler i try
    console.log(err); // skriver fejlen ud i consolen
    res.status(500).json({ error: "Database error" }); // sender status 500 og JSON-besked til klienten
  }
}

// GET /houses/:id - henter ét hus
export async function getHouseById(req, res) {
  try {
    const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
    const house = await housesRepository.getHouseById(id); // beder repository om at finde huset med det id i databasen

    if (house) {
      // hvis huset bliver fundet
      res.status(200).json(house); // sender huset som JSON og med status 200 (OK)
    } else {
      //hvis huset ikke bliver fundet
      res.sendStatus(404); // sender status 400 (not found)
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}
