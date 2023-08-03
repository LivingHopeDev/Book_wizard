const handleError = (error) => {
  let errs = {};
  if (error.code === 11000 && error.keyPattern.book_name) {
    errs = "Book name already exist";
  }
  return errs;
};

module.exports = { handleError };
