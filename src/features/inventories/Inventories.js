import { useState } from "react";
import Inventory from "../../components/Inventory";
import { Form, InputGroup } from "react-bootstrap";

const Inventories = (props) => {
  const { inventory, title } = props;
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="px-3 pb-0 my-0">
      <div className="d-flex justify-content-between px-2 py-1 my-0">
        <div>
          <h3 className="mb-0">{title}</h3>
        </div>
        <InputGroup className="w-50 self-align-end">
          <Form.Control
            placeholder="Search Product"
            aria-label="Search Product"
            aria-describedby="basic-addon2"
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
          />
          <InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
        </InputGroup>
      </div>
      <hr className="m-1 mt-0" />
      <Inventory inventoryName={inventory} search={searchQuery} />
    </div>
  )
}

export default Inventories;