import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveHilorama, startUploading } from '../../actions/hilorama';

export const HiloramaAppBar = () => {

  const dispatch = useDispatch();
  const { active: hilorama } = useSelector( state => state.hiloramas)
  
  const handleSave = () => {
    dispatch( startSaveHilorama(hilorama) );
  }

  const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if( file ){
      dispatch( startUploading(file) );
    }
  }

  return (
    <div className='item__appbar'>
        <span></span>

        <input type="file" id='fileSelector' style={{display: 'none'}} onChange={handleFileChange}/>
        <div>
            <button className='btn' onClick={handlePictureClick}>Picture</button>
            <button className='btn' onClick={handleSave}>Save</button>

        </div>
    </div>
  )
}
