const asyncHandler = require('express-async-handler');
const Book = require('../models/bookModel');
const User = require('../models/userModel');


const getBooks = asyncHandler(async(req, res) => {
    const books = await Book.find({ user: req.user.id});
    res.status(200).json(books);
})


const setBooks = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.BookName) {
        res.status(400)
        throw new Error('Please enter a book');
    }

    const book = await Book.create({ BookName: req.body.BookName, Author: req.body.Author, Genre: req.body.Genre, user: req.user.id})
    res.status(200).json(book);
})

const updateBooks = asyncHandler(async(req, res) =>{
    const book = await Book.findById(req.params.id);

    if(!book){
        res.status(400);
        throw new Error('Book not found');
    }

    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401);
        throw new Error('No such user found');
    }
    if(book.user.toString() !== user.id){
        res.status(401);
        throw new Error('User is not authorized to update');
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedBook);
})

const deleteBooks = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if(!book){
        res.status(400);
        throw new Error('Book not found');
    }

    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401);
        throw new Error('No such user found');
    }

    if(book.user.toString() !== user.id){
        res.status(401);
        throw new Error('User is not authorized to delete');
    }

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
})



module.exports = {getBooks, setBooks, updateBooks, deleteBooks};