import debounce from 'lodash/debounce';
import * as React from 'react';

import cn from 'classnames';

import { getBooks, IBook } from '../services/books';

const DEBOUNCE_DELAY = 500;

interface ISearchProps {
  onSelectItem: (key: string) => void;
}

const Search: React.FC<ISearchProps> = ({ onSelectItem }) => {
  const [searchKey, setSearchKey] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [books, setBooks] = React.useState<IBook[]>([]);

  React.useEffect(() => {
    handleSearch();
  }, [searchKey]);

  const debouncedSave = React.useCallback(
    debounce(nextValue => setSearchKey(nextValue), DEBOUNCE_DELAY),
    []
  );

  const handleSearch = async () => {
    setBooks([]);
    if (!searchKey) {
      return;
    }
    setLoading(true);
    const result = await getBooks(searchKey);
    setBooks(result);
    setLoading(false);
  };

  return (
    <div className="relative">
      <div>
        <input
          type="text"
          placeholder="Search Book"
          className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={e => debouncedSave(e.target.value)}
        />
        <div
          className={cn('flex justify-center items-center absolute right-4 top-3', {
            hidden: !loading
          })}>
          <div className="animate-spin rounded-full h-4 w-4 border-b border-gray-900"></div>
        </div>
      </div>

      {books.length > 0 && (
        <ul className="absolute w-full bg-white">
          {books.map(book => (
            <li className="list-none p-2 border-t border-gray-300">
              <a
                className="flex no-underline"
                onClick={() => onSelectItem(book.key)}
                key={book.key}>
                <img className="w-10 h-15 mr-3" src={book.coverImg} alt="" />
                <span className="font-light">
                  <div className="font-medium">{book.title}</div> by{' '}
                  <span className="text-blue-900">{book.authorName}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
