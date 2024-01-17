import './style.css'
import Cliente from './entidad/Cliente'
import Maquinaria   from './entidad/Maquinaria';
import { TLista } from './controlador/TLista.ts';

const Lista = new TLista();
const carrito: Cliente[] = [];

/**FORM TO INSERT MACHINES */
document.getElementById('frmedit')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const cod = (<HTMLInputElement>document.getElementById('txtcod'))?.value || '';
  const nom = (<HTMLInputElement>document.getElementById('txtnom'))?.value || '';
  const maquinaria = (<HTMLSelectElement>document.getElementById('maquinaria'))?.value || '';
  const fechaEntrega = (<HTMLInputElement>document.getElementById('fechaentrega'))?.value || '';
  const fechaDevolucion = (<HTMLInputElement>document.getElementById('fechadevolucion'))?.value || '';
  const index = (document.getElementById('maquinaria-index') as HTMLInputElement)?.value || '';
  
  if (cod === '' || nom === '' || maquinaria === '' || maquinaria === 'Elija una maquinaria' || fechaEntrega === '' || fechaDevolucion === '') {
    alert('Verifica los campos, e intenta de nuevo!!!');
    return;
  }
  
  function DateFormated(datef: string): Date {
    const sides = datef.split('/');
    const dd = parseInt(sides[0], 10);
    const mm = parseInt(sides[1], 10);
    const yy = parseInt(sides[2], 10);
    
    return new Date(yy, mm - 1, dd);
  }

  const machine = new Maquinaria(cod, maquinaria);
  const dateDelivery = DateFormated(fechaEntrega);
  const dateRetrun = DateFormated(fechaDevolucion);
  const alquiler = new Cliente(nom, dateDelivery, dateRetrun, machine);
  //const dateRetrun = new Maquinaria(cod, maquinaria);
  //const machine = new Date(`${fechaEntrega}T00:00:00`);
  //const machine = new Date(`${fechaDevolucion}T00:00:00`);
  //const dateRetrun = new Cliente(nom , fechaActual, fechaMax, maquina);

  if (index === '') {
      Lista.insertTarifa(alquiler);
  }
  else 
  {
    Lista.editTarifa(Number(index), alquiler);
  }

  (<HTMLInputElement>document.getElementById('maquinaria-index')).value = '';
  //micode
  (<HTMLInputElement>document.getElementById('txtcod')).value = '';
  (<HTMLInputElement>document.getElementById('txtnom')).value = '';
  (<HTMLInputElement>document.getElementById('txtprecio')).value = '';
  (<HTMLSelectElement>document.getElementById('maquinaria')).value = '';

  const form = document.getElementById('frmedit') as HTMLFormElement;
  form.style.display = "none";
  updateMainTable();
});



/**BUTTON FOR MAKE DELIVERY */
document.getElementById('makeDelivery')?.addEventListener('click', () => {
  let total = 0;
  let multa = 0;

  let garantia = 0;


  let totalfinal = 0;



  //SHOW IN NOTIFICATION THE INFO
  for (let cliente of carrito) {

    total += cliente.calcImport();
    multa += cliente.calcMulta();
    garantia += cliente.calcGarantia();

    if(multa > garantia){
      //pay the multa
      multa -= garantia;
      garantia = 0;
    }else{
      //dont pay the multa
      garantia -= multa;
      multa = 0;
    }


    totalfinal += cliente.calcImport() + multa;
    document.getElementById('total')!.textContent = `$${total}`;
    document.getElementById('garantia')!.textContent = `$${garantia}`;
    document.getElementById('multa')!.textContent = `$${multa}`;
  }
  //document.getElementById('multatotal')!.textContent = `Precio Total: $${totalfinal}`;
  document.getElementById('multatotal')!.textContent = ` $${totalfinal}`;
  alert('Has devuelto la maquinaria a CONTRUCAM S.A exitosamente');

});

