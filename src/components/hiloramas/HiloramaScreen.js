import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeHilorama, startDeleting } from '../../actions/hilorama';
import { useForm } from '../../hooks/useForm';
import { HiloramaAppBar } from './HiloramaAppBar'

export const HiloramaScreen = () => {

  const dispatch = useDispatch();

  const {active: hilorama} = useSelector( state => state.hiloramas);
  const [ formValues, handleInputChange, reset ] = useForm( hilorama );

  const { body, title, id } = formValues;

  //useRef me permite crear una variable mutable que no va a renderizar el componente.
  const activeId = useRef( hilorama.Id);
  
  useEffect(() => {
    
    if(activeId.current !== hilorama.id){
      reset(hilorama);
      activeId.current = hilorama.id;
    }

  }, [hilorama, reset])
  
  useEffect(() => {

    dispatch( activeHilorama(formValues.id, { ...formValues }));

  }, [formValues, dispatch])
  
  const handeDelete = () => {
    dispatch( startDeleting( id ) );
  }

  return (
    <div className='item__main-content'>
        
        <HiloramaAppBar />
        <div className='item__contents'>

          <div className='item__content'>
            <div className='item__item'>
                <input type="text" placeholder="Some awesome title" autoComplete='off' className='item__title-input' name='title' onChange={handleInputChange} value={title} />
                <textarea className='item__textarea' placeholder='Wath happend today' name='body' onChange={handleInputChange} value={body}></textarea>
            </div>
            <div className='item__item'>
              { hilorama.url &&
                <div className='item__image'>
                  <img src={hilorama.url} alt="imagen" />
                </div>
              }
            </div>
          </div>
          <div className='item__content'>
              
          </div>
        </div>

        <button onClick={handeDelete} className='btn btn-danger'>Delete</button>
    </div>
  )
}
