import { toast } from 'react-toastify';
import { useDeleteBooksMutation, useUpdateBooksMutation } from  "../store/apis/bookApi"
import { MdOutlineEdit, MdOutlineSave, MdOutlineDelete } from "react-icons/md";
import { useState, useRef, useEffect } from 'react';

const BookItem = ({ book }) => {
    const [deleteBook] = useDeleteBooksMutation();
    const [updateBook] = useUpdateBooksMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [editedBook, setEditedBook] = useState({BookName: book.BookName, Author: book.Author, Genre: book.Genre});
    const inputRefs = { BookName: useRef(null), Author: useRef(null), Genre: useRef(null),};

    const handleDelete = async () => {
        const result = await deleteBook(book._id);
        if (result.error) {
            toast.error(result.error.data?.message || 'Book deletion failed!');
        } else {
            toast.success('The book is deleted!');
        }
    };

    const handleUpdate = async () => {
        if (!editedBook.BookName.trim()) return;
        
    const result = await updateBook({ id: book._id, ...editedBook });
    
    if (result.error) {
    toast.error(result.error.data?.message || 'Failed to update the book!');
    } else {
    toast.success('Book updated successfully!');
    setIsEditing(false); }
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setEditedBook((prev) => ({
    ...prev,
    [name]: value,
  }));
};

    useEffect(() => {
        if (isEditing && inputRefs.BookName.current) {
            inputRefs.BookName.current.focus();
        }
    }, [isEditing]);


  return (
 <div className='book'>
    {isEditing ? (
      <button onClick={handleUpdate} className='edit'>
        <MdOutlineSave />
      </button>
    ) : (
      <button onClick={() => setIsEditing(true)} className='edit'>
        <MdOutlineEdit />
      </button>
    )}

    <button onClick={handleDelete} className='close'>
      <MdOutlineDelete />
    </button>

    <div>{new Date(book.createdAt).toLocaleString('sq-AL')}</div>

    {isEditing ? (
      <>
        <input
          ref={inputRefs.BookName}
          className='book-input'
          type="text"
          name="BookName"
          value={editedBook.BookName}
          onChange={handleChange}
          placeholder="Book Name"
        />
        <input
          ref={inputRefs.Author}
          className='book-input'
          type="text"
          name="Author"
          value={editedBook.Author}
          onChange={handleChange}
          placeholder="Author"
        />
        <input
          ref={inputRefs.Genre}
          className='book-input'
          type="text"
          name="Genre"
          value={editedBook.Genre}
          onChange={handleChange}
          placeholder="Genre"
        />
      </>
    ) : (
      <>
    <p className="timestamp">{book.timestamp}</p>
    <h2 className="title">{book.BookName}</h2>
    <p className="author"><strong>Author:</strong> {book.Author}</p>
    <p className="genre"><strong>Genre:</strong> {book.Genre}</p>
      </>
    )}
  </div>
  );
};

export default BookItem;