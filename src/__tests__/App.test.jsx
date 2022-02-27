import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axios from 'axios';
import Home from '../pages/index';

const DUMMY_DATA = [
  {
    id: 'WLUNA-USD',
    base_currency: 'WLUNA',
    quote_currency: 'USD',
    base_min_size: '0.021',
    base_max_size: '29000',
    quote_increment: '0.01',
    base_increment: '0.001',
    display_name: 'WLUNA/USD',
    min_market_funds: '1',
    max_market_funds: '2300000',
    margin_enabled: false,
    fx_stablecoin: false,
    max_slippage_percentage: '0.03000000',
    post_only: false,
    limit_only: false,
    cancel_only: false,
    trading_disabled: false,
    status: 'online',
    status_message: '',
    auction_mode: false,
  },
  {
    id: 'POWR-EUR',
    base_currency: 'POWR',
    quote_currency: 'EUR',
    base_min_size: '1.3',
    base_max_size: '70000',
    quote_increment: '0.0001',
    base_increment: '0.1',
    display_name: 'POWR/EUR',
    min_market_funds: '0.84',
    max_market_funds: '43000',
    margin_enabled: false,
    fx_stablecoin: false,
    max_slippage_percentage: '0.03000000',
    post_only: false,
    limit_only: true,
    cancel_only: false,
    trading_disabled: false,
    status: 'online',
    status_message: '',
    auction_mode: false,
  },
  {
    id: 'UST-EUR',
    base_currency: 'UST',
    quote_currency: 'EUR',
    base_min_size: '0.96',
    base_max_size: '390000',
    quote_increment: '0.001',
    base_increment: '0.01',
    display_name: 'UST/EUR',
    min_market_funds: '0.84',
    max_market_funds: '340000',
    margin_enabled: false,
    fx_stablecoin: true,
    max_slippage_percentage: '0.01000000',
    post_only: false,
    limit_only: false,
    cancel_only: false,
    trading_disabled: false,
    status: 'online',
    status_message: '',
    auction_mode: false,
  },
];

// Mock out axios methods
jest.mock('axios');

// https://github.com/bvaughn/react-virtualized/issues/493
const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');

beforeEach(() => {
  axios.get.mockImplementation(() => Promise.resolve({ data: DUMMY_DATA }));
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 50 });
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 50 });
});

afterEach(() => {
  jest.clearAllMocks();
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
});

describe('Test Crypto Trading Pair Dashboard', () => {
  it('As a user I want to see a header, input, and table', async () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Crypto Trading Pair Dashboard/i,
    });

    expect(heading).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText(/Loading your data... 🤖/i));
    const firstRowName = screen.queryByText(DUMMY_DATA[0].display_name);
    const secondRowName = screen.queryByText(DUMMY_DATA[1].display_name);
    const thirdRowName = screen.queryByText(DUMMY_DATA[2].display_name);
    const input = screen.getByPlaceholderText(
      'Search by Name, Base Currency or, Quote Currency...'
    );

    expect(firstRowName).toBeInTheDocument();
    expect(secondRowName).toBeInTheDocument();
    expect(thirdRowName).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('As a user I want to be able to search for a crypto pair', async () => {
    render(<Home />);

    await waitForElementToBeRemoved(() => screen.getByText(/Loading your data... 🤖/i));
    const input = screen.getByPlaceholderText(
      'Search by Name, Base Currency or, Quote Currency...'
    );
    userEvent.type(input, 'POWR/EUR');
    const firstRowName = screen.queryByText(DUMMY_DATA[0].display_name);
    const secondRowName = screen.queryByText(DUMMY_DATA[1].display_name);
    const thirdRowName = screen.queryByText(DUMMY_DATA[2].display_name);

    expect(firstRowName).not.toBeInTheDocument();
    expect(secondRowName).toBeInTheDocument();
    expect(thirdRowName).not.toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('As a user I want to be able to sort crypto pair', async () => {
    render(<Home />);

    await waitForElementToBeRemoved(() => screen.getByText(/Loading your data... 🤖/i));
    userEvent.click(screen.getByText('Name'));
    let row1 = screen.getByTestId('table-row-0');
    let row2 = screen.getByTestId('table-row-1');
    let row3 = screen.getByTestId('table-row-2');

    expect(row1).toHaveTextContent('POWR/EUR');
    expect(row2).toHaveTextContent('UST/EUR');
    expect(row3).toHaveTextContent('WLUNA/USD');

    userEvent.click(screen.getByText('Name'));

    row1 = screen.getByTestId('table-row-0');
    row2 = screen.getByTestId('table-row-1');
    row3 = screen.getByTestId('table-row-2');

    expect(row1).toHaveTextContent('WLUNA/USD');
    expect(row2).toHaveTextContent('UST/EUR');
    expect(row3).toHaveTextContent('POWR/EUR');
  });
});
