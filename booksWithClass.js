class Book {
  title;
  author;
  pages;
  read;
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

class Library {
  myLibrary;
  constructor() {
    this.myLibrary = [];
    this.addBookModal = document.getElementById("add-book-modal");
    this.addBookButton = document.getElementById("add-book");
    this.submitBookButton = document.querySelector("#confirmBtn");
    this.cancelBtn = document.getElementById("cancelBtn");

    this.cancelBtn.addEventListener("click", () => {
      this.addBookModal.close();
    });
    // hav to track down why this is not working
    this.addBookButton.addEventListener("click", () => {
      this.addBookModal.showModal();
    });

    this.submitBookButton.addEventListener("click", (e) => {
      e.preventDefault();

      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const pages = document.getElementById("pages").value;
      const read = document.getElementById("read").checked;

      if (!title || !author || !pages) {
        alert("Please fill in all required fields.");
        return; // Do not proceed with adding the book
      }

      this.addBookToLibrary(title, author, pages, read);

      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      document.getElementById("pages").value = "";
      document.getElementById("read").checked = false;

      this.addBookModal.close();

      this.displayBooks();
    });
  }

  addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    this.myLibrary.push(newBook);
  }

  displayBooks() {
    const booksDisplay = document.querySelector(".books-display");

    booksDisplay.innerHTML = "";

    this.myLibrary.forEach((book, index) => {
      const bookContainer = document.createElement("div");
      bookContainer.classList.add("book");

      const bookImage = document.createElement("img");
      if (book.read) {
        bookImage.src = "./assets/images/book-open.svg";
        bookImage.classList.add("book-open");
      } else {
        bookImage.src = "./assets/images/book.svg";
      }
      bookImage.alt = "book-icon";

      bookImage.addEventListener("click", (e) => {
        book.toggleReadStatus();
        if (book.read) {
          bookImage.src = "./assets/images/book-open.svg";
          bookImage.classList.add("book-open");
        } else {
          bookImage.classList.remove("book-open");
          bookImage.src = "./assets/images/book.svg";
        }
        this.displayBooks();
      });

      const details = document.createElement("div");
      details.classList.add("details");
      details.innerHTML = `
          <p>Title: ${book.title}</p>
          <p>Author: ${book.author}</p>
          <p>Pages: ${book.pages}</p>
          <p>Read: ${book.read ? "yes" : "no"}</p>
        `;

      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-button");

      removeButton.addEventListener("click", () => {
        this.myLibrary.splice(index, 1);
        this.displayBooks();
      });

      bookContainer.appendChild(bookImage);
      bookContainer.appendChild(details);
      bookContainer.appendChild(removeButton);

      booksDisplay.appendChild(bookContainer);
    });
  }
}

const library = new Library();
library.addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
library.addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
library.addBookToLibrary("Philosophers Stone", "J.K Rowling", 340, true);
library.displayBooks();
