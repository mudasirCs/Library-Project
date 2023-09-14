const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks() {
  const booksDisplay = document.querySelector(".books-display");

  // Clear any existing book displays
  booksDisplay.innerHTML = "";

  // Loop through the library and create a book display for each book
  myLibrary.forEach((book, index) => {
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book");

    const bookImage = document.createElement("img");
    bookImage.src = "./assets/images/book.svg";
    bookImage.alt = "book-icon";

    const details = document.createElement("div");
    details.classList.add("details");
    details.innerHTML = `
      <p>Title: ${book.title}</p>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? "Yes" : "No"}</p>
    `;

    bookContainer.appendChild(bookImage);
    bookContainer.appendChild(details);

    booksDisplay.appendChild(bookContainer);
  });
}

// Example usage:
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("Philosophers Stone", "J.K Rowling", 340, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("Philosophers Stone", "J.K Rowling", 340, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("Philosophers Stone", "J.K Rowling", 340, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary(
  "Some ridiculous book with an extra long name",
  "bncklsklcns ascslnclascl shckls",
  340454543,
  true
);

// Display the books on the page
displayBooks();
