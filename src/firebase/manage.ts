import {dbref} from './conexion.ts';
import { getDocs, DocumentData, deleteDoc} from 'firebase/firestore';

export async function listClients() {
    const tabla = document.getElementById('tb_record');
    if (tabla) {
        tabla.innerHTML = '';

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `<th>Cliente</th>
                               <th>Fecha Entrega</th>
                               <th>Fecha Devolución</th>
                               <th>Maquina</th>
                               <th>Multa</th>
                               <th>Total</th>`;
        tabla.appendChild(headerRow);

        try {
            const querySnapshot = await getDocs(dbref);
            querySnapshot.forEach((doc) => {
                const data = doc.data() as DocumentData;
                
                const fila = document.createElement('tr');
                fila.innerHTML = `<td>${data.cliente}</td>
                                  <td>${data.fechaEntrega}</td>
                                  <td>${data.fechaDevolucion}</td>
                                  <td>${data.maquinaria}</td>
                                  <td>${data.multa}</td>
                                  <td>${data.total}</td>`;

                // Create a delete button
                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Eliminar';
                deleteButton.addEventListener('click', async () => {
                    try {
                        // Delete the document from Firestore using doc.ref
                        await deleteDoc(doc.ref);
                        // Remove the row from the table
                        fila.remove();
                    } catch (error) {
                        console.error('Error deleting document:', error);
                    }
                });

                // Append the delete button to the row
                fila.appendChild(deleteButton);


                tabla.appendChild(fila);
            });
        } catch (error) {
            console.error('Error to get data from Firebase:', error);
        }
    } else {
        console.error('that table with that id does not exist');
    }
}
/*
export async function listClients() {
    const tabla = document.getElementById('tb_record');
    if (tabla) {
        tabla.innerHTML = '';
        try {
            const querySnapshot = await getDocs(dbref); //get the data
            querySnapshot.forEach((doc) => { //fill the data into the table
                const data = doc.data() as DocumentData;
                const fila = document.createElement('tr');
                fila.innerHTML = `<td>${data.cliente}</td>
                <td>${data.fechaEntrega}</td>
                <td>${data.fechaDevolucion}</td>
                <td>${data.maquinaria}</td>
                <td>${data.multa}</td>
                <td>${data.total}</td>`;
                tabla.appendChild(fila);
            });
        } catch (error) {
            console.error('Error to get data from Firebase:', error);
        }
    } else {
        console.error('that table with that id does not exist');
    }
}
*/