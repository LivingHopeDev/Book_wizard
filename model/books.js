const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  book_name: {
    type: String,
    unique: true,
  },
  author: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
