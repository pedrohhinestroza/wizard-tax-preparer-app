import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    step: number;
    formData: Record<string, any>;
}

const initialState: FormState = {
    step: 1,
    formData: {},
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        nextStep: (state) => {
            state.step += 1;
        },
        prevStep: (state) => {
            state.step -= 1;
        },
        saveData: (state, action: PayloadAction<Record<string, any>>) => {
            state.formData = { ...state.formData, ...action.payload };
        },
        resetForm: () => initialState,
    },
});

export const { nextStep, prevStep, saveData, resetForm } = formSlice.actions;
export default formSlice.reducer;