import React from 'react'
import { useSelector } from 'react-redux';
import { HiloramaEntry } from './HiloramaEntry';

export const HiloramaEntries = () => {
  
    const { items, active } = useSelector(state => state.hiloramas);

    return (
        <div className='hilorama__entries animate__animated animate__fadeIn animate__faster'>
            {items?.map(hilorama => <HiloramaEntry key={hilorama.id} { ...hilorama } />)}
        </div>
    )
}
