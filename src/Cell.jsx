import React from "react";
import styles from "./Cell.module.scss";

const joinClasses = (...args) => args.filter(Boolean).join(" ");

function Cell({ entry, row, col, handleClick }) {
    const { width, height, selected, contents } = entry;

    let cssWidth = width === null ? "auto" : `${width}px`;
    let cssHeight = height === null ? "auto" : `${height}px`;

    const onClick = () => {
        handleClick(row, col);
    };

    return (
        <div
            style={{
                width: cssWidth,
                height: cssHeight,
            }}
            className={joinClasses(styles.main, selected && styles.selected)}
            onClick={onClick}
        >
            {contents}
        </div>
    );
}

export default Cell;
