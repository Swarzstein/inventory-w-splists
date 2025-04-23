import { Button, Form, Modal } from "react-bootstrap";
import ErrorModal from "./ErrorModal";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateConsumableItem } from "../../features/inventories/inventoriesActions";

const ModifyItemModal = (props) => {
  
  const { show, hide, item } = props;
  const dispatch = useDispatch();
  const [modItem, setModItem] = useState({
    code: '',
    itemName: '',
    stock: '',
    location: '',
    request: '',
    observations: ''
  });
  const [errorShow, setErrorShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (item) setModItem(item);
  }, [item, show]);

  const handleChange = (event) => {
    setModItem(prevState => ({
      ...prevState,
      [event.target.name]: (event.target.name === 'stock' ? parseInt(event.target.value) : event.target.value)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { code, itemName, stock, location } = modItem;
    if ( [code, itemName, stock, location].some(field => field === '')) {
      // rise alert
      setErrorMessage("Code, Item, Stock and Location are obligatory");
      setErrorShow(true);
    } else {
      try {
        await dispatch(updateConsumableItem(modItem)).unwrap();
        hide();
      } catch (error) {
        console.error("Error Modifying Item:", error);
        setErrorMessage(error.message);
        setErrorShow(true);
      }
    }
  }
  
    return (
      <>
      <ErrorModal errorMessage={errorMessage} show={errorShow} hide={() => setErrorShow(false)} />
      <Modal show={show} onHide={hide}>
        <Modal.Header>
          <Modal.Title>Modify {item ? item.itemName : ""}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} >
          <Modal.Body className="d-flex row">
            <Form.Group controlId="item.Code" className="d-flelx w-25">
              <Form.Label>Code:</Form.Label>
              <Form.Control type="text" name="code" value={modItem.code} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="item.Name" className="w-75">
              <Form.Label>Item:</Form.Label>
              <Form.Control type="text" name="itemName" value={modItem.itemName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="item.Stock" className="w-25">
              <Form.Label>Stock:</Form.Label>
              <Form.Control type="number" name="stock" min={0} step={1} value={modItem.stock} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="item.Location" className="w-25">
              <Form.Label>Location:</Form.Label>
              <Form.Control type="text" name="location" value={modItem.location} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="item.Request" className="w-50">
              <Form.Label>Request:</Form.Label>
              <Form.Control type="text" name="request" value={modItem.request} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="item.Observations">
              <Form.Label>Observations:</Form.Label>
              <Form.Control type="text" name="observations" value={modItem.observations} onChange={handleChange} as="textarea" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={hide} variant="secondary">Cancel</Button>
            <Button variant="primary" type="submit" >Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      </>
    )
}

export default ModifyItemModal;