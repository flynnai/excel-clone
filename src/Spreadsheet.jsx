import styles from "./Spreadsheet.module.scss";
import Cell from "./Cell";

function Spreadsheet({ rows, handleClick }) {
    return (
        <div className={styles.main}>
            {rows.map((row, rowNum) => (
                <div className={styles.cellRow} key={rowNum}>
                    {row.map((entry, colNum) => (
                        <Cell
                            entry={entry}
                            row={rowNum}
                            col={colNum}
                            key={colNum}
                            handleClick={handleClick}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Spreadsheet;
