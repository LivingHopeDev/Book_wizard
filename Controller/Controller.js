const Book = require("../model/books");
const { handleError } = require("../Middleware/errorhandler");
const { Configuration, OpenAIApi } = require("openai");

const createBook = async (req, res) => {
  try {
    await Book.create(req.body);
    res.json({
      status: "Success",
      message: "Book created",
    });
  } catch (error) {
    const err = handleError(error);
    res.status(500).json({
      status: "Fail",
      message: err,
    });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.find();
    res.json({
      status: "Success",
      message: book,
    });
  } catch (error) {
    res.json({
      status: "Fail",
      message: error,
    });
  }
};
const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete({ _id: req.params.id });
    res.json({
      status: "Success",
      message: "Book deleted",
    });
  } catch (error) {
    res.json({
      status: "Fail",
      message: error,
    });
  }
};
const updateBook = async (req, res) => {
  try {
    const data = req.body;
    await Book.findByIdAndUpdate({ _id: req.params.id }, data, { new: true });
    res.json({
      status: "Success",
      message: "Book updated",
    });
  } catch (error) {
    res.staus(500).json({
      status: "Fail",
      message: error,
    });
  }
};
const bookSuggestion = async (req, res) => {
  const books = await Book.find({});
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const prompt = `Give me 6 book suggestion base on these books ${books}`;
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  res.status(200).json({
    suggestion: chatCompletion.data.choices[0].message.content,
  });
};

module.exports = {
  createBook,
  getBook,
  deleteBook,
  updateBook,
  bookSuggestion,
};
