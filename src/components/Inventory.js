import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import InventoryTable from "./tables/InventoryTable";
import { fetchConsumablesInventory } from "../features/inventories/inventoriesActions";
import { fetchMaterialsInventory } from "../features/inventories/inventoriesActions";
// import { Button } from "react-bootstrap";

const Inventory = (props) => {
  const { search, inventoryName } = props;
  console.log('inventory:', inventoryName);
  
  const dispatch = useDispatch();
  const consumablesList = useSelector(state => {
    console.log('getting from state:', inventoryName);
    
    switch (inventoryName) {
      case 'consumables':
        return state.inventories.consumablesInventory;
      case 'materials':
        return state.inventories.materialsInventory;
      default:
        return ['Invalid Inventory']
    }
  });
  const [filteredList, setFilteredList] = useState(consumablesList);

  //Get Consumables Inventory
  useEffect(() => {
    inventoryName === "consumables" ?
    dispatch(fetchConsumablesInventory()) :
    dispatch(fetchMaterialsInventory());
  }, [dispatch, inventoryName]);

  useEffect(() => {
    if (search) {
      const handler = setTimeout(() => {
        const results = consumablesList.filter(item =>{
          console.log("item", item.itemName)
          return item.itemName.toLowerCase().includes(search.toLowerCase())
        });
        setFilteredList(results);
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    } else {
      setFilteredList(consumablesList);
    }
  }, [search, consumablesList]);

  return (
      <div className='w-100'>
        <div className="d-flex w-100 justify-content-end mb-3">
        <InventoryTable list={filteredList} inventoryName={inventoryName} />
        </div>
      </div>
  )
}

export default Inventory;