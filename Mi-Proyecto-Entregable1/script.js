let destino
let pago
do {
     destino =Number( prompt("¿A que destino desea viajar?       1-Buenos Aires    2-Cordoba"))
        if (((destino < 1) || (destino > 2))) {
        alert("ERROR: INGRESE UN DESTINO VALIDO")
        }
    
    } while ((destino < 1) || (destino > 2))  

do {
    pago = Number(prompt("Introduce metodo de pago  1-Efectivo  2-Tarjeta de credito (15% de recargo) "));
    if (((pago < 1) || (pago > 2))) {
        alert("ERROR:INGRESE UN MODO DE PAGO VALIDO")
    }
} while ((pago < 1) || (pago > 2)) ;

const buenosaires= 3500  
const cordoba= 2500
const efectivo= 1
const tarjeta= (1+(15/100))

destino= procesarDestino(destino)
pago=  procesarPago(pago)  
console.log(destino,pago)
costo(destino,pago)  

function procesarDestino(destino){
    switch(destino){
      case 1:
            destino=buenosaires
            
        break
      case 2:
            destino=cordoba
            
        break
    default:
          alert('no es un destino válido') 
    break
        
      }
      return(destino)
} 

function procesarPago(pago){
    switch(pago){
    case 1:
     pago= efectivo
    break
    case 2:
     pago= tarjeta
    break
        default:
     alert('no es un metodo de pago válido')
    break
     } 
     return(pago)
}  


function costo(destino,pago){
    alert("Su viaje cuesta " + (destino * pago).toFixed(2))
}
