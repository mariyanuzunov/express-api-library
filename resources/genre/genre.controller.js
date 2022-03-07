import express from "express";
import asyncHandler from "express-async-handler";

import { genreService } from "./genre.service.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const genres = await genreService.getAll();
    res.status(200).json(genres);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    let genre;

    try {
      genre = await genreService.getOne(id);
    } catch (error) {
      res.status(400);
      throw new Error("Bad Request");
    }

    if (!genre) {
      res.status(404);
      throw new Error(`A genre with id ${id} was not found!`);
    }

    return res.status(200).json(genre);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400);
      throw new Error("Please enter a genre!");
    }

    try {
      const genre = await genreService.createOne(req.body);
      return res.status(201).json(genre);
    } catch (error) {
      res.status(400);

      if (error.code === 11000) {
        throw new Error("A genre with this name already exists!");
      }

      throw new Error("Bad request!");
    }
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    let updatedGenre;

    if (!name) {
      res.status(400);
      throw new Error("Please enter a genre!");
    }

    try {
      updatedGenre = await genreService.updateOne(id, name);
    } catch (error) {
      res.status(400);

      if (error.code === 11000) {
        throw new Error("A genre with this name already exists!");
      }

      throw new Error("Bad Request");
    }

    if (!updatedGenre) {
      res.status(404);
      throw new Error(`A genre with id ${id} was not found!`);
    }

    return res.status(200).json(updatedGenre);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    let genre;

    try {
      genre = await genreService.deleteOne(id);
    } catch (error) {
      res.status(400);
      throw new Error("Bad Request");
    }

    if (!genre) {
      res.status(404);
      throw new Error(`A genre with id ${id} was not found!`);
    }

    return res.status(200).json(genre);
  })
);

router.post(
  "/search",
  asyncHandler(async (req, res) => {
    const { genre } = req.query;

    try {
      const genres = await genreService.search(genre);
      return res.status(200).json(genres);
    } catch (error) {
      res.status(400);
      throw new Error("Bad Request");
    }
  })
);

export default router;
