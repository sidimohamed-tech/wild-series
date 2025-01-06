// Some data to make the trick

const programs = [
  {
    id: 1,
    title: "The Good Place",
    synopsis:
      "À sa mort, Eleanor Shellstrop est envoyée au Bon Endroit, un paradis fantaisiste réservé aux individus exceptionnellement bienveillants. Or Eleanor n'est pas exactement une « bonne personne » et comprend vite qu'il y a eu erreur sur la personne. Avec l'aide de Chidi, sa prétendue âme sœur dans l'au-delà, la jeune femme est bien décidée à se redécouvrir.",
    poster:
      "https://img.betaseries.com/JwRqyGD3f9KvO_OlfIXHZUA3Ypw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2F94857341d71c795c69b9e5b23c4bf3e7.jpg",
    country: "USA",
    year: 2016,
  },
  {
    id: 2,
    title: "Dark",
    synopsis:
      "Quatre familles affolées par la disparition d'un enfant cherchent des réponses et tombent sur un mystère impliquant trois générations qui finit de les déstabiliser.",
    poster:
      "https://img.betaseries.com/zDxfeFudy3HWjxa6J8QIED9iaVw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2Fc47135385da176a87d0dd9177c5f6a41.jpg",
    country: "Allemagne",
    year: 2017,
  },
];

// Declare the action

import type { RequestHandler } from "express";
import programRepository from "./programRepository";

// Import access to data

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const programs = await programRepository.readAll();

    // Respond with the items in JSON format
    res.json(programs);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const programId = Number(req.params.id);
    const program = await programRepository.read(programId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (program == null) {
      res.sendStatus(404);
    } else {
      res.json(program);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newProgram = {
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: req.body.year,
    };

    // Create the item
    const insertId = await programRepository.create(newProgram);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
    res.send("erreurr");
  }
};

export default { browse, read, add };
