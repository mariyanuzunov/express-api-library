import Book from "./book.model.js";
import { genreService } from "../genre/genre.service.js";

const getAll = async () => {
  return Book.find().populate({ path: "genre", select: { name: 1 } });
};

const getOne = async (id) => {
  return Book.findById(id).populate({ path: "genre", select: { name: 1 } });
};

const createOne = async (data) => {
  const book = await Book.create(data);
  const genre = await genreService.getOne(data.genre);
  genre.books.push(book);
  await genre.save();

  return book.populate({ path: "genre", select: { name: 1 } });
};

const updateOne = async (id, data) => {
  const updatedBook = await Book.findByIdAndUpdate(id, data, {
    new: true,
  });

  return updatedBook?.populate({ path: "genre", select: { name: 1 } });
};

const deleteOne = async (id) => {
  return await Book.findByIdAndRemove(id);
};

const search = async (term) => {
  return Book.find({ title: { $regex: term, $options: "i" } }).populate({
    path: "genre",
    select: { name: 1 },
  });
};

export const bookService = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  search,
};