/**UPDATE THE TABLE OF RENTED MACHINES */
function updateMainTable() {
  const tbody = document.getElementById('tablamaquina')!.getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';
  for (let i = 0; i < Lista.ListaTarifa.length; i++) {
    const cliente = Lista.ListaTarifa[i];
    console.log(cliente.fechaEntrega);
    /**INSERT THE VALUES */
    const row = tbody.insertRow();
    row.insertCell(0).textContent = String(i + 1); //index
    row.insertCell(1).textContent = String(cliente.nomCliente); 
    row.insertCell(2).textContent = String(cliente.maquina.nomMaquinaria); //name of machine
    row.insertCell(3).textContent = String(cliente.calcImport()); //Importe
    //row.insertCell(4).textContent = String(cliente.fechaEntrega.toLocaleDateString('es-ES', { timeZone: 'America/Guayaquil' }).split('/').reverse().join('-')); //Fecha Entrega
    //row.insertCell(5).textContent = String(cliente.fechaEvolucion.toLocaleDateString('es-ES', { timeZone: 'America/Guayaquil' }).split('/').reverse().join('-')); //Fecja Devolucion
    row.insertCell(4).textContent = cliente.fechaEntrega.toLocaleDateString('es-ES');
    row.insertCell(5).textContent = cliente.fechaEvolucion.toLocaleDateString('es-ES');
    const acciones = row.insertCell(6);

    //ADD TO THE ROW, THE BUTTON OF "Preparar entrega"
    const addToCartButton = document.createElement('button'); 
    addToCartButton.textContent = 'Preparar entrega';
    addToCartButton.classList.add('btn', 'btn-success', 'mr-2');
    addToCartButton.addEventListener('click', () => {
      carrito.push(cliente);
      updateSecundaryTable();
      alert('PREPARADO, Enviado a MAQUINAS LISTAS!!');
    });
    acciones.appendChild(addToCartButton);

    //ADD TO THE ROW, THE BUTTON OF "Editar"
    const modificarButton = document.createElement('button');
    modificarButton.textContent = 'Editar';
    modificarButton.classList.add('btn', 'btn-primary', 'mr-2');
    modificarButton.addEventListener('click', () => {
      //SET THE CURRENT ROW VALUES FOR FORM EDIT, means it will be differents event listeners
      (<HTMLInputElement>document.getElementById('txtcod')).value = String(cliente.maquina.codMaquinaria);
      (<HTMLInputElement>document.getElementById('txtnom')).value = String(cliente.nomCliente);
      (<HTMLInputElement>document.getElementById('maquinaria')).value = String(cliente.maquina.nomMaquinaria);
      (<HTMLInputElement>document.getElementById('txtprecio')).value = String(cliente.maquina.tarifa);
      //(<HTMLInputElement>document.getElementById('fechadevolucion')).value = String(cliente.fechaEvolucion.toLocaleDateString('es-ES').split('/').reverse().join('-'));
      (<HTMLInputElement>document.getElementById('fechadevolucion')).value = cliente.fechaEvolucion.toLocaleDateString('es-ES');
      (<HTMLInputElement>document.getElementById('maquinaria-index')).value = String(i);
      //DISPLAY THE FORM
      const form = document.getElementById('frmedit') as HTMLFormElement;
      if (form.style.display === "none") {
        form.style.display = "block";
      } else {
        form.style.display = "none";
      }
    });
    acciones.appendChild(modificarButton);

    //ADD TO THE ROW, THE BUTTON OF "ELIMINAR"
    const eliminarButton = document.createElement('button');
    eliminarButton.textContent = 'Eliminar';
    eliminarButton.classList.add('btn', 'btn-danger');
    eliminarButton.addEventListener('click', () => {
      Lista.deleteTarifa(i);
      updateMainTable();
    });
    acciones.appendChild(eliminarButton);
  }
}

/**BUTTON TO DISPLAY EDIT/INSERT FORM */
document.getElementById('add-product-button')?.addEventListener('click', () => {
  const form = document.getElementById('frmedit') as HTMLFormElement;
  if (form.style.display === "none") {
      form.style.display = "block";
      form.style.position = "fixed";
      form.style.top = "50%"; // Adjust this value to position the form vertically
      form.style.left = "50%"; // Adjust this value to position the form horizontally
      form.style.transform = "translate(-50%, -50%)"; // Center the form
  } else {
      form.style.display = "none";
  }
});

