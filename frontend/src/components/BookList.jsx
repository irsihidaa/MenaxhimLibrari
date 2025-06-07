import { useGetBooksQuery } from "../store/apis/bookApi";
import Spinner from "./Spinner";
import BookItem from "./BookItem";

const BookList = ()  =>{
    const {data: books = [], isLoading, isError} = useGetBooksQuery();

    if(isLoading) return <Spinner />
    if(isError){
        return <p className="error">Error fetching books</p>;
    }
    return (
        <section className="content">
            {books.length > 0 ? (
                <div className="books">
                    {books.map(book => (
                        <BookItem key= {book._id} book = {book} />
                    ))}
                </div>
            ) : (
                <p>No books added!</p>
            )}
        </section>
    );
};

export default BookList