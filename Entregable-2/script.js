class Productos{
    constructor(id, destino, precio, pais){
        this.id=id,
        this.destino=destino,
        this.precio=precio,
        this.pais=pais
    }

}

const producto0= new Productos(0,"Buenos Aires",3500,"argentina");
const producto1= new Productos(1,"Cordoba",2500,"argentina");
const producto2= new Productos(2,"Ushuaia", 10000,"argentina")
//-----------------------------------------------------------------------------------------------------------------
let eligePais=Number(prompt("Elija a donde desea viajar: \n 1-Argentina \n 2-Resto del mundo"))

const catalogo=[producto0,producto1,producto2]
const catalogoArg= catalogo.filter((el)=>el.pais=="argentina")

if(eligePais===2){
    alert("Los viajes a otras regiones se encuentran suspendidos \n ingrese a www.topoviajes.com para mas info.")
}else if(eligePais===1){
    const carrito=[];
    agregaCarrito(carrito)
}
//--------------------------------------------------------------------------------------------------------------
//FUNCION 1
function verCarrito(carrito){
    let productosCarrito
    let precioCarrito
    productosCarrito = "Ud esta adquiriendo un viaje(s) a : \n"
    precioCarrito = 0
    for (const itemCarrito of carrito) {
        productosCarrito+= `\n - ${itemCarrito.destino}`
        precioCarrito+= itemCarrito.precio
    }
    

    alert(`Confirme: \n ${productosCarrito} \n por un total de $ ${precioCarrito}`)
    
}
//FUNCION 2
function agregaCarrito(carrito){
    let oferta = `Estas son las ofertas de hoy \n`
    
    for ( item of catalogoArg) {
        
        oferta+=`\n +  ${item.id} - ${item.destino} a $ ${item.precio}`
    }
    oferta+=`\n Ingrese el numero de oferta que desea agregar a su carrito.\n Para finalizar pulse 9`
   
    let respuesta=parseInt(prompt(oferta))
    
    while( isNaN(respuesta)){
        alert("Ingrese una opcion valida")
        respuesta=parseInt(prompt(oferta))
    }

    while(respuesta != 9){
        switch(respuesta){
            case 0:
                carrito.push(catalogoArg[0])
                alert(`Se agrego su viaje a ${catalogo[0].destino} correctamente `)
                break;
            case 1:
                carrito.push(catalogoArg[1])
                alert(`Se agrego su viaje a ${catalogo[1].destino} correctamente`)
                break;
            case 2:
                carrito.push(catalogoArg[2])
                alert(`Se agrego su viaje a ${catalogo[2].destino} correctamente `)
                break;
            default:
                alert("Lo lamento con contamos con ese producto")
                break;            
        }
        respuesta=Number(prompt(oferta))
    }

    alert("Carrito confirmado")
    verCarrito(carrito);
    

}
