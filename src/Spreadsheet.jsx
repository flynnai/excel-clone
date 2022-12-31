import styles from "./Spreadsheet.module.scss";
import Cell from "./Cell";
import { useSelector } from "react-redux";

function Spreadsheet() {
    const spreadsheetData = useSelector((state) => state.spreadsheet.rows);

    return (
        <div className={styles.main}>
            {spreadsheetData.map((row, rowNum) => (
                <div className={styles.cellRow} key={rowNum}>
                    {row.map((entry, colNum) => (
                        <Cell row={rowNum} col={colNum} key={colNum} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Spreadsheet;
