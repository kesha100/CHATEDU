import { createSlice } from '@reduxjs/toolkit';

export const languageSlice = createSlice({
    name: 'lang',
    initialState: {
        value: false,
    },
    reducers: {
        changeLangState: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { changeLangState } = languageSlice.actions;
export default languageSlice.reducer;
