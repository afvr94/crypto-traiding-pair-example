/* eslint-disable react/prop-types */
import { useCallback, useState } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Highlighter from 'react-highlight-words';
import classNames from 'classnames';
import { Order } from '../constants';
import Modal from './Modal';

const Table = ({ columns, data, searchText, sorting, onSort }) => {
  const [description, setDescription] = useState('');
  const isModalOpen = description.length > 0;

  const handleOnClickMoreInfo = (payload) => {
    // formatting json to add to modal
    setDescription(JSON.stringify(payload, null, 2));
  };

  const handleOnCloseModal = () => {
    setDescription('');
  };

  const RenderRow = useCallback(
    ({ index, style }) => {
      return (
        <div style={style} className="tr" data-testid={`table-row-${index}`}>
          {columns.map((column) => (
            <div className={classNames('td', column.cellClassName)} key={column.key}>
              <Highlighter
                highlightClassName="search-text-highlight"
                searchWords={[column.isSearchable ? searchText : '']}
                autoEscape
                textToHighlight={(() => {
                  if (typeof data[index][column.key] === 'boolean') {
                    return data[index][column.key] ? 'YES' : 'NO';
                  }
                  return data[index][column.key];
                })()}
              />
            </div>
          ))}
          <div className="td items-center">
            <button
              type="button"
              className="ml-auto rounded bg-blue-500 px-2 py-1 text-white"
              onClick={() => handleOnClickMoreInfo(data[index])}
            >
              More Info
            </button>
          </div>
        </div>
      );
    },
    [columns, data, searchText]
  );

  return (
    <>
      {isModalOpen && <Modal description={description} onClose={handleOnCloseModal} />}
      <div className="table">
        <div className="tr">
          {columns.map((column) => (
            <button
              type="button"
              className="th"
              onClick={() => onSort(column.key)}
              key={column.key}
            >
              <div className={column.headerClassName}>
                <p>{column.header}</p>
                {sorting.sortBy === column.key && (
                  <span className="ml-2">{sorting.order === Order.DESCENDING ? '🔽' : '🔼'}</span>
                )}
              </div>
            </button>
          ))}
          <div className="th" />
        </div>

        <div className="tbody">
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList height={height} itemCount={data.length} itemSize={60} width={width}>
                {RenderRow}
              </FixedSizeList>
            )}
          </AutoSizer>
        </div>
      </div>
    </>
  );
};

export default Table;
