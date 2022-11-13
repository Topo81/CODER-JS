let peliculas = [
    { id: 1, titulo: "Sonrie", año: 2022, aptaPara: "+18", genero: "Terror", valor: 450, disponibles: 10, imgUrl: "images/Smile.jpg" },
    { id: 2, titulo: "Black Adam", año: 2022, aptaPara: "+16", genero: "Accion", valor: 450, disponibles: 15, imgUrl: "images/Black-Adam.png" },
    { id: 3, titulo: "Black Panter", año: 2022, aptaPara: "+16", genero: "Accion", valor: 450, disponibles: 5, imgUrl: "images/Black-Panther.jpg" },
    { id: 4, titulo: "Forest Gump", año: 1994, aptaPara: "+18", genero: "Drama", valor: 300, disponibles: 20, imgUrl: "images/Forest.jpg" },
    { id: 5, titulo: "Guerra de papas", año: 2015, aptaPara: "Todo publico", genero: "Comedia", valor: 450, disponibles: 15, imgUrl: "images/Daddys-Home.jpg" },
    { id: 6, titulo: "Dragon Ball Super", año: 2022, aptaPara: "Todo publico", genero: "Animada", valor: 450, disponibles: 5, imgUrl: "images/Dragon-ball.jpg" }
]

let contenedor = document.getElementById("contenedor")

contenedor.innerHTML = ''
for (const pelicula of peliculas) {
    let tarjetaPelicula = document.createElement('div')
    tarjetaPelicula.className = 'pelicula'
    tarjetaPelicula.innerHTML = `
    <h3>${pelicula.titulo}</h3>
    <p>Quedan ${pelicula.disponibles} asientos </p> <img src=${pelicula.imgUrl}>
    <h4>$${pelicula.valor}</h4> <button class="boton" id=${pelicula.id}>Quiero mi entrada!</button>
    `
    contenedor.append(tarjetaPelicula)
}

let botones = document.getElementsByClassName('boton')
let carrito = document.getElementById('carrito')

let carritoGuardado = []
if (localStorage.getItem('carrito')) {
    carritoGuardado = JSON.parse(localStorage.getItem('carrito'))
}

renderizarCarrito()

for (const boton of botones) {
    boton.onclick = (e) => {
        let peliculaBuscada = peliculas.find(pelicula => pelicula.id == e.target.id)
        
        let posicionPeliculaEnCarrito = carritoGuardado.findIndex(pelicula => pelicula.id == peliculaBuscada.id)

        if (posicionPeliculaEnCarrito != -1) {
            carritoGuardado[posicionPeliculaEnCarrito].unidades++
            carritoGuardado[posicionPeliculaEnCarrito].subtotal = carritoGuardado[posicionPeliculaEnCarrito].valorUnidad * carritoGuardado[posicionPeliculaEnCarrito].unidades
        } else {
            carritoGuardado.push({ id: peliculaBuscada.id, titulo: peliculaBuscada.titulo, valorUnidad: peliculaBuscada.valor, unidades: 1, subtotal: peliculaBuscada.valor })
        }

        localStorage.setItem('carrito', JSON.stringify(carritoGuardado))
        renderizarCarrito()

    }
}

function renderizarCarrito() {
    carrito.innerHTML = `
          <div class="itemCarrito">
            <p><strong>Titulo</strong></p>
            <p><strong>Valor entrada</strong></p>
            <p><strong>Unidades</strong></p>
            <p><strong>Subtotal</strong></p>
          </div>
        `
    let total = 0
    for (const item of carritoGuardado) {
        total += item.subtotal
        carrito.innerHTML += `
            <div class="itemCarrito">
              <p>${item.titulo}</p>
              <p>${item.valorUnidad}</p>
              <p>${item.unidades}</p>
              <p>${item.subtotal}</p>
            </div>
          `
    }
    carrito.innerHTML += `
          <div class="itemCarrito">
            <h3>Total: ${total}</h3>
          </div>
        `
}
let btnReset= document.getElementById("btnReset")
btnReset.onclick=(e)=> {(localStorage.clear())
                        location.reload()}
