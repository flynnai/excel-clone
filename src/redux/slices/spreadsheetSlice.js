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

export const spreadsheetSlice = createSlice({
    name: "spreadsheet",
    initialState: {
        width: INIT_TABLE_WIDTH,
        height: INIT_TABLE_HEIGHT,
        rows: [...spreadsheetDataTemplate.map((row) => [...row])],
    },
    reducers: {
        // each uses "immer" under the hood
        cellClick: (state, action) => {
            const { row, col } = action.payload;
            console.log("Clicking with ", row, col);
            state.rows[row][col].selected = true;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { cellClick, decrement, incrementByAmount } =
    spreadsheetSlice.actions;

export default spreadsheetSlice.reducer;
