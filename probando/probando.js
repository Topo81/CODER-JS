let contenedor = document.getElementById("contenedor")


const pegada = async () => {
  const response = await fetch('./peliculas.json')
  const peliculas = await response.json()
  renderizarPeliculas(peliculas)
  function renderizarPeliculas(arrayPeliculas) {
    contenedor.innerHTML = ''
    for (const { titulo, valor, disponibles, imgUrl, id } of arrayPeliculas) {
      let tarjetaPelicula = document.createElement('div')

      tarjetaPelicula.className = 'pelicula'
      tarjetaPelicula.innerHTML = `
      <h3>${titulo}</h3>
      <p>Quedan ${disponibles} asientos </p> <img src=${imgUrl}>
      <h4>$${valor}</h4> <button class="boton" id=${id}>Quiero mi entrada!</button>
      `
      contenedor.append(tarjetaPelicula)
    }
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


      Toastify({
        id: "tostada",
        text: "Entrada agregada",
        style: {
          background: "linear-gradient(to right, #6A15F4, #05000D)",
        
        },
        duration: 3000,

      }).showToast();

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
  let btnReset = document.getElementById("btnReset")
  btnReset.onclick = (e) => {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Si borras tu carrito perderas las entradas agregadas!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,borrar carrito!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado!',
          'Su carrito ha sido borrado',
          'success'
          
          
          )
          
          
          
          
        }
        
        
        /*localStorage.clear(), location.reload()*/
      })
      
  }

}
pegada()

