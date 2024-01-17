import Maquinaria from './Maquinaria'

class Cliente {

    nomCliente: string;
    maquina: Maquinaria;
    fechaEntrega: Date;
    fechaEvolucion: Date;
    

    constructor(nomc:string , fechaE:Date, fechaD: Date, maq: Maquinaria){
        this.nomCliente = nomc;
        this.fechaEntrega = fechaE;
        this.fechaEvolucion = fechaD;
        this.maquina = maq;
    }

    /**
     * Get the number of the days between the fechaEntrega and fechaEvolucion
     * @returns number --> days
     */
    calcDias(): number{
        const milisecDays = 24 * 60 * 60 * 1000;
        const difMili = this.fechaEvolucion.getTime() - this.fechaEntrega.getTime();
        return Math.round(difMili / milisecDays) + 1;
    }

    /**
     * Get the price of the Machine, discount included
     * @returns number --> price
     */
    calcImport(): number{
        const days = this.calcDias();
        const diaryImport = this.maquina.tarifa;
        let importation = days * diaryImport;

        if(days > 7){
            importation += 0.9; //discount
            //return days * diaryImport * 0.99;
        }
        return importation;
        //return days * diaryImport;
    }

    /**
     * Get the garanty of the machine, taking in consideration the 10%
     * @returns number --> warranty
     */
    calcGarantia(): number{
        const totalImport = this.calcImport();
        return totalImport * 0.1;
    }
    
    /**
     * Get the days between the Current date and the FechaDevolucion
     * @returns number --> days
     */
    calcDiasExedidos(): number{
        /*
        const dateToday = new Date();
        const difMili = dateToday.getTime() - this.fechaEvolucion.getTime();
        return Math.max( 0, Math.floor(difMili / (24 * 60 * 60 * 1000)) - 1);
        */
        
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const fechaDevolucionSinHora = new Date(this.fechaEvolucion);
        fechaDevolucionSinHora.setHours(0, 0, 0, 0); 

        const diffInMilliseconds =
        currentDate.getTime() - fechaDevolucionSinHora.getTime();
        return Math.max(0, Math.floor(diffInMilliseconds / (24 * 60 * 60 * 1000)));
        
    }

    /**
     * Get the amount of penalty
     * @returns number --> penalty fee
     */
    calcMulta(): number{
        const diasEx = this.calcDiasExedidos();
        const costoDiario = this.maquina.tarifa;
        let multa = 0;
        if(diasEx > 0){
            const lastMulta = costoDiario * 1.05;
            multa = diasEx * lastMulta;
        }
        return multa;
        //const multa = diasExedidos * (costoDiario * 1.05);
        //return Math.min(multa, this.calcGarantia());
    }

}

export default Cliente;
