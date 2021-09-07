import _ from 'lodash';
import * as React from 'react';

import cn from 'classnames';

import BookOverview from '../components/BookOverview';
import { EnhancedTableHead, KeyType, Order } from '../components/EnhancedTableHead';
import { getBooks, IBook } from '../services/books';

const DEBOUNCE_DELAY = 500;

const Home = () => {
  const [searchKey, setSearchKey] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [books, setBooks] = React.useState<IBook[]>([]);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<KeyType>('title');

  React.useEffect(() => {
    handleSearch(searchKey);
  }, [searchKey]);

  const debouncedSave = _.debounce(nextValue => setSearchKey(nextValue), DEBOUNCE_DELAY);

  const handleSearch = async (key: string) => {
    setBooks([]);
    if (!key) {
      return;
    }
    setLoading(true);
    const result = await getBooks(key);
    setBooks(result);
    setLoading(false);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: KeyType) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredBooks = _.filter(_.orderBy(books, orderBy, order));

  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="relative w-96 max-w-full mb-8">
        <input
          type="text"
          placeholder="Search Book"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={e => debouncedSave(e.target.value)}
        />
        <div
          className={cn('flex justify-center items-center absolute right-4 top-3', {
            hidden: !loading
          })}>
          <div className="animate-spin rounded-full h-4 w-4 border-b border-gray-900"></div>
        </div>
      </div>

      {filteredBooks.length > 0 && (
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <tbody className="bg-white">
                {filteredBooks.map(book => (
                  <tr className="text-gray-700" key={book.key}>
                    <td className="px-4 py-3 border">
                      <BookOverview book={book} />
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">{book.title}</td>
                    <td className="px-4 py-3 text-xs border">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        {book.authorName}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border">{book.publishDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
