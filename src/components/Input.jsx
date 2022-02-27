// eslint-disable-next-line react/prop-types
const Input = ({ onChange }) => {
  return (
    <input
      className="px-4 py-2 mb-8 rounded w-full md:w-1/2 border border-gray-400 dark:border-slate-100"
      placeholder="Search by Name, Base Currency or, Quote Currency..."
      onChange={onChange}
    />
  );
};

export default Input;
