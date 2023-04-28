const TableBody = (props) => {
  const tableRows = props.children;
  return (
    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
      {tableRows}
    </tbody>
  );
};

export default TableBody;
