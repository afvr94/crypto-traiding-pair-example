import ThemeToggle from './ThemeToggle';

const Header = () => (
  <header className="flex items-center p-8 dark:bg-slate-600 dark:shadow-none bg-blue-500 shadow">
    <h2 className="text-2xl font-bold leading-7 text-white">Crypto Trading Pair Dashboard</h2>
    <ThemeToggle />
  </header>
);

export default Header;
