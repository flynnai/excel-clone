import { createSlice } from "@reduxjs/toolkit";

const INIT_TABLE_WIDTH = 26;
const INIT_TABLE_HEIGHT = 100;
const spreadsheetDataTemplate = new Array(INIT_TABLE_HEIGHT).fill(0).map((_) =>
    new Array(INIT_TABLE_WIDTH).fill(0).map((_) => ({
        width: 60,
        height: null,
        contents: String("f"),
        selected: false,
    }))
);

// helpers
export const getSelectionKey = (row, col) => String([row, col]);
export const clearSelection = (selection) => {
    for (const key in selection) delete selection[key];
};
export const addToSelection = (row, col, selection) =>
    (selection[getSelectionKey(row, col)] = [row, col]);
export const removeFromSelection = (row, col, selection) =>
    delete selection[getSelectionKey(row, col)];

export const spreadsheetSlice = createSlice({
    name: "spreadsheet",
    initialState: {
        width: INIT_TABLE_WIDTH,
        height: INIT_TABLE_HEIGHT,
        rows: [...spreadsheetDataTemplate.map((row) => [...row])],
        selection: {}, // pseudo-set of "row,col" strings
        focus: [0, 0],
        lastShiftFocus: null,
    },
    reducers: {
        // each uses "immer" under the hood
        cellClick: (state, action) => {
            const { row, col } = action.payload;
            console.log("Clicking with ", row, col);
            state.focus = [row, col];
            state.lastShiftFocus = null;

            // TODO temp fix
            state.selection = { [getSelectionKey(row, col)]: [row, col] };
            // const selected = Object.keys(state.selection)[0];
            // delete state.selection[selected];
            // state.selection[String([row, col])] = [row, col];
        },
        updateCell: (state, action) => {
            const { row, col, updates } = action.payload;
            state.rows[row][col] = { ...state.rows[row][col], ...updates };
        },
        arrowKeyDown: (state, action) => {
            console.log(
                "Focus, lastshiftfocus",
                "" + state.focus,
                "" + state.lastShiftFocus
            );
            const { rowDelta, colDelta, shiftKey } = action.payload;
            if (!shiftKey) {
                let newRow = state.focus[0] + rowDelta;
                let newCol = state.focus[1] + colDelta;
                state.focus = [newRow, newCol];
                clearSelection(state.selection);
                addToSelection(newRow, newCol, state.selection);
                state.lastShiftFocus = null;
            } else {
                if (state.lastShiftFocus === null) {
                    state.lastShiftFocus = [...state.focus];
                }
                state.lastShiftFocus[0] += rowDelta;
                state.lastShiftFocus[1] += colDelta;
                const [newRow, newCol] = state.lastShiftFocus;

                // add all rows and columns from `focus` to `lastShiftFocus` to selection
                const [focusRow, focusCol] = state.focus;
                let [startRow, endRow] = [focusRow, newRow];
                if (startRow > endRow) {
                    [startRow, endRow] = [endRow, startRow];
                }
                let [startCol, endCol] = [focusCol, newCol];
                if (startCol > endCol) {
                    [startCol, endCol] = [endCol, startCol];
                }
                clearSelection(state.selection);
                for (let i = startRow; i <= endRow; i++) {
                    for (let j = startCol; j <= endCol; j++) {
                        addToSelection(i, j, state.selection);
                    }
                }

                state.lastShiftFocus = [newRow, newCol];
            }
        },
    },
});

export const { cellClick, updateCell, arrowKeyDown } = spreadsheetSlice.actions;

export default spreadsheetSlice.reducer;
