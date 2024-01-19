**PRUEBA DE PROGRAMACION MOVIL** 

**Diseño de la base de datos**

![](EDR_ExamenAlquierMaquinarias.png)

**CASO DE ESTUDIO**

La empresa contrucam s.a nos pide que realizar una aplicación web utilizando html, html5, hojas de estilo (CSS, SASS, SCSS, LESS), lenguaje typescript. Para llevar el control del alquiler de su maquinaria se pide realizar lo siguiente: 

**Req01- Requerimiento de tarifa** 



|**Código** |**TARIFA** |||
| - | - | :- | :- |
|C01 |Tractores  |$100 |El día |
|C02 |Mescladores |$50 |El día |
|C03 |Volquetas |$150 |El día |

**Req02-Requerimiento de alquiler de maquinaria** 

Para el alquiler de la maquinaria se considera cliente, maquinaria, fecha de entrega y fecha de devolución, realizar las siguientes condiciones para obtener el importe total a cobrar por el alquiler de maquinaria con las siguientes condiciones: 

- DÍAS: Los días que median entre la fecha de recogida del vehículo y la fecha de entrega. 
- IMPORTE: Si el tipo de maquinaria se multiplicar los días por la tarifa. 
- DESCUENTO: Si los días son superiores a 7 días aplicar un descuento del 10%. 
- IMPORTE TOTAL: Importe menos descuento y multa. 
- GARANTIA: Se considera un valor de una garantía por el alquiler de la maquinaria, este valor será de un 10 % del valor total a pagar. 



|**Cliente** |**Maquinaria** |**Fecha Entrega** |**Fecha Devolución** |**Días** |**Importe** |**Descuento** |**Garantía**   |`  `**Multa** |**Total Pagar** |
| - | - | :- | :- | - | - | - | - | - | - |
|Mario Castro |C01 |20/12/2021 |24/12/21 |||||||
|Juan Díaz |C02 |26/12/2021 |23/12/21 |||||||
|Elker Carrión |C03 |20/12/2021 |15/12/21 |||||||


**Req03-Requerimiento de entrega de maquinaria** 

- Para la entrega de la maquinaria se considera como ingreso la fecha de devolución, esta fecha debe ser mayor a la fecha de entrega, si la fecha actual es igual a la fecha de devolución de la maquinaria no se cobra ninguna multa y se devuelve la garantía. 
- MULTA: Si se excede de la fecha de devolución se cobrará una multa multiplicando el valor de maquinaria por el costo de maquinaria por día más del 5 % de este valor de multa, este valor deberá ser excrementado de garantía, el valor de la multa es mayor a de la garantía se deberá cobrar ese valor. 

Realizar lo siguiente: 

- Crear el diseño de la base de datos con sus respectivas tablas, atributos y relaciones. 
- Del problema anterior agregar una conexión a una base de datos relacional o no relacional que permita almacenar la información. 
