import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AddSubmissionPayload, FormState, FormSubmission } from './types';

const initialState: FormState = {
  submissions: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<AddSubmissionPayload>) => {
      const newSubmission: FormSubmission = {
        id: Date.now(),
        formType: action.payload.formType,
        data: action.payload.data,
        submittedAt: new Date().toISOString(),
      };
      state.submissions.push(newSubmission);
    },
  },
});

export const { addSubmission } = formSlice.actions;
export default formSlice.reducer;
