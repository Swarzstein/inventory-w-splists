import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { addConsumableItem } from "../../features/inventories/inventoriesActions";
import { addMaterialItem } from "../../features/inventories/inventoriesActions";
import ErrorModal from "./ErrorModal";

const AddConsumablesInventoryItem = (props) => {
  const {inventoryName, show, hide} = props
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState({
    code: '',
    itemName: '',
    stock: null,
    location: '',
    request: '',
    observations: ''
  });
  const [errorShow, setErrorShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // console.log("error message", errorMessage)

  const clear = () => {
    setNewItem({
      code: '',
      itemName: '',
      stock: '',
      location: '',
      request: '',
      observations: ''
    });
  }

  const handleChange = (event) => {
    setNewItem(prevState => ({
      ...prevState,
      [event.target.name]: (event.target.name === 'stock' ? parseInt(event.target.value) : event.target.value)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { code, itemName, stock, location } = newItem;
    if ( [code, itemName, stock, location].some(field => field === '')) {
      // rise alert
      setErrorMessage("Code, Item, Stock and Location are obligatory");
      setErrorShow(true);
    } else {
      newItem.location = location.toUpperCase();
      try {
        inventoryName === "consumables" ?
        await dispatch(addConsumableItem(newItem)).unwrap() :
        await dispatch(addMaterialItem(newItem)).unwrap();

        clear();
        hide();
      } catch (error) {
        console.error("Error Adding Item:", error);
        setErrorMessage(error.message);
        setErrorShow(true);
      }
    }
  }

  const clearHide = () => {
    hide();
    clear();
  }

  return (
    <>
    <ErrorModal errorMessage={errorMessage} show={errorShow} hide={() => setErrorShow(false)} />
    <Modal show={show} onHide={clearHide}>
      <Modal.Header>
        <Modal.Title>Add New Item</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} >
        <Modal.Body className="d-flex row">
          <Form.Group controlId="item.Code" className="d-flelx w-25">
            <Form.Label>Code:</Form.Label>
            <Form.Control type="text" name="code" value={newItem.code} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="item.Name" className="w-75">
            <Form.Label>Item:</Form.Label>
            <Form.Control type="text" name="itemName" value={newItem.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="item.Stock" className="w-25">
            <Form.Label>Stock:</Form.Label>
            <Form.Control type="number" name="stock" min={0} step={1} value={newItem.stock} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="item.Location" className="w-25">
            <Form.Label>Location:</Form.Label>
            <Form.Control type="text" name="location" value={newItem.location} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="item.Request" className="w-50">
            <Form.Label>Request:</Form.Label>
            <Form.Control type="text" name="request" value={newItem.request} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="item.Observations">
            <Form.Label>Observations:</Form.Label>
            <Form.Control type="text" name="observations" value={newItem.observations} onChange={handleChange} as="textarea" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={hide} variant="secondary" type="button">Cancel</Button>
          <Button variant="primary" type="submit" >Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
    </>
  )
}

export default AddConsumablesInventoryItem;