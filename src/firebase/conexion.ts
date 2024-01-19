import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAXR1Wd_9IE52Qu3EkSZnPXxquQLAyFBd4",
    authDomain: "construcam-sa.firebaseapp.com",
    projectId: "construcam-sa",
    storageBucket: "construcam-sa.appspot.com",
    messagingSenderId: "992071421992",
    appId: "1:992071421992:web:db5712e0dcf2d400cca51d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
export const dbref = collection(db,"clients");

/**
 * Add a doc to the firestore
 * Require: --> name,machine,dateD,dateR,total,multa
 */
export class ClientDB {
    saveClient(cliente: string, maquinaria: string, fechaEntrega: string, fechaDevolucion: string, total: number, multa:number) {
        return addDoc(collection(db, "clients"), {
            cliente,
            fechaEntrega,
            fechaDevolucion,
            maquinaria,
            multa,
            total,
        });
    }
}
