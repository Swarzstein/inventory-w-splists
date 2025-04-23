import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    id: null
  },
  reducers: {
    selectUser: (state, action) => {
      state.name = action.payload.name
      state.id = action.payload.id
    }
  }
});

export const { selectUser } = userSlice.actions

export default userSlice.reducer