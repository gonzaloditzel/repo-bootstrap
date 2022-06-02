let destinos = [
    {
        id: 1,
        nombre: "Bariloche",
        precio: 9950,
        imagen: "./img/destino1.webp",
    },
    {
        id: 2,
        nombre: "Cataratas del Iguazu",
        precio: 12950,
        imagen: "./img/destino2.webp",
    },
    {
        id: 3,
        nombre: "Calafate",
        precio: 20800,
        imagen: "./img/destino3.jpg",
    },
    {
        id: 4,
        nombre: "Glaciar Perito Moreno",
        precio: 18900,
        imagen: "./img/destino4.jpg",
    },
    {
        id: 5,
        nombre: "Mendoza",
        precio: 15250,
        imagen: "./img/destino5.jpg",
    },
    {
        id: 6,
        nombre: "Cordoba",
        precio: 8800,
        imagen: "./img/destino6.jpg",
    },
    {
        id: 7,
        nombre: "San Luis",
        precio: 9500,
        imagen: "./img/destino7.jpeg",
    },
    {
        id: 8,
        nombre: "Ushuaia",
        precio: 20800,
        imagen: "./img/destino8.webp",
    }
];


const agregarAlCarrito = (idDelDestino) => {
    const indiceEncontradoCarrito = cart.findIndex((elemento) => {
        return elemento.id === idDelDestino;
    });
    
    // const cantPasajeros = [...document.querySelectorAll(".cantidadPasajeros")];
    // const inputCantidad = cantPasajeros.filter((element) => {
    //     element.getAttribute("id") === idDelDestino
    //     console.log("ID: "+ element.getAttribute("id"));
    // });
        
        
    if(indiceEncontradoCarrito === -1){
        const productoAgregar = destinos.find((elemento) => elemento.id === idDelDestino);
        productoAgregar.cantidad = 1;
        // productoAgregar.cantidad = parseInt(cantPasajeros);
        cart.push(productoAgregar);
        dibujarCarrito();
    }
    else{
        cart[indiceEncontradoCarrito].cantidad += 1;
        // cart[indiceEncontradoCarrito].cantidad += parseInt(cantPasajeros);
        dibujarCarrito();
    }
}
    
let modalCarrito = document.getElementById("cartt");

const dibujarCarrito = () => {
    let total = 0;
    modalCarrito.className = "cartt";
    modalCarrito.innerHTML = "";
    if(cart.length > 0){
        cart.forEach((destino, indice) =>{
            total = total + destino.precio * destino.cantidad;
            const carritoContainer = document.createElement("div");
            carritoContainer.className = "destino-carrito";
            carritoContainer.innerHTML= `
            <img class= "card-img" src="${destino.imagen}"/>
            <div class="destino-details">${destino.nombre}</div>
            <div class="destino-details"> Cantidad de pasajeros: ${destino.cantidad}</div>
            <div class="destino-details"> Precio por persona: $ ${destino.precio}</div>
            <div class="destino-details"> Subtotal: $ ${destino.precio * destino.cantidad}</div>
            <button class="btn btn-danger" id="remove-destino" onClick="removeDestino(${indice})">Eliminar</button>`;
            modalCarrito.appendChild(carritoContainer);
        });
        const totalContainer = document.createElement("div");
        totalContainer.className = "total-carrito";
        totalContainer.innerHTML = `<div class="total">Total: $ ${total}</div>
        <button class = "btn btn-danger finalizar" id="finalizar" onClick="finalizarCompra()">Procesar compra</button>`;
        modalCarrito.appendChild(totalContainer);
    }
    else{
        modalCarrito.classList.remove("cart");
    }
};

let cart = [];

const removeDestino = (indice) => {
    cart.splice(indice, 1);
    dibujarCarrito();
}


const formulario = document.querySelector('#search');
const btn = document.querySelector('#btn');
const resultado = document.querySelector('#resultado');

const filtrar = () => {

    resultado.innerHTML = '';

    const texto = search.value.toLowerCase();
    for(let destino of destinos){
        let nombre = destino.nombre.toLowerCase();
        if(nombre.indexOf(texto) != -1){
            resultado.innerHTML += `
            <div class="card mx-2 mb-5" style="width: 18rem; ">
                <img src=${destino.imagen} class="card-img-top card-img" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${destino.nombre}</h5>
                    <p id="precio" class="card-text">$ ${destino.precio}</p>
                    <li class="pasajeros">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
                        <path d="M256 288c79.53 0 144-64.47 144-144s-64.47-144-144-144c-79.52 0-144 64.47-144 144S176.5 288 256 288zM351.1 320H160c-88.36 0-160 71.63-160 160c0 17.67 14.33 32 31.1 32H480c17.67 0 31.1-14.33 31.1-32C512 391.6 440.4 320 351.1 320z"/></svg>
                        Pasajeros
                        <input type="number" id="cantidadPasajeros + ${destino.id}" value="1">
                    </li>
                    <button class="btn btn-danger" onClick = "agregarAlCarrito(${destino.id})">Agregar al carrito</button>
                </div>
            </div>`
        }
    }

    if(resultado.innerHTML === ''){
        resultado.innerHTML += `<li class="undefined">Producto no encontrado...</li>`;
    }
};

btn.addEventListener('click', filtrar);

formulario.addEventListener('keyup', filtrar);

filtrar();

const finalizarCompra = () => {
    modalCarrito.innerHTML = "";
    const formulario = `
    <h2 class="cardTitle">Proceso de compra</h2>
    <div class="contact-container">

        <form class="form">

            <label>Nombre</label>
            <input type="text" id="nombre" placeholder="Nombre" />
            
            <label>E-mail</label>
            <input type="text" id="mail" placeholder="E-mail" />
            
            <label>Telefono</label>
            <input type="text" id="telefono" placeholder="Telefono" />
            
            <label>Tarjeta</label>
            <input type="text" id="Tarjeta" placeholder="Tarjeta" />

        </form>
    </div>
    <div class="contact-button">
        <button type="button" class="btn btn-danger envio" onClick="mostrarMensaje()">Confirmar</button>
    </div>
        
    `;
    modalCarrito.innerHTML = formulario;
}

const mostrarMensaje = () => {
    const nombreCliente = document.getElementById("nombre").value;
    modalCarrito.innerHTML = "";
    let mensaje = `
    <div class="mensaje-final">Gracias ${nombreCliente} por tu compra!</div>`;
    modalCarrito.innerHTML = mensaje;
}

