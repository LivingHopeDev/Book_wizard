const { Router } = require("express");
const router = Router();
const {
  getBook,
  createBook,
  deleteBook,
  updateBook,
  bookSuggestion,
} = require("../Controller/Controller");

router.route("/book").get(getBook);
router.route("/book").post(createBook);
router.route("/book/:id").put(updateBook);
router.route("/book/:id").delete(deleteBook);
router.route("/ai").get(bookSuggestion);

module.exports = router;
