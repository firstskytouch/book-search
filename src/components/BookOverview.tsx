import * as React from 'react';

import { IBook } from '../services/books';

interface IBookProps {
  book: IBook;
}

const BookOverview: React.FC<IBookProps> = ({ book }) => {
  return (
    <div className="flex items-center text-sm">
      <div className="relative w-8 h-8 mr-3 rounded-full md:block">
        <img
          className="object-cover w-10 h-16 max-w-full max-h-full"
          src={book.coverImg}
          alt=""
          loading="lazy"
        />
      </div>
      <div>
        <p className="font-semibold text-black">{book.title}</p>
        <p className="text-xs text-gray-600">{book.authorName}</p>
      </div>
    </div>
  );
};

export default BookOverview;
