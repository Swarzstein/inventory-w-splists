import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import inventoriesReducer from '../features/inventories/inventoriesSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    inventories: inventoriesReducer,
  }
})