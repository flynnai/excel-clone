import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./redux/slices/spreadsheetSlice";
import styles from "./App.module.scss";
import Spreadsheet from "./Spreadsheet";

const TABLE_WIDTH = 26;
const TABLE_HEIGHT = 100;
const spreadsheetDataTemplate = new Array(TABLE_HEIGHT).fill(0).map((_) =>
    new Array(TABLE_WIDTH).fill(0).map((_) => ({
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
    const cellInputRef = useRef(null);

    const count = useSelector((state) => state.spreadsheet.value);
    const dispatch = useDispatch();
    console.log("COUNT IS", count);

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
        dispatch(increment());
        console.log("Handleclick: ", row, col);
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
        const keydownHandler = (e) => {
            if (selection !== null) {
                const [row, col] = selection;
                if (e.key === "ArrowUp") {
                    if (row > 0) {
                        e.preventDefault();
                        handleClick(row - 1, col);
                        cellInputRef.current.blur();
                    }
                } else if (e.key === "ArrowDown") {
                    if (row < TABLE_HEIGHT) {
                        e.preventDefault();
                        handleClick(row + 1, col);
                        cellInputRef.current.blur();
                    }
                } else if (e.key === "ArrowLeft") {
                    if (col > 0) {
                        e.preventDefault();
                        handleClick(row, col - 1);
                        cellInputRef.current.blur();
                    }
                } else if (e.key === "ArrowRight") {
                    if (col < TABLE_WIDTH) {
                        e.preventDefault();
                        handleClick(row, col + 1);
                        cellInputRef.current.blur();
                    }
                } else if (
                    !["Meta", "Shift", "CapsLock", "Alt"].includes(e.key)
                ) {
                    console.log(e.key);
                    // if necessary, clear cell contents and focus input
                    if (document.activeElement !== cellInputRef.current) {
                        updateSpreadsheet(row, col, (cell) => ({
                            ...cell,
                            contents: "",
                        }));
                        cellInputRef.current.focus();
                    }
                }
                console.log(e.key);
            }
        };
        window.addEventListener("keydown", keydownHandler);
        return () => {
            window.removeEventListener("keydown", keydownHandler);
        };
    }, [selection]);

    const handleCellInputChange = (e) => {
        const [row, col] = selection;
        updateSpreadsheet(row, col, (cell) => ({
            ...cell,
            contents: e.target.value,
        }));
    };

    return (
        <div className={styles.main}>
            {selection && (
                <input
                    type="text"
                    value={spreadsheetData[selection[0]][selection[1]].contents}
                    onChange={handleCellInputChange}
                    ref={cellInputRef}
                ></input>
            )}
            <Spreadsheet rows={spreadsheetData} handleClick={handleClick} />
        </div>
    );
}

export default App;
