import React, { useState, useEffect } from 'react';
import BackButton from './home/BackButton';
import Spinner from './home/Spinner';
import { Link } from 'react-router-dom';

const ShowBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/books/')
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('An error happened. Please check the console:', error);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Books</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {books.map((book) => (
            <div
              key={book._id}
              className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 my-4'
            >
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Title</span>
                <span>{book.title}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Author</span>
                <span>{book.author}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                <span>{book.publishYear}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                <span>{new Date(book.createdAt).toString()}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
                <span>{new Date(book.updatedAt).toString()}</span>
              </div>
              <Link to={`/books/${book._id}`} className='p-2 bg-sky-300'>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowBooks;
