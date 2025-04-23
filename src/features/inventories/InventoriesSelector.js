import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { Button } from "react-bootstrap";

const InventoriesSelector = () => {
  const navigate = useNavigate();

  return (
    <div className='d-flex justify-content-center align-items-center inventories-container'>
      <div className='row text-center w-50 gap-3'>
      <Button onClick={() => navigate('/consumables')}>Consumables Inventory</Button>
      <Button onClick={() => navigate('/materials')}>Materials Inventory</Button>
      </div>
    </div>
  )
}

export default InventoriesSelector;