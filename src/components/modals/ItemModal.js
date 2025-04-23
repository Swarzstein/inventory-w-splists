import { Button, Modal, Table } from "react-bootstrap";
import AddInOut from "./AddInOut";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConsumableInouts } from "../../features/inventories/inventoriesActions";

const ItemModal = (props) => {
  const show = props.show;
  const hide = props.hide;
  const item = props.item;
  const dispatch = useDispatch();
  const inouts = useSelector(state => state.inventories.consumableInouts);
  const [showAdd, setShowAdd] = useState(false);

  // console.log('itemModal item:', item);
  // console.log("inouts state:", inouts);
  useEffect(() => {
    if (show) {
      // console.log("useEfect dispatching fetchInouts")
      dispatch(fetchConsumableInouts(item.code));
    }
  }, [dispatch, item, show]);

  useEffect(() => {}, [inouts]);

  const renderInouts = () => {
    // console.log("loading render");
    // console.log("rendering:", inouts);

    if (inouts.length) {
      return (
        <Table borderless>
          <tbody>
            {inouts.map(inout => {
              return (
                <tr>
                  <th>{inout.datetime}</th>
                  <th className="text-center">{inout.type}</th>
                  <th className="text-center">{inout.quantity}</th>
                  <th className="text-center">{inout.user}</th>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )
    } else {
      return (
        <h2>No in-outs yet</h2>
      )
    }
  }

  if (item) {
    return (
      <>
        <AddInOut item={item} show={showAdd} hide={() => setShowAdd(false)} />
        <Modal show={show} onHide={hide} className="">
          <Modal.Header className="justify-content-between">
            <Modal.Title>{item.itemName}</Modal.Title>
            <Button onClick={() => setShowAdd(true)}>Add in-out</Button>
          </Modal.Header>
          <Modal.Body>
            {renderInouts()}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default ItemModal;