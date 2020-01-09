//class Book: to store the books
class Book{
    //to initialize the book class
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//class UI: to play the with UI components
class UI{
    //we do not to initialize anything here
    //just create static methods to display the books
    //storing books in local storage 

    static displayBooks(){

        const books = StoreBook.getbooks();

        //now loop through the array books
        books.forEach(function(book){
            UI.addBooksToList(book );
        });

    }

    static addBooksToList(book){
        //grab the tbody
        let list = document.querySelector("#book-list");

        //create a tr
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a class='btn btn-warning btn-sm delete'>X</a></td>
        `;

        //append everything in tr
        list.append(row);
        
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            
            el.parentElement.parentElement.remove();
        }
    }

    //show alert
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.main-div');
        const form = document.querySelector('#myForm');
        container.insertBefore(div, form);

        //vanish it
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
    }
    //clear all the fields
    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}

//book storage class: to store books dynamically..
class StoreBook{
    static getbooks(){
        let books;
        if(localStorage.getItem('books') === null ){
            books =[];

        }else{
            books = JSON.parse(localStorage.getItem('books'));

        }
        return books;
    }

    static addBook(book){
        const books = StoreBook.getbooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = StoreBook.getbooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                console.log(books.splice(index, 1));
                books.splice(index, 1);
                
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
// event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//event: AddBooks
document.querySelector('#myForm').addEventListener('submit', (e) => {
    
    e.preventDefault();

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if (title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill all fields', 'danger');
    }
    else{
    
        //Instantiate Book
        const book = new Book(title, author, isbn);

        //Add book to UI
        UI.addBooksToList(book);

        StoreBook.addBook(book);
        UI.showAlert('Book Added', 'success');

        //clearFields
        UI.clearFields();
    }
    

});

//event: delete Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    console.log(e.target.parentElement.previousElementSibling.textContent);
    StoreBook.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Book Removed', 'success');


});