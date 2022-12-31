import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    updateCell,
    cellClick,
    keyDown,
    keyUp,
} from "./redux/slices/spreadsheetSlice";
import styles from "./App.module.scss";
import Spreadsheet from "./Spreadsheet";

function App() {
    const cellInputRef = useRef(null);

    const spreadsheetData = useSelector((state) => state.spreadsheet.rows);
    const tableWidth = useSelector((state) => state.spreadsheet.width);
    const tableHeight = useSelector((state) => state.spreadsheet.height);
    const selection = useSelector((state) => state.spreadsheet.selection);
    const focus = useSelector((state) => state.spreadsheet.focus);
    const inputs = useSelector((state) => state.spreadsheet.inputs);
    console.log(inputs);
    const dispatch = useDispatch();

    useEffect(() => {
        const keydownHandler = (e) => {
            dispatch(keyDown({ key: e.key }));
            const [row, col] = focus;
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
            } else if (!["Meta", "Shift", "CapsLock", "Alt"].includes(e.key)) {
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
        };
        const keyupHandler = (e) => {
            dispatch(keyUp({ key: e.key }));
        };
        window.addEventListener("keydown", keydownHandler);
        window.addEventListener("keyup", keyupHandler);
        return () => {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
        };
    }, [selection]);

    const handleCellInputChange = (e) => {
        const [row, col] = focus;
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
            <input
                type="text"
                value={spreadsheetData[focus[0]][focus[1]].contents}
                onChange={handleCellInputChange}
                ref={cellInputRef}
            ></input>
            <Spreadsheet />
        </div>
    );
}

export default App;
