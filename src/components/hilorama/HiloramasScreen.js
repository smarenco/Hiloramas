import React from 'react'
import { useSelector } from 'react-redux'
import { HiloramaScreen } from '../hiloramas/HiloramaScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const HiloramasScreen = () => {

  const { active } = useSelector( state => state.hiloramas);

  return (
    <div className='hilorama__main-content animate__animated animate__fadeIn animate__faster'>
        
        <Sidebar />

        <main>
          {
            active ? ( <HiloramaScreen /> ) : ( <NothingSelected /> )
          }
          

        </main>
    </div>
  )
}
