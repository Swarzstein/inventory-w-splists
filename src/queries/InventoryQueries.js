import { addNewItem, deleteItem, getList, modifyItem } from "./tableQueries";

// For Consumables

export const getConsumablesInventory = async () => {
  const inventoriesList = await getList('consumables_inventory');
  const inventory = inventoriesList.data.value;
  return inventory;
}

export const addConsumable = async (newItem) => {
  const inventory = await getConsumablesInventory();
  if (inventory.some(item => item.code === newItem.code)) {
    return new Error(`An item with the code ${newItem.code} already exists`);
  } else {
    const response = await addNewItem('consumables_inventory', newItem);
    return response.data;
  }
}

export const getConsumableInOuts = async (itemCode) => {
  const response = await getList('consumable_inouts', `?$filter=itemCode eq '${itemCode}'`);
  const inouts = response.data.value;
  return inouts.reverse();
}

export const addConsumableInOut = async (inout) => {
  const response = await addNewItem('consumable_inouts', inout);
  return response.data;
}

export const updateConsumable = async (item) => {
  const response = await modifyItem('consumables_inventory', item);
  return response.data;
}

export const deleteConsumable = async (itemId) => {
  const response = await deleteItem('consumables_inventory', itemId);
  return response.data;
}

// For Materials

export const getMaterialsInventory = async () => {
  const inventoriesList = await getList('materials_inventory');
  const inventory = inventoriesList.data.value;
  return inventory;
}

export const addMaterial = async (newItem) => {
  const inventory = await getMaterialsInventory();
  if (inventory.some(item => item.code === newItem.code)) {
    return new Error(`An item with the code ${newItem.code} already exists`);
  } else {
    const response = await addNewItem('materials_inventory', newItem);
    return response.data;
  }
}

export const getMaterialInOuts = async (itemCode) => {
  const response = await getList('material_inouts', `?$filter=itemCode eq '${itemCode}'`);
  const inouts = response.data.value;
  return inouts.reverse();
}

export const addMaterialInOut = async (inout) => {
  const response = await addNewItem('material_inouts', inout);
  return response.data;
}

export const updateMaterial = async (item) => {
  const response = await modifyItem('materials_inventory', item);
  return response.data;
}

export const deleteMaterial = async (itemId) => {
  const response = await deleteItem('materials_inventory', itemId);
  return response.data;
}