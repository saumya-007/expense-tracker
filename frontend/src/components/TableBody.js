const TableBody = (props) => {
  const tableRows = props.children;
  return (
    <tbody className="">
      {tableRows}
    </tbody>
  );
};

export default TableBody;
