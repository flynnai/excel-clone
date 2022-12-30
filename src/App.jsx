import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Spreadsheet from "./Spreadsheet";

const spreadsheetDataTemplate = new Array(100).fill(0).map((_) =>
    new Array(26).fill(0).map((_) => ({
        width: 60,
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

    useEffect(() => {
        const keyPressHandler = (e) => {
            if (selection !== null) {
                console.log(e.Key);
            }
        };
        window.addEventListener("keypress", keyPressHandler);
        return () => {
            window.removeEventListener("keypress", keyPressHandler);
        };
    }, [selection]);

    const handleCellInputChange = (e) => {
        const [row, col] = selection;
        updateSpreadsheet(row, col, (cell) => ({ contents: e.target.value }));
    };

    return (
        <div className={styles.main}>
            {selection && (
                <input
                    type="text"
                    value={spreadsheetData[selection[0]][selection[1]].contents}
                    onChange={handleCellInputChange}
                ></input>
            )}
            <Spreadsheet rows={spreadsheetData} handleClick={handleClick} />
        </div>
    );
}

export default App;
