const myLibrary = [];
const addBookModal = document.getElementById("add-book-modal");
const addBookButton = document.getElementById("add-book");
const submitBookButton = document.querySelector("#confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

cancelBtn.addEventListener("click", function () {
  addBookModal.close();
});

addBookButton.addEventListener("click", () => {
  addBookModal.showModal();
});

submitBookButton.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  if (!title || !author || !pages) {
    alert("Please fill in all required fields.");
    return; // Do not proceed with adding the book
  }

  addBookToLibrary(title, author, pages, read);

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;

  addBookModal.close();

  displayBooks();
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks() {
  const booksDisplay = document.querySelector(".books-display");

  booksDisplay.innerHTML = "";

  myLibrary.forEach((book, index) => {
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
      displayBooks();
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
      myLibrary.splice(index, 1);
      displayBooks();
    });

    bookContainer.appendChild(bookImage);
    bookContainer.appendChild(details);
    bookContainer.appendChild(removeButton);

    booksDisplay.appendChild(bookContainer);
  });
}

// Example usage:
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("Philosophers Stone", "J.K Rowling", 340, true);

// Display the books on the page
displayBooks();
