    // perfil.js
    let valoresOriginales = {};
    // Elementos del DOM

    const API_URL = "http://localhost:3030/api/v1/users";
    const USER_ID = sessionStorage.getItem("sesion_actual");
    const fieldset = document.querySelector('fieldset');
    const btnEditar = document.getElementById('perfil_edit_button');
    const btnGuardar = document.getElementById('guardar_button');
    const btnCancelar = document.getElementById('cancelar_button');
    const btnEliminarPerfil = document.getElementById("eliminar_perfil_button");
    const groupGuardarCancelar = document.getElementById('guardar_cancelar_group');
    const editarFotoForm = document.getElementById("editar_foto_form");
    const fotoUrlInput = document.getElementById("foto_url_input");


    function modoEditar() {

        valoresOriginales = {
            nombre: document.getElementById('nombre_input').value,
            apellido: document.getElementById('apellido_input').value,
            usuario: document.getElementById('usuario_input').value,
            bio: document.getElementById('biografia_textarea').value,
            image_url: document.getElementById('foto_url_input').value,
            tel: document.getElementById('telefono_input').value
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
    // Editar perfil
    btnEditar.addEventListener('click', e => {
        e.preventDefault();
        modoEditar();
    });
    // Guardar cambios
btnGuardar.addEventListener('click', async (e) => {
    e.preventDefault();

    const data = {
        username: document.getElementById('usuario_input').value,
        firstname: document.getElementById('nombre_input').value,
        lastname: document.getElementById('apellido_input').value,
        biography: document.getElementById('biografia_textarea').value,
        image_url: document.getElementById('foto_url_input').value,
        tel: document.getElementById('telefono_input').value
    };

    try {
        const res = await fetch(`${API_URL}/${USER_ID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        // console.log("Respuesta del servidor:", res);
        if (!res.ok) throw new Error('Error al actualizar usuario:(');
        
        const updatedUser = await res.json();
        // console.log('Se actualizó el usuario:)', updatedUser);
        
        // Actualizar sessionStorage
        if (updatedUser.image_url) {
            sessionStorage.setItem("image_url", updatedUser.image_url);
        }
        
        modoLectura();
        
        // Recargar la página para ver los cambios
        window.location.href = 'perfil.html';
    } catch(err) {
        console.error(err);
    }
});

    //-----------------------------------------------------------------------------

    // Cancelar edición y restaurar valores originales
    btnCancelar.addEventListener('click', e => {
        e.preventDefault();
        
        document.getElementById('nombre_input').value = valoresOriginales.nombre;
        document.getElementById('apellido_input').value = valoresOriginales.apellido;
        document.getElementById('usuario_input').value = valoresOriginales.usuario;
        document.getElementById('biografia_textarea').value = valoresOriginales.bio;
        document.getElementById('foto_url_input').value = valoresOriginales.image_url;
        document.getElementById('telefono_input').value = valoresOriginales.tel;

        modoLectura();
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

    // Cargar datos del perfil desde la API
    async function cargarPerfil() {
        try {
            const res = await fetch(`${API_URL}/${USER_ID}`);
            if (!res.ok) throw new Error("No se pudo cargar el usuario");

            const user = await res.json();

            document.getElementById("nombre_input").value = user.firstname ?? "";
            document.getElementById("apellido_input").value = user.lastname ?? "";
            document.getElementById("usuario_input").value = user.username ?? "";
            document.getElementById("biografia_textarea").value = user.biography ?? "";
            document.getElementById("foto_url_input").value = user.image_url ?? "";
            document.getElementById("perfil_img").src = user.image_url
            document.getElementById("telefono_input").value = user.tel ?? "";
            if(user.image_url === null || user.image_url === '') {
                document.getElementById("perfil_img").src = sessionStorage.getItem('image_url');
            }
        } catch (err) {
            console.error(err);
            alert("Error cargando perfil");
        }
    }

    btnEliminarPerfil.addEventListener("click", async () => {
    const confirmacion = confirm(
        "¿Estás seguro de que querés eliminar tu perfil?\nEsta acción no se puede deshacer."
    );

    if (!confirmacion) return;

    try {
        const res = await fetch(`${API_URL}/${USER_ID}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            throw new Error("No se pudo eliminar el perfil");
        }

        // Limpia sessionStorage
        sessionStorage.clear();

        alert("Perfil eliminado correctamente");

        // Redirige al index
        window.location.href = "index.html";

    } catch (error) {
        console.error(error);
        alert("No se pudo eliminar el perfil");
    }
});


    cargarPerfil(); 

