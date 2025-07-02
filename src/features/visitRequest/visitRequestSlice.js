import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedVisitRequestId: null,
  selectedAgentOption: null,
  visitRequestData: null,
};

const visitRequestSlice = createSlice({
  name: 'visitRequest',
  initialState,
  reducers: {
    setSelectedVisitRequestId: (state, action) => {
      state.selectedVisitRequestId = action.payload;
    },
    setSelectedAgentOption: (state, action) => {
      state.selectedAgentOption = action.payload;
    },
    setVisitRequestData: (state, action) => {
      state.visitRequestData = action.payload;
    },
    clearVisitRequestSelection: state => {
      state.selectedVisitRequestId = null;
      state.selectedAgentOption = null;
      state.visitRequestData = null;
    },
    setVisitRequestSelection: (state, action) => {
      const { visitRequestId, agentOption, visitRequestData } = action.payload;
      state.selectedVisitRequestId = visitRequestId;
      state.selectedAgentOption = agentOption;
      if (visitRequestData) {
        state.visitRequestData = visitRequestData;
      }
    },
  },
});

export const {
  setSelectedVisitRequestId,
  setSelectedAgentOption,
  setVisitRequestData,
  clearVisitRequestSelection,
  setVisitRequestSelection,
} = visitRequestSlice.actions;

export default visitRequestSlice.reducer;
