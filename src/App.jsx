import { useState } from "react";
import styles from "./App.module.scss";
import Spreadsheet from "./Spreadsheet";

const spreadsheetDataTemplate = new Array(100).fill(0).map((_) =>
    new Array(26).fill(0).map((_) => ({
        width: 30,
        height: null,
        contents: String("f"),
        selected: false,
    }))
);

function App() {
    const [spreadsheetData, setSpreadsheetData] = useState(
        spreadsheetDataTemplate
    );
    const [selection, setSelection] = useState(null);

    const updateSpreadsheet = (rowNum, colNum, functor) => {
        setSpreadsheetData((curr) =>
            curr.map((row, currRowNum) =>
                currRowNum !== rowNum
                    ? row
                    : row.map((cell, currColNum) =>
                          currColNum !== colNum ? cell : functor(cell)
                      )
            )
        );
    };

    const handleClick = (row, col) => {
        if (selection !== null) {
            const [oldRow, oldCol] = selection;
            updateSpreadsheet(oldRow, oldCol, (cell) => ({
                ...cell,
                selected: false,
            }));
        }
        setSelection([row, col]);
        updateSpreadsheet(row, col, (cell) => ({
            ...cell,
            selected: true,
        }));
    };

    return <Spreadsheet rows={spreadsheetData} handleClick={handleClick} />;
}

export default App;
