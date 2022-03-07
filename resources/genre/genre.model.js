import mongoose from "mongoose";

const genreSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    books: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Book",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Genre", genreSchema);
