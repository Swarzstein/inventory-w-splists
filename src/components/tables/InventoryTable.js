import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import AddConsumablesInventoryItem from "../modals/AddConsumablesInventoryItem";
import ItemModal from "../modals/ItemModal";
import DeleteItemModal from "../modals/DeleteItemModal";
import ModifyItemModal from "../modals/ModifyItemModal";

const InventoryTable = (props) => {
  const {list, inventoryName} = props;
  const [showAdd, setShowAdd] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [showModifyItem, setShowModifyItem] = useState(false);
  const [showItemDelete, setShowItemDelete] = useState(false);
  const [modalItem, setModalItem] = useState();
  const [itemDelete, setItemDelete] = useState();
  
  const deleteItem = async (item) => {
    setItemDelete(item);
    setShowItemDelete(true);
  }

  const modifyItem = (event, item) => {
    event.stopPropagation();
    setModalItem(item);
    setShowModifyItem(true);
  }

  return (
    <div>
      <AddConsumablesInventoryItem inventoryName={inventoryName} show={showAdd} hide={() => setShowAdd(false)} />
      <ItemModal show={showItem} item={modalItem} hide={() => setShowItem(false)} />
      <ModifyItemModal show={showModifyItem} item={modalItem} hide={() => setShowModifyItem(false)} />
      <DeleteItemModal show={showItemDelete} item={itemDelete} hide={() => setShowItemDelete(false)} />
      <Table className="scrolldown" hover>
        <thead>
          <tr className="text-center align-middle">
            <th className="item-number">No.</th>
            <th className="code">Code</th>
            <th className="item-name text-start">Item Name</th>
            <th className="item-stock">Stock</th>
            <th className="item-location">Location</th>
            <th className="item-request">Request</th>
            <th className="item-observations">Observations</th>
            <th className="item-buttons item-add text-center align-middle"><Button size="sm" onClick={() => setShowAdd(true)}>Add Item +</Button></th>
          </tr>
        </thead>
        <tbody className="">
          {list.length > 0 ?
          list.map((item, index) => {
            return (
              <tr className="text-center align-middle z-0" key={item.id} onClick={() => {setModalItem(item); setShowItem(true)}}>
                <td className="item-number text-end px-3">{index + 1}</td>
                <td className="code">{item.code}</td>
                <td className="item-name text-start">{item.itemName}</td>
                <td className="item-stock">{item.stock}</td>
                <td className="item-location">{item.location}</td>
                <td className="item-request">{item.request}</td>
                <td className="item-observations text-start">{item.observations}</td>
                <td className="item-buttons d-flex flex-wrap gap-1 justify-content-center">
                  <Button size="sm" variant="light" className="z-3" onClick={(event) => modifyItem(event, item)}>Modify</Button>
                  <Button size="sm" variant="danger" className="z-3" onClick={(event) => {event.stopPropagation(); deleteItem(item)}}>Delete</Button>
                </td>
              </tr>
            )
          }) :
          <div className="w-100 d-flex justify-content-center p-5">
            <h3>No Items Yet</h3>
          </div>}
        </tbody>
      </Table>
    </div>
  )
}

export default InventoryTable;