import Cliente from './../entidad/Cliente.ts';

export class TLista {

    ListaTarifa: Cliente[];

    constructor(){
        this.ListaTarifa = [];
    }

    insertTarifa(maq: Cliente){
        this.ListaTarifa.push(maq);
    }

    editTarifa(index: number, maq:Cliente){
        this.ListaTarifa[index] = maq;
    }

    deleteTarifa(index: number){
        this.ListaTarifa.splice(index, 1);
    }

    

}