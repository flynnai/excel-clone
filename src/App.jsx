import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, cellClick } from "./redux/slices/spreadsheetSlice";
import styles from "./App.module.scss";
import Spreadsheet from "./Spreadsheet";

function App() {
    const cellInputRef = useRef(null);

    const spreadsheetData = useSelector((state) => state.spreadsheet.rows);
    const tableWidth = useSelector((state) => state.spreadsheet.width);
    const tableHeight = useSelector((state) => state.spreadsheet.height);
    const selection = useSelector((state) => state.spreadsheet.selection);

    const dispatch = useDispatch();

    // const updateSpreadsheet = (rowNum, colNum, functor) => {
    //     setSpreadsheetData((curr) =>
    //         curr.map((row, currRowNum) =>
    //             currRowNum !== rowNum
    //                 ? row
    //                 : row.map((cell, currColNum) =>
    //                       currColNum !== colNum ? cell : functor(cell)
    //                   )
    //         )
    //     );
    // };

    useEffect(() => {
        const keydownHandler = (e) => {
            // if (selection !== null) {
            //     const [row, col] = selection;
            //     if (e.key === "ArrowUp") {
            //         if (row > 0) {
            //             e.preventDefault();
            //             // handleClick(row - 1, col);
            //             cellInputRef.current.blur();
            //         }
            //     } else if (e.key === "ArrowDown") {
            //         if (row < tableHeight) {
            //             e.preventDefault();
            //             // handleClick(row + 1, col);
            //             cellInputRef.current.blur();
            //         }
            //     } else if (e.key === "ArrowLeft") {
            //         if (col > 0) {
            //             e.preventDefault();
            //             // handleClick(row, col - 1);
            //             cellInputRef.current.blur();
            //         }
            //     } else if (e.key === "ArrowRight") {
            //         if (col < tableWidth) {
            //             e.preventDefault();
            //             // handleClick(row, col + 1);
            //             cellInputRef.current.blur();
            //         }
            //     } else if (
            //         !["Meta", "Shift", "CapsLock", "Alt"].includes(e.key)
            //     ) {
            //         console.log(e.key);
            //         // if necessary, clear cell contents and focus input
            //         if (document.activeElement !== cellInputRef.current) {
            //             // updateSpreadsheet(row, col, (cell) => ({
            //             //     ...cell,
            //             //     contents: "",
            //             // }));
            //             cellInputRef.current.focus();
            //         }
            //     }
            //     console.log(e.key);
            // }
        };
        window.addEventListener("keydown", keydownHandler);
        return () => {
            window.removeEventListener("keydown", keydownHandler);
        };
    }, [selection]);

    const handleCellInputChange = (e) => {
        // const [row, col] = selection;
        // updateSpreadsheet(row, col, (cell) => ({
        //     ...cell,
        //     contents: e.target.value,
        // }));
    };

    return (
        <div className={styles.main}>
            {/* {selection && (
                <input
                    type="text"
                    value={spreadsheetData[selection[0]][selection[1]].contents}
                    onChange={handleCellInputChange}
                    ref={cellInputRef}
                ></input>
            )} */}
            <Spreadsheet />
        </div>
    );
}

export default App;
