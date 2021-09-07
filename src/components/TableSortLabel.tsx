import * as React from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

import { Order } from './EnhancedTableHead';

interface ITableSortLabelProps {
  active: boolean;
  onClick: (event: React.MouseEvent<unknown>) => void;
  direction: Order;
}
const TableSortLabel: React.FC<ITableSortLabelProps> = ({
  active,
  direction,
  onClick,
  children
}) => {
  return (
    <div className="flex items-center" onClick={onClick}>
      {children}
      {active && (
        <div className="w-4 ml-2">
          {direction === 'asc' ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </div>
      )}
    </div>
  );
};

export default TableSortLabel;
