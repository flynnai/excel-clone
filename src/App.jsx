import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { arrowKeyDown, updateCell } from "./redux/slices/spreadsheetSlice";
import styles from "./App.module.scss";
import Spreadsheet from "./Spreadsheet";

function App() {
    const cellInputRef = useRef(null);

    const spreadsheetData = useSelector((state) => state.spreadsheet.rows);
    const tableWidth = useSelector((state) => state.spreadsheet.width);
    const tableHeight = useSelector((state) => state.spreadsheet.height);
    const selection = useSelector((state) => state.spreadsheet.selection);
    const focus = useSelector((state) => state.spreadsheet.focus);
    const lastShiftFocus = useSelector(
        (state) => state.spreadsheet.lastShiftFocus
    );

    const dispatch = useDispatch();

    useEffect(() => {
        const keydownHandler = (e) => {
            const [row, col] = focus;
            const { shiftKey } = e;
            if (e.key === "ArrowUp") {
                if (row > 0) {
                    e.preventDefault();
                    dispatch(
                        arrowKeyDown({ rowDelta: -1, colDelta: 0, shiftKey })
                    );
                    cellInputRef.current.blur();
                }
            } else if (e.key === "ArrowDown") {
                if (row < tableHeight) {
                    e.preventDefault();
                    dispatch(
                        arrowKeyDown({ rowDelta: +1, colDelta: 0, shiftKey })
                    );
                    cellInputRef.current.blur();
                }
            } else if (e.key === "ArrowLeft") {
                if (col > 0) {
                    e.preventDefault();
                    dispatch(
                        arrowKeyDown({ rowDelta: 0, colDelta: -1, shiftKey })
                    );
                    cellInputRef.current.blur();
                }
            } else if (e.key === "ArrowRight") {
                if (col < tableWidth) {
                    e.preventDefault();
                    dispatch(
                        arrowKeyDown({ rowDelta: 0, colDelta: +1, shiftKey })
                    );
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
        };
        const keyupHandler = (e) => {};
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
