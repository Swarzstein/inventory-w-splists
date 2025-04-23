// Users react component
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectUser } from './userSlice';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = [
    {
      name: 'Facility Manager',
      id: 21234567
    },
    {
      name: 'Employee 1',
      id: 22345678
    },
    {
      name: 'Employee 2',
      id: 23456789
    }
  ];

  const handleUserSelect = (user) => {
    dispatch(selectUser(user));
    navigate('/inventories')
  }

  return (
    <div className='user-selector'>
      <div className='py-4 mt-3 text-center'>
        <h1>¿Quién se conecta?</h1>
      </div>
      <div className='row text-center'>
        {users.map(user => {
          return (
            <button
              key={user.id}
              className='btn btn-primary my-1'
              onClick={() => handleUserSelect(user)}
            >{user.name}</button>
          )
        })}
      </div>
    </div>
  );
}

export default Users;