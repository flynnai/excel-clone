import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCell, cellClick } from "./redux/slices/spreadsheetSlice";
import styles from "./App.module.scss";
import Spreadsheet from "./Spreadsheet";

function App() {
    const cellInputRef = useRef(null);

    const spreadsheetData = useSelector((state) => state.spreadsheet.rows);
    const tableWidth = useSelector((state) => state.spreadsheet.width);
    const tableHeight = useSelector((state) => state.spreadsheet.height);
    const selection = useSelector((state) => state.spreadsheet.selection);

    const dispatch = useDispatch();

    useEffect(() => {
        const keydownHandler = (e) => {
            if (Object.keys(selection).length) {
                const [row, col] = Object.values(selection)[0];
                if (e.key === "ArrowUp") {
                    if (row > 0) {
                        e.preventDefault();
                        // handleClick(row - 1, col);
                        cellInputRef.current.blur();
                    }
                } else if (e.key === "ArrowDown") {
                    if (row < tableHeight) {
                        e.preventDefault();
                        // handleClick(row + 1, col);
                        cellInputRef.current.blur();
                    }
                } else if (e.key === "ArrowLeft") {
                    if (col > 0) {
                        e.preventDefault();
                        // handleClick(row, col - 1);
                        cellInputRef.current.blur();
                    }
                } else if (e.key === "ArrowRight") {
                    if (col < tableWidth) {
                        e.preventDefault();
                        // handleClick(row, col + 1);
                        cellInputRef.current.blur();
                    }
                } else if (
                    !["Meta", "Shift", "CapsLock", "Alt"].includes(e.key)
                ) {
                    console.log(e.key);
                    // if necessary, clear cell contents and focus input
                    if (document.activeElement !== cellInputRef.current) {
                        dispatch(
                            updateCell({
                                row,
                                col,
                                updates: { contents: "" },
                            })
                        );
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
        const [row, col] = Object.values(selection)[0];
        dispatch(
            updateCell({
                row,
                col,
                updates: { contents: e.target.value },
            })
        );
    };

    return (
        <div className={styles.main}>
            {Object.keys(selection).length && (
                <input
                    type="text"
                    value={
                        spreadsheetData[Object.values(selection)[0][0]][
                            Object.values(selection)[0][1]
                        ].contents
                    }
                    onChange={handleCellInputChange}
                    ref={cellInputRef}
                ></input>
            )}
            <Spreadsheet />
        </div>
    );
}

export default App;
