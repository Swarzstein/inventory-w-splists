import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { addInOutItem } from "../../features/inouts/inOutsSlice";
import { addConsumableInOutScore, addMaterialInOutScore, updateConsumableItem, updateMaterialItem } from "../../features/inventories/inventoriesActions";
import ErrorModal from "./ErrorModal";

const AddInOut = (props) => {
  const { show, hide, inventory } = props;
  const item = { ...props.item };
  const [inout, setInout] = useState({
    type: null,
    itemCode: '',
    quantity: 0,
    datetime: ""
  });
  const user = useSelector(state => state.user);
  const [errorShow, setErrorShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const dispatch = useDispatch();

  const getNow = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const clear = () => {
    setInout({
      type: null,
      itemCode: '',
      quantity: 0,
      datetime: ""
    });
  };

  const handleChange = (event) => {
    if ((inout.type === "Out" && event.target.name === "quantity" && event.target.value > item.stock) || (event.target.value === "Out" && inout.quantity > item.stock)) {
      setInout(prevState => ({
        ...prevState,
        quantity: item.stock
      }));
    } else {
      setInout(prevState => ({
        ...prevState,
        [event.target.name]: (isNaN(event.target.value) ? event.target.value : parseInt(event.target.value))
      }));
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    inout.datetime = getNow();
    inout.itemCode = item.code;
    console.log("inout type: ", inout.type)

    if (inout.quantity > 0 && inout.type !== null && inout.datetime !== '') {

      if (inout.type === 'In') {
        item.stock += inout.quantity;
      } else if (inout.type === 'Out') {
        item.stock -= inout.quantity;
      }

      item.user = user;

      try {
        if (inventory === 'consumables') {
          dispatch(addConsumableInOutScore(inout)).unwrap();
          dispatch(updateConsumableItem(item)).unwrap();
        } else if (inventory === 'materials') {
          dispatch(addMaterialInOutScore(inout)).unwrap();
          dispatch(updateMaterialItem(item)).unwrap();
        }
        
        clear();
        hide();
      } catch (error) {
        console.error("Error saving movement:", error);
      }
    } else {
      if (!inout.type) {
        setErrorMessage('You must select a type before submitting');
      } else {
        setErrorMessage('Quantity cannot be 0')
      }
      setErrorShow(true);
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
          <h3>Add movement to {item.itemName}</h3>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="inout.Type">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" onChange={handleChange}>
                <option value=''>Select</option>
                <option>In</option>
                <option>Out</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="inout.Quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" name="quantity" min={0} step={1} value={inout.quantity} onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={hide} className="bg-secondary border-secondary">Cancel</Button>
            <Button variant="primary" type="submit" >Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
};

export default AddInOut;

// <Button onClick={handleSubmit} >Submit</Button>