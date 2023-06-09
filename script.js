let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

function addBook(title, author, pages, read ) {
    var newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

//addBook("The Great Gatsby", "F. Scott Fitzgerald", 218, false); // test books
//addBook("To Kill a Mockingbird", "Harper Lee", 281, true); // test books


console.log(myLibrary); //test log

let addButton = document.querySelector(".add-book");
let checkbox = document.getElementById("checkbox");
let submitButton = document.getElementById("submit");
let cancelButton = document.getElementById("cancel");
let itemsDiv = document.getElementById('items');
let overlay = document.getElementById('overlay');

addButton.addEventListener('click', openForm);
cancelButton.addEventListener('click', closeForm);

function openForm() {
    document.getElementById("myForm").style.display = "flex";
    overlay.style.display = "block";
  }
  
function closeForm() { //closes form and clears previous content
    document.getElementById("myForm").style.display = "none";
    overlay.style.display = "none";
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    checkbox.checked = false;
  }

  //gets information and pushes once submitted
document.querySelector(".form-container").addEventListener("submit", function(event) { 
    event.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read;
    let checkbox = document.getElementById("checkbox");
    if (checkbox.checked) {
        read = true; 
    } else {
        read = false;
    }
    closeForm();
    addBook(title, author, pages, read);
    updateLibrary();
}); 

function updateLibrary() {
    let childDivs = itemsDiv.querySelectorAll('div');
    childDivs.forEach((div) => {
        div.remove();
      });
  myLibrary.forEach(function(obj){
    console.log(obj);
    console.log(myLibrary.indexOf(obj))
    let newItem = document.createElement('div')
    itemsDiv.appendChild(newItem);
    newItem.classList.add('item');
    let title = obj.title;
    let titleElement = document.createElement('h3');
    titleElement.textContent = 'Title: ' + title;
    newItem.appendChild(titleElement);
    let author = obj.author;
    let authorElement = document.createElement('h3');
    authorElement.textContent = 'By: ' + author;
    newItem.appendChild(authorElement);
    let pages = obj.pages;
    let pagesElement = document.createElement('h3');
    pagesElement.textContent = pages + ' Pages';
    newItem.appendChild(pagesElement);
    let readButton = document.createElement('button');
    readButton.classList.add('readButton');
    if (obj.read == true) {
        readButton.textContent = 'Read';
        readButton.classList.remove("active");
    } else {
        readButton.textContent = "Not read";
        readButton.classList.add("active");
    }
    readButton.addEventListener('click', function(){
        if (obj.read == true) {
            obj.read = false;
        } else {
            obj.read = true;
        }
        updateLibrary();
    })
    newItem.appendChild(readButton);
    let delButton = document.createElement('button')
    delButton.classList.add('deleteButton');
    delButton.textContent = "Delete";
    delButton.addEventListener('click', function() {
        let index = myLibrary.indexOf(obj);
        myLibrary.splice(index, 1);
        delButton.parentNode.remove()
    });
    newItem.appendChild(delButton);
  });
}