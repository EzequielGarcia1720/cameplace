// perfil.js
let valoresOriginales = {};
// Elementos del DOM
const fieldset = document.querySelector('fieldset');
const btnEditar = document.getElementById('perfil_edit_button');
const btnGuardar = document.getElementById('guardar_button');
const btnCancelar = document.getElementById('cancelar_button');
const groupGuardarCancelar = document.getElementById('guardar_cancelar_group');
const btnEditarFotoGroup = document.getElementById("editar_foto_group");
const fotoNavbar = document.getElementById("foto_perfil_navbar");
const btnEditarFoto = document.getElementById("editar_foto_button");
const editarFotoForm = document.getElementById("editar_foto_form");
const fotoUrlInput = document.getElementById("foto_url_input");
const guardarFotoBtn = document.getElementById("guardar_foto_button");

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
    btnEditarFotoGroup.style.display = "block";
}

function modoLectura() {
    fieldset.disabled = true;
    btnEditar.style.display = "block";
    groupGuardarCancelar.style.display = "none";
    btnCancelar.parentElement.style.display = "none";
}
// Editar perfil
btnEditar.addEventListener('click', e => {
    e.preventDefault();
    modoEditar();
});
// Guardar cambios
btnGuardar.addEventListener('click', e => {
    e.preventDefault();
    modoLectura();
});
// Cancelar edición y restaurar valores originales
btnCancelar.addEventListener('click', e => {
    e.preventDefault();
    
    document.getElementById('nombre_input').value = valoresOriginales.nombre;
    document.getElementById('apellido_input').value = valoresOriginales.apellido;
    document.getElementById('usuario_input').value = valoresOriginales.usuario;
    document.getElementById('biografia_textarea').value = valoresOriginales.bio;

    modoLectura();
});

// Mostrar input para cambiar la foto desde una URL
btnEditarFoto.addEventListener("click", () => {
    editarFotoForm.style.display = "block";
});

// Guardar nueva foto de perfil
guardarFotoBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const nuevaUrl = fotoUrlInput.value.trim();

    if (!nuevaUrl || !nuevaUrl.startsWith("http")) {
        alert("Pegá una URL válida.");
        return;
    }

    fotoNavbar.src = nuevaUrl;
    localStorage.setItem("fotoPerfil", nuevaUrl);

    fotoUrlInput.value = "";
    editarFotoForm.style.display = "none";
});


// Cargar fecha de registro guardada
const fechaInput = document.getElementById("fecha_registro");
if (fechaInput) {
    let fechaRegistro = localStorage.getItem("fechaRegistro");

if (!fechaRegistro) {
    const hoy = new Date().toISOString().split("T")[0];
    localStorage.setItem("fechaRegistro", hoy);
    fechaRegistro = hoy;
}

fechaInput.value = fechaRegistro;}

// Cargar foto de perfil guardada
const fotoGuardada = localStorage.getItem("fotoPerfil");

if (fotoGuardada && fotoNavbar) {
    fotoNavbar.onerror = () => {
        console.warn("No se pudo cargar la imagen guardada");
    };

    fotoNavbar.src = fotoGuardada;
}