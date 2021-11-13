import { utilService } from './util-service.js';
import { booksJson } from './books.json.js';
import { storageService } from './async-storage-service.js';


const gToday = new Date().toISOString().split('T')[0];
const KEY = 'books';
const gBooks = _createBooks();
// const gReviews = _createReviews();


export const bookService = {
    query,
    remove,
    save,
    getEmptyBook,
    getById,
    addReview,
    getEmptyReview,
    getGoogleBooks,
    addGoogleBook,
    getNextBookId,
    getPreBookId,
};

function addGoogleBook(googleBook) {
    let newBook = getEmptyBook();
    newBook.id = googleBook.id;
    newBook.title = googleBook.volumeInfo.title;
    newBook.subtitle = googleBook.volumeInfo.subtitle;
    newBook.authors = googleBook.authors;
    newBook.publishedDate = googleBook.volumeInfo.publishedDate;
    newBook.description = googleBook.volumeInfo.description;
    newBook.pageCount = googleBook.volumeInfo.pageCount;
    newBook.categories = googleBook.volumeInfo.categories;
    newBook.thumbnail = googleBook.volumeInfo.imageLinks.thumbnail;
    newBook.language = googleBook.volumeInfo.language;
    return newBook;
}

function getGoogleBooks(value) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${value}`)
        .then(res => {
            console.log('Axios Res:', res.data.items);
            return res.data.items;
        })
}

function addReview(book, review) {

    // return getById(bookId).then(book => {
    if (!book['reviews']) book['reviews'] = [];
    book['reviews'].push(review);
    return storageService.put(KEY, book);
    // });
}

function getEmptyReview() {
    return {
        id: utilService.makeId(),
        name: '',
        date: gToday,
        rate: 0,
        text: '',
    }
}

function query() {
    return storageService.query(KEY);
}

function remove(bookId) {
    // const idx = gBooks.findIndex(book => book.id === bookId);
    // gBooks.splice(idx, 1);
    // utilService.saveToStorage(KEY, gBooks);
    return storageService.remove(KEY, bookId);

}

function save(book) {
    // book.id = utilService.makeId();
    // gBooks.unshift(book);
    // utilService.saveToStorage(KEY, gBooks);
    // if (book.id) return storageService.put(KEY, book);
    // else 
    return storageService.post(KEY, book);

}

function getById(bookId) {
    return storageService.get(KEY, bookId);
}

function getNextBookId(bookId) {
    return query()
        .then(books => {
            const idx = books.findIndex(book => book.id === bookId);
            return (idx === books.length - 1) ? books[0].id : books[idx + 1].id;
        });
}

function getPreBookId(bookId) {
    return query()
        .then(books => {
            const idx = books.findIndex(book => book.id === bookId);
            return (idx === 0) ? books[books.length - 1].id : books[idx - 1].id;
        });
}

function getEmptyBook() {
    return {
        id: '',
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: 0,
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: '',
        language: '',
        listPrice: {
            amount: Date.now() % 100 + 30,
            currencyCode: 'EUR',
            isOnSale: false
        }
    };
}

function _createBooks() {
    let books = utilService.loadFromStorage(KEY);
    if (!books || !books.length) {
        books = [];
        books = booksJson.getBooks();

        utilService.saveToStorage(KEY, books);
    }
    return books;
}