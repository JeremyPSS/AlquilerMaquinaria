class Maquinaria{
    codMaquinaria: string;
    nomMaquinaria: string;
    tarifa: number;

    constructor(codM:string, nomM:string){
        this.codMaquinaria = codM;
        this.nomMaquinaria = nomM;

        switch (codM) {
            case "C01":
                this.tarifa = 100;
                break;
            case "C02": 
                this.tarifa = 50;
                break;
            case "C03": 
                this.tarifa = 150;
                break;
            default: 
                this.tarifa = 0;
        }
    }
}
export default Maquinaria;