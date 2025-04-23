import { createAsyncThunk } from "@reduxjs/toolkit";
import { addConsumable, addConsumableInOut, getConsumablesInventory, getConsumableInOuts, updateConsumable, deleteConsumable, getMaterialsInventory, addMaterial, updateMaterial, deleteMaterial, getMaterialInOuts, addMaterialInOut } from "../../queries/InventoryQueries";

// Actions for consumables:

export const fetchConsumablesInventory = createAsyncThunk(
  'inventories/fetchConsumablesInventory',
  async () => {
    const inventory = await getConsumablesInventory();
    return inventory;
  }
);

export const addConsumableItem = createAsyncThunk(
  'inventories/addConsumableItem',
  async (newItem) => {
    const response = await addConsumable(newItem);
    if (response instanceof Error) {
      throw new Error(response.message)
    }
    return response;
  }
);

export const updateConsumableItem = createAsyncThunk(
  'inventories/updateConsumableItem',
  async (item) => {
    const response = await updateConsumable(item);
    if (response instanceof Error) {
      throw new Error(response.message)
    }
    return response;
  }
);

export const deleteConsumableItem = createAsyncThunk(
  'inventories/deleteConsumableItem',
  async (itemId) => {
    console.log("will delete item with id: ", itemId)
    const response = await deleteConsumable(itemId);
    if (response instanceof Error) {
      throw new Error(response.message)
    } else {
      return itemId;
    }
  }
);

export const fetchConsumableInouts = createAsyncThunk(
  'consumableInouts/fetchConsumableInouts',
  async (itemCode) => {
    const consumableInouts = await getConsumableInOuts(itemCode);
    return consumableInouts;
  }
);

export const addConsumableInOutScore = createAsyncThunk(
  'consumableInouts/addConsumableInOutScore',
  async (inout) => {
    const response = await addConsumableInOut(inout);
    if (response instanceof Error) {
      throw new Error(response.message)
    }
    return response;
  }
);

// Actions for Materials

export const fetchMaterialsInventory = createAsyncThunk(
  'inventories/fetchMaterialsInventory',
  async () => {
    const inventory = await getMaterialsInventory();
    return inventory;
  }
);

export const addMaterialItem = createAsyncThunk(
  'inventories/addMaterialItem',
  async (newItem) => {
    const response = await addMaterial(newItem);
    if (response instanceof Error) {
      throw new Error(response.message)
    }
    return response;
  }
);

export const updateMaterialItem = createAsyncThunk(
  'inventories/updateMaterialItem',
  async (item) => {
    const response = await updateMaterial(item);
    if (response instanceof Error) {
      throw new Error(response.message)
    }
    return response;
  }
);

export const deleteMaterialItem = createAsyncThunk(
  'inventories/deleteMaterialItem',
  async (itemId) => {
    console.log("will delete item with id: ", itemId)
    const response = await deleteMaterial(itemId);
    if (response instanceof Error) {
      throw new Error(response.message)
    } else {
      return itemId;
    }
  }
);

export const fetchMaterialInouts = createAsyncThunk(
  'MaterialInouts/fetchMaterialInouts',
  async (itemCode) => {
    const MaterialInouts = await getMaterialInOuts(itemCode);
    return MaterialInouts;
  }
);

export const addMaterialInOutScore = createAsyncThunk(
  'MaterialInouts/addMaterialInOutScore',
  async (inout) => {
    const response = await addMaterialInOut(inout);
    if (response instanceof Error) {
      throw new Error(response.message)
    }
    return response;
  }
);

// General actions

/*

export const fetchInventory = createAsyncThunk(
  'inventories/fetchInventory',
  async (inventoryName) => {
    switch (inventoryName) {
      case 'consumables':
        const consumablesInventory = await getConsumablesInventory();
        return consumablesInventory;
      case 'materials':
        const materialsInventory = await getMaterialsInventory();
        return materialsInventory;
      default:
        return null;
    }
    
  }
);

*/