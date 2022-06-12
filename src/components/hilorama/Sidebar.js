import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewHilorama } from '../../actions/hilorama';
import { HiloramaEntries } from './HiloramaEntries'

export const Sidebar = () => {

  const dispatch = useDispatch();

  const { name } = useSelector( state => state.auth );

  const handleLogout = () => {
    dispatch( startLogout());
  }

  const handleAddNew = () => {
    dispatch( startNewHilorama() );
  }

  return (
    <aside className='hilorama__sidebar'>
        
        <div className='hilorama_sidebar-navbar'>
            <h3 className='mt-5'>
                <i className='far fa-moon'></i>
                <span>{ name }</span>
            </h3>

            <button className='btn' onClick={handleLogout}>Logout</button>
        </div>
        

        <div className='hilorama__new-entry' onClick={handleAddNew}>
            <i className='far fa-calendar-plus fa-5x'></i>
            <p className='mt-5'> New entry</p>
        </div> 

        <HiloramaEntries />
    </aside>
  )
}
