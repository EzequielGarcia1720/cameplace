// perfil.js
let valoresOriginales = {};

const fieldset = document.querySelector('fieldset');
const btnEditar = document.getElementById('perfil_edit_button');
const btnGuardar = document.getElementById('guardar_button');
const btnCancelar = document.getElementById('cancelar_button');
const groupGuardarCancelar = document.getElementById('guardar_cancelar_group');

function modoEditar() {

    valoresOriginales = {
        nombre: document.getElementById('nombre_input').value,
        apellido: document.getElementById('apellido_input').value,
        usuario: document.getElementById('usuario_input').value,
        bio: document.getElementById('biografia_textarea').value
        };

    fieldset.disabled = false;
    btnEditar.style.display = "none";
    groupGuardarCancelar.style.display = "block";
    btnCancelar.parentElement.style.display = "block";
}

function modoLectura() {
    fieldset.disabled = true;
    btnEditar.style.display = "block";
    groupGuardarCancelar.style.display = "none";
    btnCancelar.parentElement.style.display = "none";
}

btnEditar.addEventListener('click', e => {
    e.preventDefault();
    modoEditar();
});

btnGuardar.addEventListener('click', e => {
    e.preventDefault();
    modoLectura();
});

btnCancelar.addEventListener('click', e => {
    e.preventDefault();
    
    document.getElementById('nombre_input').value = valoresOriginales.nombre;
    document.getElementById('apellido_input').value = valoresOriginales.apellido;
    document.getElementById('usuario_input').value = valoresOriginales.usuario;
    document.getElementById('biografia_textarea').value = valoresOriginales.bio;

    modoLectura();
});
