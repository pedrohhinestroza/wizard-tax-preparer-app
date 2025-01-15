import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    step: 1,
    formData: {
        step1: {},
        step2: {},
        step3: {},
    },
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        saveStepData: (state, action) => {
            const { step, data } = action.payload;
            state.formData[`step${step}`] = data;
        },
        nextStep: (state) => {
            state.step += 1;
        },
        prevStep: (state) => {
            state.step -= 1;
        },
    },
});

export const { saveStepData, nextStep, prevStep } = formSlice.actions;

export default formSlice.reducer;
