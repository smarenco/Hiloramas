import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadHilorama } from "../helpers/loadHilorama";
import { types } from "../types/types";


export const startNewHilorama = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const newHilorama = {
            title: '',
            body: '',
        }

        const doc =  await db.collection('hiloramas').add(newHilorama);

        dispatch(activeHilorama(doc.id, newHilorama));
        dispatch(addNewHilorama(doc.id, newHilorama));
    }
}

export const activeHilorama = (id, hilorama) => ({
    type: types.hiloramaActive,
    payload: {
        id,
        ...hilorama
    }
})

export const addNewHilorama = (id, hilorama) => ({
    type: types.hiloramaAddNew,
    payload: {
        id,
        ...hilorama
    }
})

export const startLoadingHilorama = ( uid ) => {
    return async ( dispatch ) => {
        const hiloramas = await loadHilorama( uid );

        dispatch( setHiloramas( hiloramas ) );
    }
}

export const setHiloramas = (hiloramas) => ({
    type: types.hiloramaLoad,
    payload: hiloramas
})

export const startSaveHilorama = (hilorama) =>{
    return async ( dispatch, getState) => {
        const { uid } = getState().auth;

        if(!hilorama.url){
            delete hilorama.url;
        }

        const hiloramaToFirestore = { ...hilorama };
        delete hiloramaToFirestore.id;

        await db.doc(`hiloramas/${hilorama.id}`).update(hiloramaToFirestore);

        dispatch( refreshHilorama(hilorama.id, hiloramaToFirestore));
        Swal.fire('Saved', hilorama.title, 'success')
    }
}

export const refreshHilorama = (id, hilorama) => ({
    type: types.hiloramaUpdated,
    payload: {
        id, 
        hilorama: { id, ...hilorama}
    }
})

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {
        const { active: activeHilorama } = getState().hiloramas;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => Swal.showLoading()
        });

        const fileUrl = await fileUpload( file );

        activeHilorama.url = fileUrl;
        dispatch( startSaveHilorama(activeHilorama));

        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        await db.doc(`hiloramas/${ id }`).delete();

        dispatch( deleteHilorama(id) );

    }
}

export const deleteHilorama = ( id ) => ({
    type: types.hiloramaDelete,
    payload: id
})

export const logoutHilorama = () => ({
    type: types.hiloramaLogoutCleaning
})