import * as housesRepository from "../repositories/houses.repository.js";
import HTTPError from "../errorhandling/HTTPError.js";

// GET /houses - henter alle huse
export async function getAllHouses(req, res) {
  const allHouses = await housesRepository.getAllHouses(); // kalder repository-funktion, som henter alle huse fra databasen - await venter på svar fra databasen, før vi går videre.
  res.json(allHouses); // sender listen tilbage til clienten som JSON
}

// GET /houses/:id - henter ét hus
export async function getHouseById(req, res) {
  const id = req.params.id; // henter værdien af :id fra url og gemmer den i variablen id
  const house = await housesRepository.getHouseById(id); // beder repository om at finde huset med det id i databasen

  if (house) {
    res.status(200).json(house);
  } else {
    throw new HTTPError(404, "House not found"); // hvis ikke 200, så kommer 404
  }
}
