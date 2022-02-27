import classNames from 'classnames';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
      document.documentElement.classList.remove('dark');

      localStorage.setItem('theme', 'light');
      setIsChecked(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsChecked(true);
    }
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
      setIsChecked(true);
      return;
    }
    setIsChecked(false);
  }, []);

  return (
    <div className="flex items-center ml-auto">
      <p className="mr-3 text-white dark:text-slate-300 font-normal text-sm">Switch theme</p>
      <label
        className={classNames('toggle-label toggle', isChecked && 'checked')}
        htmlFor="theme-toggle"
      >
        <input
          className="toggle-checkbox"
          name="theme-toggle"
          id="theme-toggle"
          type="checkbox"
          checked={isChecked}
          onChange={handleOnChange}
        />
        <span className="toggle-button" />
      </label>
    </div>
  );
};

export default ThemeToggle;
