import styles from "./Spreadsheet.module.scss";
import Cell from "./Cell";
import { useSelector } from "react-redux";

function Spreadsheet() {
    const spreadsheetData = useSelector((state) => state.spreadsheet.rows);
    const selection = useSelector((state) => state.spreadsheet.selection);
    const focus = useSelector((state) => state.spreadsheet.focus);

    return (
        <div className={styles.main}>
            {spreadsheetData.map((row, rowNum) => (
                <div className={styles.cellRow} key={rowNum}>
                    {row.map((_, colNum) => (
                        <Cell
                            row={rowNum}
                            col={colNum}
                            isSelected={String([rowNum, colNum]) in selection}
                            isFocused={
                                rowNum === focus[0] && colNum === focus[1]
                            }
                            key={colNum}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Spreadsheet;
