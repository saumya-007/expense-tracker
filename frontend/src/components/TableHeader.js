const TableHeader = (props) => {
  const headers = props.headers;
  return (
    <thead>
      <tr className="">
        {headers.map((header) => (
          <th className="" key={header}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
