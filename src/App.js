import { Route, Routes } from 'react-router-dom'
import './App.css';
import Inventories from './features/inventories/Inventories';
import Users from './features/user/Users';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import ConsumablesInventory from './components/Inventory';
import InventoriesSelector from './features/inventories/InventoriesSelector';

const App = () => {
  const user = useSelector(state => state.user);

  return (
    <>
      {user.name == null
        ?
        <div className='App'>
          <Users />
        </div>
        :
        <div className="App overflow-hidden">
          <header>
            <NavBar />
          </header>
          <Routes>
            <Route path='/users' element={<Users />} />
            <Route path='/inventories' element={<InventoriesSelector />} />
            <Route path='/consumables' element={<Inventories inventory="consumables" title="Consumables Inventory" />} />
            <Route path='/materials' element={<Inventories inventory="materials" title="Materials Inventory" />} />
          </Routes>
        </div>}
    </>
  )
}

export default App;