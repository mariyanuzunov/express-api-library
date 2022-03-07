import Genre from "./genre.model.js";

const getAll = async () => {
  return Genre.find();
};

const getOne = async (id) => {
  return Genre.findById(id).populate("books");
};

const createOne = async (data) => {
  return Genre.create(data);
};

const updateOne = async (id, name) => {
  return await Genre.findByIdAndUpdate(id, { name }, { new: true });
};

const deleteOne = async (id) => {
  return Genre.findByIdAndRemove(id);
};

const search = async (term) => {
  return Genre.find({ name: { $regex: term, $options: "i" } }).populate(
    "books"
  );
};

export const genreService = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  search,
};
