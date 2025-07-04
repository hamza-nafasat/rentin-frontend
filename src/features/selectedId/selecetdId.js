const { createSlice } = require('@reduxjs/toolkit');

const initialState = { agentId: '', buildingId: '' };

const selectedId = createSlice({
  name: 'selectedId',
  initialState,
  reducers: {
    setAgentId: (state, action) => {
      state.agentId = action.payload;
    },
    setBuildingId: (state, action) => {
      state.buildingId = action.payload;
    },
  },
});

export default selectedId;
export const { setAgentId, setBuildingId } = selectedId.actions;
