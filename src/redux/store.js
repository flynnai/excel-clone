import { configureStore } from "@reduxjs/toolkit";
import spreadsheetReducer from "./slices/spreadsheetSlice";

export default configureStore({
    reducer: {
        spreadsheet: spreadsheetReducer,
    },
});
