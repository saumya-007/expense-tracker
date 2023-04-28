const TableRow = (props) => {
  return (
    <tr className="text-gray-700 dark:text-gray-400">
      {props.children}
    </tr>
  );
};

export default TableRow;
