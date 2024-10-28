"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Book = exports.BookFormat = exports.BookStatus = void 0;
var BookStatus;
(function (BookStatus) {
  BookStatus["Read"] = "Read";
  BookStatus["ReRead"] = "Re-read";
  BookStatus["DNF"] = "DNF";
  BookStatus["CurrentlyReading"] = "Currently reading";
  BookStatus["ReturnedUnread"] = "Returned Unread";
  BookStatus["WantToRead"] = "Want to read";
})(BookStatus || (exports.BookStatus = BookStatus = {}));
var BookFormat;
(function (BookFormat) {
  BookFormat["Print"] = "Print";
  BookFormat["PDF"] = "PDF";
  BookFormat["Ebook"] = "Ebook";
  BookFormat["AudioBook"] = "AudioBook";
})(BookFormat || (exports.BookFormat = BookFormat = {}));
class Book {
  constructor(title, author, pages, status, price, pagesRead, format, suggestedBy) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.price = price;
    this.pagesRead = pagesRead;
    this.format = format;
    this.suggestedBy = suggestedBy;
    this.finished = pagesRead >= pages;
  }
  currentlyAt(page) {
    this.pagesRead = page;
    this.finished = this.pagesRead >= this.pages;
    if (this.finished) {
      this.status = BookStatus.Read;
    }
  }
  deleteBook() {
    console.log(`Book ${this.title} deleted.`);
  }
}
exports.Book = Book;