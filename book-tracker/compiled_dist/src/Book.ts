export enum BookStatus {
    Read = "Read",
    ReRead = "Re-read",
    DNF = "DNF",
    CurrentlyReading = "Currently reading",
    ReturnedUnread = "Returned Unread",
    WantToRead = "Want to read"
  }
  
  export enum BookFormat {
    Print = "Print",
    PDF = "PDF",
    Ebook = "Ebook",
    AudioBook = "AudioBook"
  }
  
  export class Book {
    title: string;
    author: string;
    pages: number;
    status: BookStatus;
    price: number;
    pagesRead: number;
    format: BookFormat;
    suggestedBy: string;
    finished: boolean;
  
    constructor(
      title: string,
      author: string,
      pages: number,
      status: BookStatus,
      price: number,
      pagesRead: number,
      format: BookFormat,
      suggestedBy: string
    ) {
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
  
    currentlyAt(page: number): void {
      this.pagesRead = page;
      this.finished = this.pagesRead >= this.pages;
      if (this.finished) {
        this.status = BookStatus.Read;
      }
    }
  
    deleteBook(): void {
      console.log(`Book ${this.title} deleted.`);
    }
  }
  