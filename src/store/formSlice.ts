import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FormState {
    step: number;
    formData: {
        [key: string]: any; // Dynamic keys for each step
    };
}

const initialState: FormState = {
    step: 1, // Tracks the current step in the wizard
    formData: {}, // Holds data for each step
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        saveStepData: (state, action: PayloadAction<{ step: number; data: any }>) => {
            const { step, data } = action.payload;
            state.formData[`step${step}`] = data; // Save step data dynamically
        },
        nextStep(state) {
            state.step += 1;
        },
        prevStep(state) {
            state.step -= 1;
        },
        resetForm() {
            return initialState;
        },
    },
});

export const { saveStepData, nextStep, prevStep, resetForm } = formSlice.actions;
export default formSlice.reducer;
