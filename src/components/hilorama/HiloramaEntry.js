import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeHilorama } from '../../actions/hilorama';


export const HiloramaEntry = ({ id, title, body, url }) => {

  const dispatch = useDispatch();

  const handleEntryClick = () => {
    dispatch( activeHilorama( id, {
      title, body, url
    }));
  }

  return (
    <div className='hilorama__entry pointer' onClick={handleEntryClick}>
      { url && <div className='hilorama__entry-picture' style={{backgroundSize: 'cover', backgroundImage: `url('${url}')`}}></div>}
      <div className='hilorama__entry-body'>
        <p className='hilorama__entry-title'>{title}</p>
        <p className='hilorama__entry-content'>{body}</p>
      </div>
    </div>
  )
}
