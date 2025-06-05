import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSetBooksMutation } from '../store/apis/bookApi';

const BookForm = () => {
  const [bookData, setBookData] = useState({
    BookName: '',
    Author: '',
    Genre: '',
  });

  const [setBooks, { isLoading }] = useSetBooksMutation();

  const onChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();


    if (!bookData.BookName.trim() || !bookData.Author.trim() || !bookData.Genre.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await setBooks(bookData);
      setBookData({ BookName: '', Author: '', Genre: '' });
      toast.success('Book added successfully!');
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="BookName">Book Name</label>
          <input
            type="text"
            id="BookName"
            name="BookName"
            value={bookData.BookName}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Author">Author</label>
          <input
            type="text"
            id="Author"
            name="Author"
            value={bookData.Author}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Genre">Genre</label>
          <input
            type="text"
            id="Genre"
            name="Genre"
            value={bookData.Genre}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Book'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default BookForm;
