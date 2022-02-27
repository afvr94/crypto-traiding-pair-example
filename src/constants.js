export const Order = {
  ASCENDING: 'asc',
  DESCENDING: 'desc',
};

export const COLUMNS = [
  {
    key: 'display_name',
    header: 'Name',
    cellClassName: '',
    headerClassName: 'flex justify-start items-center',
    isSearchable: true,
  },
  {
    key: 'base_currency',
    header: 'Base Currency',
    cellClassName: 'justify-center items-center',
    headerClassName: 'flex justify-center items-center',
    isSearchable: true,
  },
  {
    key: 'quote_currency',
    header: 'Quote Currency',
    cellClassName: 'justify-center items-center',
    headerClassName: 'flex justify-center items-center',
    isSearchable: true,
  },
  {
    key: 'trading_disabled',
    header: 'Trading disabled',
    cellClassName: 'justify-center items-center',
    headerClassName: 'flex justify-center items-center',
    isSearchable: false,
  },
];
