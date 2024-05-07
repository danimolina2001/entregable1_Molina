// FUNCIONES RELACIONADAS AL REGISTRO E INICIO DE SESION DE LOS USUARIOS QUE COMPRAN

// Array de usuarios
let usuario, clave;
const usuarios = [
  { usuario: usuario,
    clave: clave,
    intentosFallidos: 0,
  }
]

// Función para verificar si un usuario ya existe
function verificarUsuarioExistente(nuevoUsuario) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].usuario === nuevoUsuario) {
      return true; // Usuario existente encontrado
    }
  }
  return false; // Usuario no existente
}

// Función para verificar la clave de un usuario
function verificarClave(usuario, claveIngresada) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].usuario === usuario) {
      if (usuarios[i].clave === claveIngresada) {
        usuarios[i].intentosFallidos = 0; // Reinicia intentos fallidos
        return true; // Clave correcta
      } else {
        usuarios[i].intentosFallidos++; // Incrementa intentos fallidos
        if (usuarios[i].intentosFallidos >= 10) {
          alert(`Usuario ${usuario} bloqueado.`);
          return false; // Usuario bloqueado
        }
        return false; // Clave incorrecta
      }
    }
  }
  return false; // Usuario no encontrado
}

// Función para registrar un nuevo usuario
function registrarUsuario(usuario, clave) {
  if (!verificarUsuarioExistente(usuario)) {
    usuarios.push({ usuario, clave, intentosFallidos: 0 });
    alert(`Usuario ${usuario} registrado.`);
  } else {
    alert('El usuario ya existe.');
  }
}

// Función para inicio de sesion
function inicioSesion(){
  const usuario = prompt('Ingrese su usuario para realizar compras: ');
  if (verificarUsuarioExistente(usuario)) {
    alert('Bienvenido nuevamente! Por favor haga click en aceptar para ingresar su clave.')
    
    let intentos = 0;
    while (intentos < 10) {
      const clave = prompt('Ingrese su clave: ');
      if (verificarClave(usuario, clave)) {
        alert('Clave correcta. Puede proceder a realizar sus compras!');
        break; // Sale del bucle si la clave es correcta
      } else {
        alert('Clave incorrecta. Por favor, inténtelo nuevamente.');
        intentos++;
      }
    }

    if (intentos === 10) {
      alert('Ha superado el límite de intentos. Por favor, inténtelo más tarde.');
    }
    const clave = prompt('Ingrese su clave: ' )
    if (verificarClave(usuario, clave)) {
      alert('Clave correcta. Puede proceder a realizar sus compras!')

    } else {
      alert('Clave incorrecta :(')
    }

  } else {
    alert('Bienvenido!')
    const clave = prompt('Ingrese su clave a registrar: ')
    registrarUsuario(usuario, clave)
  }

}


// FUNCIONES RELACIONADAS A LOS PRODUCTOS QUE SE VENDEN

// Datos de los productos
const productos = [
  {
    id: 1,
    titulo: 'Taza ondas',
    imagen: './assets/taza-mango.jpg',
    precio: 9000,
    descripcion: 'Taza con asa en forma de ondas irregulares. Varios colores',
    stock: 10,
  },
  {
    id: 2,
    titulo: 'Tacita natural',
    imagen: './assets/tacita.jpg',
    precio: 6000,
    descripcion: 'Tacita de 200ml color natural.',
    stock: 20,
  },
  {
    id: 3,
    titulo: 'Plato corazon',
    imagen: './assets/plato-corazon.jpg',
    precio: 10000,
    descripcion: 'Plato mediano con forma de corazon',
    stock: 10,
  },
  {
    id: 4,
    titulo: 'Cuchara corazon',
    imagen: './assets/cuchara-corazon.jpg',
    precio: 7000,
    descripcion: 'Cuchara con detalle de corazoncito color berenjena',
    stock: 30,
  },
  {
    id: 5,
    titulo: 'Taza personalizada',
    imagen: './assets/taza-michis.jpg',
    precio: 13000,
    descripcion: 'Taza personalizada con tu amigo animal!💘',
    stock: 5,
  },
  {
    id: 6,
    titulo: 'Cazuela',
    imagen: './assets/cazuela.jpg',
    precio: 10000,
    descripcion: 'Cazuela colores varios disponibles, tamaño mediano.',
    stock: 15,
  }
];

// Función para mostrar los productos
function mostrarProductos(){
  for (let i = 0; i < productos.length; i++) {
    alert(`Producto ${i + 1}: ${productos[i].titulo}, ${productos[i].precio}, ${productos[i].descripcion}` );
  }
}

// Función para seleccionar los productos a comprar
function seleccionarProductos(carrito){
  for (let i = 0; i < productos.length; i++) {
    console.log(`Producto ${i + 1}: ${productos[i].nombre}`);
    const respuesta = prompt(`¿Desea comprar el producto ${i + 1}? (s/n)`);
    if (respuesta.toLowerCase() === 's') {

      // Agregar el producto al carrito
      carrito.push(productos[i]);
      
    }
  }
  return carrito
}

// Función para mostrar el carrito
function mostrarCarrito(carrito){
  let totalCarrito = 0
  for (let i = 0; i < carrito.length; i++) {
    alert(`Producto ${i + 1}: ${carrito[i].nombre} - Precio: ${carrito[i].precio}`);
    totalCarrito += productos[i].precio
    alert(`Total monto del carrito por ahora: $${totalCarrito}`)
  }
  return totalCarrito
}

// Funcion para eliminar productos del carrito
function eliminarProductoDelCarrito(carrito) {
  const nuevoCarrito = [];
  for (let i = 0; i < carrito.length; i++) {
    if (i !== indice) {
      nuevoCarrito.push(carrito[i]);
    }
  }
  carrito = nuevoCarrito;
  return carrito
}

// Función main
function main() {
  let carrito = [];
  let totalCarrito = 0;
  let carritoDefinitivo = [];

  inicioSesion();
  mostrarProductos();
  carrito = seleccionarProductos(carrito);
  totalCarrito = mostrarCarrito(carrito);

  let finalizarCompra = false;
  while (!finalizarCompra) {
    const verificarCarrito = prompt('Desea modificar su carrito? (s/n)');
    if (verificarCarrito.toLowerCase() === 's') {
      carritoDefinitivo = eliminarProductoDelCarrito(carrito);
      mostrarCarrito(carritoDefinitivo);
    }

    const finalizar = prompt('Desea finalizar su compra? (s/n)');
    if (finalizar.toLowerCase() === 's') {
      alert('Su compra ha finalizado! Muchas gracias por comprar!');
      finalizarCompra = true;
    } else {
      carrito = seleccionarProductos(carrito);
      totalCarrito = mostrarCarrito(carrito);
    }
  }

}

main()
