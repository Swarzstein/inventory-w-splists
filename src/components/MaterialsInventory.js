import { useDispatch, useSelector } from "react-redux";
import InventoryTable from "./tables/InventoryTable";
import { useEffect, useState } from "react";

const MaterialsInventory = (props) => {
  const { search } = props;
  const dispatch = useDispatch();
  const materialsList = useSelector(state => state.inventories.materialsInventory);
  const [filteredList, setFilteredList] = useState(materialsList);

  useEffect(() => {
    if (search) {
      const handler = setTimeout(() => {
        const results = materialsList.filter(item =>{
          console.log("item", item.itemName)
          return item.itemName.toLowerCase().includes(search.toLowerCase())
        });
        setFilteredList(results);
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    } else {
      setFilteredList(materialsList);
    }
  }, [search, materialsList]);


  return (
    <div className='w-100'>
        <div className="d-flex w-100 justify-content-end mb-3">
        </div>
        <InventoryTable list={filteredList} />
      </div>
  )
}

export default MaterialsInventory;