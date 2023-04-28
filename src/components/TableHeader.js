const TableHeader = (props) => {
  const headers = props.headers;
  return (
    <thead>
      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
        {headers.map((header) => (
          <th className="px-4 py-3" key={header}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
