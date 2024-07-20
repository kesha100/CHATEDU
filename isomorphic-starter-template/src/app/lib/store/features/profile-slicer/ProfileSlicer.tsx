import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isSurvey: false,
}

export const profileSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        surveyState: (state, action) => {
            state.isSurvey = action.payload
        },
    },
});

export const { surveyState } = profileSlice.actions;
export default profileSlice.reducer;
