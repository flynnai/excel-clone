import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Cell.module.scss";
import { cellClick } from "./redux/slices/spreadsheetSlice";

const joinClasses = (...args) => args.filter(Boolean).join(" ");

function Cell({ row, col, isSelected, isFocused }) {
    console.log("Rerender");
    const entry = useSelector((state) => state.spreadsheet.rows[row][col]);
    const { width, height, contents } = entry;
    const dispatch = useDispatch();

    let cssWidth = width === null ? "auto" : `${width}px`;
    let cssHeight = height === null ? "auto" : `${height}px`;

    const onMouseDown = (e) => {
        console.log(e);
        dispatch(cellClick({ row, col }));
    };

    return (
        <div
            style={{
                width: cssWidth,
                height: cssHeight,
            }}
            className={joinClasses(
                styles.main,
                isSelected && styles.selected,
                isFocused && styles.focused
            )}
            onMouseDown={onMouseDown}
        >
            {contents}
        </div>
    );
}

export default React.memo(Cell);
