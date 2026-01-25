    // perfil.js
    let valoresOriginales = {};
    // Elementos del DOM

    const API_URL = "http://localhost:3030/api/v1/users";
    const USER_ID = 2;
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
    btnGuardar.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const data = {
        username: document.getElementById('usuario_input').value,
        firstname: document.getElementById('nombre_input').value,
        lastname: document.getElementById('apellido_input').value,
        biography: document.getElementById('biografia_textarea').value
    };

    try {
        const res = await fetch(`${API_URL}/${USER_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error('Error al actualizar usuario:(');
        
        const updatedUser = await res.json();
        console.log('Se actualizo el usuario:)', updatedUser);
        modoLectura();
    } catch(err) {
        console.error(err);
    }
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
    guardarFotoBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const nuevaUrl = fotoUrlInput.value.trim();

        if (!nuevaUrl || !nuevaUrl.startsWith("http")) {
            alert("Pega una URL válida.");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/${USER_ID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image_url: nuevaUrl })
            });

            if (!res.ok) throw new Error("No se pudo guardar la foto");

            const userActualizado = await res.json();

            fotoNavbar.src = userActualizado.image_url;
            localStorage.setItem("fotoPerfil", userActualizado.image_url);

            fotoUrlInput.value = "";
            editarFotoForm.style.display = "none";
        } catch (err) {
            console.error(err);
            alert("No se pudo guardar la foto");
        }
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
            if (user.image_url) {
                fotoNavbar.src = user.image_url;
                localStorage.setItem("fotoPerfil", user.image_url);
                } else {
        const fotoGuardada = localStorage.getItem("fotoPerfil");
        if (fotoGuardada) fotoNavbar.src = fotoGuardada;
            }

        } catch (err) {
            console.error(err);
            alert("Error cargando perfil");
        }
    }

    cargarPerfil(); 