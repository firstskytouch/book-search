import axios from 'axios';

const API_BASE = 'http://openlibrary.org';
const COVER_BASE = 'http://covers.openlibrary.org';
const DEFAULT_AVATAR = `${API_BASE}/static/images/icons/avatar_book-sm.png`;

interface IBookListResponse {
  docs: any[];
  numFound: number;
  numFoundExact: boolean;
  num_found: number;
  offset: any;
  q: string;
  start: number;
}

export interface IBook {
  key: string;
  title: string;
  coverImg: string;
  authorName: string;
  publishDate: string;
}

export const getBooks = async (searchKey: string) => {
  const res = await axios.get(`${API_BASE}/search.json`, {
    params: {
      q: searchKey,
      _facet: false,
      _spellcheck_count: 0,
      limit: 10,
      mode: 'everything',
      fields: 'key,cover_i,title,author_name,name,publish_date'
    }
  });

  const data: IBookListResponse = res.data;

  return data.docs.slice(0, 10).map(doc => {
    const {
      key,
      title,
      cover_i: cover = '',
      author_name: authorName = [],
      publish_date: publishDate = []
    } = doc;
    return {
      key,
      title,
      coverImg: `${COVER_BASE}/b/id/${cover}-S.jpg?default=${DEFAULT_AVATAR}`,
      authorName: authorName[0] || '',
      publishDate: publishDate[0] || ''
    } as IBook;
  });
};

export const getBookDetail = async (isbn: string) => {
  const res = await axios.get(`${API_BASE}/api/volumes/brief/isbn/${isbn}.json`);
  const data = res.data;
  return [];
};
