import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

  const dispatch = useDispatch();

  const {active: note} = useSelector( state => state.notes);
  const [ formValues, handleInputChange, reset ] = useForm( note );

  const { body, title, id } = formValues;

  //useRef me permite crear una variable mutable que no va a renderizar el componente.
  const activeId = useRef( note.Id);
  
  useEffect(() => {
    
    if(activeId.current !== note.id){
      reset(note);
      activeId.current = note.id;
    }

  }, [note, reset])
  
  useEffect(() => {

    dispatch( activeNote(formValues.id, { ...formValues }));

  }, [formValues, dispatch])
  
  const handeDelete = () => {
    dispatch( startDeleting( id ) );
  }

  return (
    <div className='notes__main-content'>
        
        <NotesAppBar />
        <div className='notes__content'>
            <input type="text" placeholder="Some awesome title" autoComplete='off' className='notes__title-input' name='title' onChange={handleInputChange} value={title} />
            <textarea className='notes__textarea' placeholder='Wath happend today' name='body' onChange={handleInputChange} value={body}></textarea>
            { note.url &&
              <div className='notes__image'>
                <img src={note.url} alt="imagen" />
              </div>
            }
        </div>

        <button onClick={handeDelete} className='btn btn-danger'>Delete</button>
    </div>
  )
}
