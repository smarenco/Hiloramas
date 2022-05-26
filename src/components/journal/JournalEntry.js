import React from 'react'


export const JournalEntry = ({ value }) => {
  return (
    <div className='journal__entry pointer'>
      <div className='journal__entry-picture' style={{backgroundSize: 'cover', backgroundImage: 'url(https://fotografiamejorparavendermas.com/wp-content/uploads/2017/06/La-importancia-de-la-imagen.jpg)'}}></div>
      <div className='journal__entry-body'>
        <p className='journal__entry-title'>Titulo</p>
        <p className='journal__entry-content'>sdg sdgfsdf sdfsdf dsfsdfsdf dsf s s d fs ff.</p>
      </div>

      <div className='journal__entry-date-box'>
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  )
}
