import express from "express";
import asyncHandler from "express-async-handler";

import { bookService } from "./book.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const books = await bookService.getAll();
  res.status(200).json(books);
});

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    let book;

    try {
      book = await bookService.getOne(id);
    } catch (error) {
      res.status(400);
      throw new Error("Bad Request");
    }

    if (!book) {
      res.status(404);
      throw new Error(`A book with id ${id} was not found!`);
    }

    return res.status(200).json(book);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, author, imageUrl, genre } = req.body;

    if (!title || !author || !imageUrl || !genre) {
      res.status(400);
      throw new Error("All fields are required!");
    }

    try {
      const book = await bookService.createOne(req.body);
      return res.status(201).json(book);
    } catch (error) {
      res.status(400);

      if (error.code == 11000) {
        throw new Error("A book with this title already exists!");
      }

      throw new Error("Bad request!");
    }
  })
);

// TODO: Add validations
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    let updatedBook;

    try {
      updatedBook = await bookService.updateOne(id, req.body);
    } catch (error) {
      res.status(400);
      if (error.code == 11000) {
        throw new Error("A book with this title already exists!");
      }

      throw new Error("Bad request!");
    }

    if (!updatedBook) {
      res.status(404);
      throw new Error(`A book with id ${id} was not found!`);
    }

    return res.status(200).json(updatedBook);
  })
);

// TODO: Remove from genres
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    let book;

    try {
      book = await bookService.deleteOne(id);
    } catch (error) {
      res.status(400);
      throw new Error("Bad Request");
    }

    if (!book) {
      res.status(404);
      throw new Error(`A book with id ${id} was not found!`);
    }

    return res.status(200).json({ _id: book._id });
  })
);

router.post(
  "/search",
  asyncHandler(async (req, res) => {
    const { title } = req.query;
    try {
      const books = await bookService.search(title);
      return res.status(200).json(books);
    } catch (error) {
      res.status(400);
      throw new Error("Bad Request");
    }
  })
);

export default router;
