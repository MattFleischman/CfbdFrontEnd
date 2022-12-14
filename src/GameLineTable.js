import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable, useAsyncDebounce } from "react-table";
import tw from "twin.macro";

const SearchContainer = tw.div`
  mb-6
  mt-6
  flex
  items-center
`;

const SearchText = tw.h2`
  text-xl
text-gray-600
  mr-6
`;

const Input = tw.input`
  h-8
  border-2
  border-solid
  border-green-500
  outline-none
  p-4
  rounded-lg
`;

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <SearchContainer>
      <SearchText>Search:</SearchText>
      <Input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </SearchContainer>
  );
}


const Table = tw.table`
  table-fixed
  text-base
  text-gray-300
`;

const TableHead = tw.thead`
  p-2
`;

const TableRow = tw.tr`
border
border-blue-500
`;

const TableHeader = tw.th`
border
border-green-500
p-2
`;

const TableBody = tw.tbody`
`;

const TableData = tw.td`
border
border-green-500
p-5
`;

const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-black
  rounded-md
  bg-green-300
  hover:bg-green-200
  transition-colors
`;

export default function GameLineTable(props) {
  const [GameLines, setGameLines] = useState([]);

  const fetchGameLines = async (week) => {
    console.log(`fetching game prediction results for week: ${week}`)
    const response = await axios
      .get(`https://txm0cfndf9.execute-api.us-east-1.amazonaws.com/Prod/prediction_output?week=${week}`)
      .catch((err) => console.log(err));
    if (response) {
      const GameLines = response.data;

      console.log("GameLines: ", GameLines);
      setGameLines(GameLines);
    }
  };

  const GameLinesData = useMemo(() => [...GameLines], [GameLines]);

  const GameLineColumns = useMemo(
    () =>
      GameLines[0]
        ? Object.keys(GameLines[0])
            .filter((key) => key !== "week")
            .map((key) => {
              if (["home_logo","away_logo"].includes(key))
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => <img style={{width:"150px", height:"150px"}} src={value} />,
                  maxWidth: 70,
                };
              if(["home_pred_points","away_pred_points"].includes(key))
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => Math.round(value)
                };
              if(["home_talent_rating","away_talent_rating"].includes(key))
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => Math.round(value * 1000)/1000
                };
              return { Header: key, accessor: key };
            })
        : [],
    [GameLines]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Details",
        Header: "Details",
        Cell: ({ row }) => (
          <Button onClick={() => alert("Hold your horses! \nGames detail view has not been implemented yet...geeze")}>
            Details
          </Button>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: GameLineColumns,
      data: GameLinesData,
    },
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  useEffect(() => {
    fetchGameLines(props.week);
  }, [props.week]);

  const isEven = (idx) => idx % 2 === 0;

  console.log("GameLineTable week: " + props.week)

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);

            return (
              <TableRow
                {...row.getRowProps()}
                className={isEven(idx) ? "bg-green-400 bg-opacity-30" : ""}
              >
                {row.cells.map((cell, idx) => (
                  <TableData {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableData>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}