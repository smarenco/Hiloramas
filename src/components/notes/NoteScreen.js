import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  return (
    <div className='notes__main-content'>
        
        <NotesAppBar />
        <div className='notes__content'>
            <input type="text" placeholder="Some awesome title" autoComplete='off' className='notes__title-input' />
            <textarea className='notes__textarea' placeholder='Wath happend today'></textarea>
            <div className='notes__image'>
                <img src="https://josefacchin.com/wp-content/uploads/2020/02/como-quitar-el-fondo-de-una-imagen.png" alt="imagen" />
            </div>
        </div>

    </div>
  )
}