/**HIDE THE EDIT/INSERT FORM WHEN LOAD THE PAGE */
window.addEventListener('load', () => {
  const form = document.getElementById('frmedit') as HTMLFormElement;
  form.style.display = "none";
});


/**UPDATE THE TABLE OF MACHINES READY TO DELIVERY*/
function updateSecundaryTable() {
  const tbody = (<HTMLTableElement>document.getElementById('tablacarro'))?.tBodies.item(0);
  tbody?.remove(); //table won't display any rows until new rows are added
  const newTbody = document.createElement('tbody'); //copy the DOM references (id also) to the new tbody
  var dateR = new Date();
  var dateReference = dateR.toLocaleDateString('es-ES',{day:'2-digit',month:'2-digit',year:'numeric'})
  //INSERT THE NEW DATA
  carrito.forEach((alquiler, index) => {
    const row = newTbody.insertRow();
    row.insertCell().textContent = (index + 1).toString();
    row.insertCell().textContent = alquiler.nomCliente;
    row.insertCell().textContent = alquiler.maquina.nomMaquinaria;
    //row.insertCell().textContent = String(alquiler.fechaEntrega.toLocaleDateString('es-ES').split('/').reverse().join('-'));
    //row.insertCell().textContent = String(alquiler.fechaEvolucion.toLocaleDateString('es-ES').split('/').reverse().join('-'));
    row.insertCell().textContent = alquiler.fechaEntrega.toLocaleDateString('es-ES');
    row.insertCell().textContent = alquiler.fechaEvolucion.toLocaleDateString('es-ES');
    row.insertCell().textContent = String(alquiler.calcDias());
    row.insertCell().textContent = dateReference + " ( " + String(alquiler.calcDiasExedidos()) + " dias Atraso)";
    row.insertCell().textContent = String(alquiler.calcImport());
    //row.insertCell().textContent = String(alquiler.calcTotalImport());
    const acciones = row.insertCell();

    //ADD TO THE ROW, THE BUTTON OF "Anular"
    const removeFromCartButton = document.createElement('button');
    removeFromCartButton.textContent = 'Anular';
    removeFromCartButton.classList.add('btn', 'btn-danger');
    removeFromCartButton.dataset.index = index.toString();
    removeFromCartButton.addEventListener('click', () => {
    const index = Number(removeFromCartButton.dataset.index);
    carrito.splice(index, 1);
    updateSecundaryTable();
    });
    acciones.appendChild(removeFromCartButton);
  });
  document.getElementById('tablacarro')?.appendChild(newTbody);
}

/**BUTTON TO DISPLAY AGAIN THE TABLE OF RENTED MACHINES */
document.getElementById('products-button')?.addEventListener('click', () => {
  const productSection = document.getElementById('seccion-producto');
  const cartSection = document.getElementById('seccion-carro');
  if (productSection && cartSection) {
    productSection.style.display = 'block';
    cartSection.style.display = 'none';
  }
});

/**BUTTON TO DISPLAY THE TABLE OF MACHINES READY TO DELIVERY */
document.getElementById('cart-button')?.addEventListener('click', () => {
  const productSection = document.getElementById('seccion-producto');
  const cartSection = document.getElementById('seccion-carro');
  if (productSection && cartSection) {
    productSection.style.display = 'none'; //element will start on a new line and take full width available
    cartSection.style.display = 'block'; //remove the element from the document flow
  }
});

/**BUTTON TO CANCEL EDIT/INSERT FORM */
document.getElementById('cancelButton')?.addEventListener('click', () => {
  const form = document.getElementById('frmedit') as HTMLFormElement;
  (<HTMLInputElement>document.getElementById('txtcod')).value = '';
  (<HTMLInputElement>document.getElementById('txtnom')).value = '';
  (<HTMLInputElement>document.getElementById('txtprecio')).value = '';
  (<HTMLSelectElement>document.getElementById('maquinaria')).value = '';
  (document.getElementById('maquinaria-index') as HTMLInputElement).value = '';
  form.style.display = "none";
});
