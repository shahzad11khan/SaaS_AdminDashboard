import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    disconnectSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null; // Reset socket to null on disconnect
      }
    },
  },
});

// Export actions
export const { setSocket, disconnectSocket } = socketSlice.actions;
// Export reducer
export default socketSlice.reducer;
