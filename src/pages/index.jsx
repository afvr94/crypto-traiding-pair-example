import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header, Table, Input } from '../components';
import { Order, COLUMNS } from '../constants';

const Homepage = () => {
  const [tradingPairs, setTradingPairs] = useState([]);
  const [filteredTradingPairs, setFilteredTradingPairs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sorting, setSorting] = useState({
    sortBy: '',
    order: Order.ASCENDING,
  });

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
      return;
    }
    document.documentElement.classList.remove('dark');
  }, []);

  useEffect(() => {
    (async () => {
      const { data: result } = await axios.get('https://api.exchange.coinbase.com/products');
      const onlineTradingPairs = result.filter((item) => item.status === 'online');
      setTradingPairs(onlineTradingPairs);

      setFilteredTradingPairs(onlineTradingPairs);
    })();
  }, []);

  const handleOnSearchChange = (event) => {
    const inputSearchText = event.target.value;
    setSearchText(inputSearchText);
    if (!inputSearchText) {
      setFilteredTradingPairs(tradingPairs);
      return;
    }
    const filterData = tradingPairs.filter((item) => {
      const lowerCaseSearch = inputSearchText.toLowerCase();
      return (
        item.display_name.toLowerCase().includes(lowerCaseSearch) ||
        item.base_currency.toLowerCase().includes(lowerCaseSearch) ||
        item.quote_currency.toLowerCase().includes(lowerCaseSearch)
      );
    });
    setFilteredTradingPairs(filterData);
  };

  const handleOnSort = (sortBy) => {
    let newOrder = Order.ASCENDING;
    if (sortBy === sorting.sortBy && sorting.order === Order.ASCENDING) {
      newOrder = Order.DESCENDING;
    }

    const tradingPairsSorted = [...filteredTradingPairs];
    tradingPairsSorted.sort((itemA, itemB) => {
      if (itemA[sortBy] < itemB[sortBy]) {
        return newOrder === Order.ASCENDING ? -1 : 1;
      }
      if (itemA[sortBy] > itemB[sortBy]) {
        return newOrder === Order.ASCENDING ? 1 : -1;
      }
      return 0;
    });

    setFilteredTradingPairs(tradingPairsSorted);
    setSorting({ sortBy, order: newOrder });
  };

  return (
    <div className="flex flex-col min-h-full dark:bg-slate-900 min-w-max h-full bg-gray-200">
      <Header />
      <div className="flex flex-col h-full p-10">
        <Input onChange={handleOnSearchChange} />
        <Table
          columns={COLUMNS}
          data={filteredTradingPairs}
          searchText={searchText}
          sorting={sorting}
          onSort={handleOnSort}
        />
      </div>
    </div>
  );
};

export default Homepage;
