let BookInstance = require('../models/bookinstance');
let Book = require('../models/book');

function getBookTitleStatus() {
  return BookInstance.find({status: "Available"}, "book status")
}

function getBookTitle(id) {
  return Book.findOne({'_id': {$eq: id}}, "title");
}
exports.show_all_books_status = function(res) {
  BookInstance.find({'status': {$eq: 'Available'}})
  .populate('book')
  .exec()
  .then(list_bookinstances => {
    res.send(list_bookinstances.map(function(bookInstance) {
      return bookInstance.book.title + " : " + bookInstance.status
    }));
  })
  .catch(err => res.send(`Status not found`));
}