import * as React from 'react';

import TableSortLabel from './TableSortLabel';

export type Order = 'asc' | 'desc';

export type KeyType = 'title' | 'authorName' | 'publishDate';

interface HeadCell {
  id: KeyType;
  label: string;
}

const headCells: HeadCell[] = [
  { id: 'title', label: 'Title' },
  { id: 'authorName', label: 'Author' },
  { id: 'publishDate', label: 'Published Date' }
];

interface IEnhancedTableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: KeyType) => void;
  order: Order;
  orderBy: string;
}

export const EnhancedTableHead: React.FC<IEnhancedTableHeadProps> = props => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: KeyType) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
        <th className="px-4 py-3">Overview</th>
        {headCells.map(headCell => (
          <th className="px-4 py-3" key={headCell.id}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
            </TableSortLabel>
          </th>
        ))}
      </tr>
    </thead>
  );
};
