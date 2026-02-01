// Manejo del formulario de login
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login_email').value;
        const psswd = document.getElementById('login_password').value;

        try {
            const response = await fetch('http://localhost:3030/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, psswd })
            });

            if (response.ok) {
                const data = await response.json();
                const userId = data.user.id;

                // Guardar el ID en sessionStorage
                sessionStorage.setItem('sesion_actual', userId);
                sessionStorage.setItem('username', data.user.username);
                sessionStorage.setItem('image_url', data.user.image_url);
                if (sessionStorage.getItem('image_url') === 'null') {
                    sessionStorage.setItem('image_url', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
                }

                // Limpiar el formulario
                loginForm.reset();

                // Cerrar el dropdown
                const loginDropdown = document.getElementById('dropdown-menu').closest('.dropdown');
                if (loginDropdown) {
                    loginDropdown.classList.remove('is-active');
                }

                // Redirigir o mostrar mensaje de éxito
                // alert('¡Inicio de sesión exitoso!');
                // Aquí puedes redirigir a una página o actualizar el navbar
                window.location.href = 'index.html';
            } else {
                const error = await response.json();
                alert('Error: ' + error.error);
            }
        } catch (error) {
            console.error('Error en el login:', error);
            alert('Error al conectar con el servidor');
        }
    });
}

function initregisterForm() {
    const registerForm = document.getElementById('registerForm');
    
    if (!registerForm) return;

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const register_email = document.getElementById('register_email').value;
        const register_username = document.getElementById('register_username').value;
        const register_password = document.getElementById('register_password').value;

        try {
            const response = await fetch('http://localhost:3030/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    email: register_email, 
                    username: register_username, 
                    psswd: register_password 
                })
            });

            if (response.ok) {
                // Limpiar el formulario
                registerForm.reset();

                // Cerrar el dropdown
                const registerDropdown = document.getElementById('dropdown-menu-2').closest('.dropdown');
                if (registerDropdown) {
                    registerDropdown.classList.remove('is-active');
                }

                // Redirigir o mostrar mensaje de éxito
                alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            } else {
                const error = await response.json();
                alert('Error: ' + error.error);
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            alert('Error al conectar con el servidor'); 
         }
        // Aquí iría la lógica para manejar el registro de usuario

        // Por ahora, solo cerramos el dropdown
        const registerDropdown = document.getElementById('dropdown-menu-2').closest('.dropdown');
        if (registerDropdown) {
            registerDropdown.classList.remove('is-active');
        }
    });
}

function cerrarSesion() {
    const cerrarSesionBtn = document.getElementById('cerrar_sesion');
    if (!cerrarSesionBtn) return;

    cerrarSesionBtn.addEventListener('click', () => {
        sessionStorage.removeItem('sesion_actual');
        sessionStorage.removeItem('username');

        window.location.href = 'index.html';
    });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initLoginForm();
        initregisterForm();
        cerrarSesion();
    });
} else {
    initLoginForm();
    initregisterForm();
    cerrarSesion();
}
