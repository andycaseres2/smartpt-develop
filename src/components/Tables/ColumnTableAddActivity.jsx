const ColumnTableAddActivity = ({
  columnTitlesActivity,
  columnWidths,
  readOnly,
}) => {
  return (
    <tr className="justify-start flex w-full gap-5 py-2 border-b border-gray-200 px-4">
      {columnTitlesActivity
        .slice(0, readOnly ? -1 : columnTitlesActivity.length)
        .map((title, index) => (
          <th
            key={index}
            className={`${columnWidths[index]} flex justify-start`}
          >
            {title}
          </th>
        ))}
    </tr>
  );
};

export default ColumnTableAddActivity;