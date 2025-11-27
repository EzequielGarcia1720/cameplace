const crearBoton = document.getElementById('create_button');
const cancelarBoton = document.getElementById('cancel_button');

crearBoton.addEventListener('click', function() {
    const datosSubasta = {
        titulo: document.getElementById('titulo_input').value,
        precio: document.getElementById('precio_input').value,
        categoria: document.getElementById('categoria_select').value,
        condicion: document.getElementById('condicion_select').value,
        tipoCanje: document.getElementById('canje_select').value,
        imagen: document.getElementById('imagen_input').value,
        descripcion: document.getElementById('descripcion_textarea').value,
        fechaCreacion: new Date().toISOString()
    }

if (datosSubasta.titulo === '' || datosSubasta.precio === '') {
    // Si el título o precio están vacíos, mostramos un mensaje de error
    alert('Por favor, completa al menos el título y el precio');
    return; // Salimos de la función sin guardar
}

let subastasExistentes = localStorage.getItem('subastas');

if (!subastasExistentes) {
    subastasExistentes = [];
} else {
    subastasExistentes= JSON.parse(subastasExistentes);
}

subastasExistentes.push(datosSubasta);

localStorage.setItem('subastas', JSON.stringify(subastasExistentes));

alert('Subasta creada exitosamente!');
console.log('Subasta guardada', datosSubasta);


// Limpiar formulario

document.getElementById('titulo_input').value = '';
document.getElementById('precio_input').value = '';
document.getElementById('categoria_select').selectedIndex = 0;
document.getElementById('condicion_select').selectedIndex = 0;
document.getElementById('canje_select').selectedIndex = 0;
document.getElementById('imagen_input').value = '';
document.getElementById('descripcion_textarea').value = '';

cancelarBoton.addEventListener('click', function() {
    // Cuando se hace clic en "Cancelar", limpiamos el formulario
    if (confirm('¿Estás seguro de que quieres cancelar? Se perderán los datos no guardados.')) {
        // Limpiar formulario
        document.getElementById('titulo_input').value = '';
        document.getElementById('precio_input').value = '';
        document.getElementById('categoria_select').selectedIndex = 0;
        document.getElementById('condicion_select').selectedIndex = 0;
        document.getElementById('canje_select').selectedIndex = 0;
        document.getElementById('imagen_input').value = '';
        document.getElementById('descripcion_textarea').value = '';
        
        alert('Formulario cancelado');
    }
});
});