import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { deleteConsumableItem } from "../../features/inventories/inventoriesActions";

const DeleteItemModal = (props) => {
  const { item, show, hide } = props;
  const dispatch = useDispatch();
  
  const deleteItem = async (itemId) => {
    try {
      await dispatch(deleteConsumableItem(itemId)).unwrap();
      hide();
    } catch (error) {
      console.error('Error dispatching Item');
    }
  }

  return (
    <Modal show={show} onHide={hide} bg="secondary" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header><h2 className="text-danger">Deleting Item</h2></Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want to delete the item</h5>
        <h5>"{item ? item.itemName : null}"</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => deleteItem(item.id)}>Yes</Button>
        <Button onClick={hide}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteItemModal;