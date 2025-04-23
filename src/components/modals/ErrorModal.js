import { Button, Modal } from "react-bootstrap";

const ErrorModal = (props) => {
  const { errorMessage, show, hide } = props;
  // console.log('error:', errorMessage);
  

  return (
    <Modal show={show} onHide={hide} bg="secondary" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header><h2 className="text-danger">Error</h2></Modal.Header>
      <Modal.Body><h5>{errorMessage}</h5></Modal.Body>
      <Modal.Footer>
        <Button onClick={hide}>Accept</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;