import { db } from "../firebase/firebase-config"


export const loadHilorama = async(uid) => {
    const hiloramaSnap = await db.collection(`hiloramas`).get();
    const hiloramas = [];

    hiloramaSnap.forEach((snapHijo) => {
        hiloramas.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });
    })

    return hiloramas;
}
