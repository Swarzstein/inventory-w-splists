import { createSlice } from "@reduxjs/toolkit";
import { addConsumableInOutScore, addConsumableItem, deleteConsumableItem, fetchConsumableInouts, fetchConsumablesInventory, updateConsumableItem, fetchMaterialsInventory, addMaterialItem, updateMaterialItem, deleteMaterialItem, fetchMaterialInouts, addMaterialInOutScore } from "./inventoriesActions";

export const inventoriesSlice = createSlice({
  name: 'Inventories',
  initialState: {
    consumablesInventory: [],
    consumableInouts: [],
    materialsInventory: [],
    materialInouts: [],
  },
  reducers: {
    setConsumablesInventory: (state, action) => {
      state.consumablesInventory = action.payload;
    },
    addConsumablesInventoryItem: (state, action) => {
      state.consumablesInventory.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // for consumables
      .addCase(fetchConsumablesInventory.fulfilled, (state, action) => {
        state.consumablesInventory = action.payload;
      })
      .addCase(addConsumableItem.fulfilled, (state, action) => {
        state.consumablesInventory.push(action.payload);
      })
      .addCase(addConsumableItem.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateConsumableItem.fulfilled, (state, action) => {
        const index = state.consumablesInventory.findIndex(item => item.id === action.payload.id);
        state.consumablesInventory[index] = action.payload;
      })
      .addCase(deleteConsumableItem.fulfilled, (state, action) => {
        state.consumablesInventory = state.consumablesInventory.filter(
          item => item.id !== action.payload
        );
      })
      .addCase(fetchConsumableInouts.fulfilled, (state, action) => {
        state.consumableInouts = action.payload;
      })
      .addCase(addConsumableInOutScore.fulfilled, (state, action) => {
        state.consumableInouts.unshift(action.payload)
      })
      .addCase(addConsumableInOutScore.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // for materials
      .addCase(fetchMaterialsInventory.fulfilled, (state, action) => {
        state.materialsInventory = action.payload;
      })
      .addCase(addMaterialItem.fulfilled, (state, action) => {
        state.materialsInventory.push(action.payload);
      })
      .addCase(addMaterialItem.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateMaterialItem.fulfilled, (state, action) => {
        const index = state.materialsInventory.findIndex(item => item.id === action.payload.id);
        state.materialsInventory[index] = action.payload;
      })
      .addCase(deleteMaterialItem.fulfilled, (state, action) => {
        state.materialsInventory = state.MaterialsInventory.filter(
          item => item.id !== action.payload
        );
      })
      .addCase(fetchMaterialInouts.fulfilled, (state, action) => {
        state.materialInouts = action.payload;
      })
      .addCase(addMaterialInOutScore.fulfilled, (state, action) => {
        state.materialInouts.unshift(action.payload)
      })
      .addCase(addMaterialInOutScore.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const { setConsumablesInventory } = inventoriesSlice.actions;

export default inventoriesSlice.reducer;