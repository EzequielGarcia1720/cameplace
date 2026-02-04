// spawn de botones de login y signin en el navbar

// Obtener el ID de la sesión actual (si existe)
const username = sessionStorage.getItem("username");

const navbarunloged = `            
                <div id="navbar-end" class="navbar-end">
                <!-- Inicio de sesión -->
                <div class="navbar-item">
                    <div class="dropdown is-right">
                    <div class="dropdown-trigger">
                        <button id="loginbtn" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>Iniciar Sesión</span>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            <form id="loginForm" class="p-4">
                                <div class="field">
                                    <label class="label">Email</label>
                                    <div class="control">
                                        <input id="login_email" class="input" type="email" placeholder="tu@email.com" required>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Contraseña</label>
                                    <div class="control">
                                        <input id="login_password" class="input" type="password" placeholder="Contraseña" required>
                                    </div>
                                </div>
                                <div class="field is-grouped">
                                    <div class="control">
                                        <button type="submit" class="button is-primary" formmethod="">Iniciar Sesión</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
                <!-- Registro -->
                <div class="navbar-item">
                    <div class="dropdown is-right">
                        <div class="dropdown-trigger">
                            <button id="signinbtn" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                            <span>Registro</span>
                            </button>
                        </div>
                        <div class="dropdown-menu" id="dropdown-menu-2" role="menu">
                            <div class="dropdown-content">
                                <form id="registerForm" class="p-4">
                                    <div class="field">
                                        <label class="label">Nombre</label>
                                        <div class="control">
                                            <input id="register_firstname" class="input" type="text" placeholder="tu nombre" required>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Apellido</label>
                                        <div class="control">
                                            <input id="register_lastname" class="input" type="text" placeholder="tu apellido" required>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Username</label>
                                        <div class="control">
                                            <input id="register_username" class="input" type="text" placeholder="nombre de usuario" required>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Email</label>
                                        <div class="control">
                                            <input id="register_email" class="input" type="email" placeholder="tu@email.com" required>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Contraseña</label>
                                        <div class="control">
                                            <input id="register_password" class="input" type="password" placeholder="Contraseña" required>
                                        </div>
                                    </div>
                                    <div class="field is-grouped">
                                        <div class="control">
                                            <button type="submit" class="button is-primary is-fullwidth">Registrarse</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

const navbarloged = `
            <!-- Lado derecho -->
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                    <!-- Boton de crear subasta -->
                    <a id="crear_subasta_btn" class="button crear_subasta is-primary" >
                        <strong href="frontend/crear_subasta.html">Crear Subasta</strong>
                    </a>
                    </div>
                </div>

                <div class="navbar-item">
                    <!-- dropdown -->
                    <span class="dropdown is-right is-hoverable">
                        <figure class="mt-1 is-48x48">
                            <img id="foto_perfil_navbar" style="border-radius: 50%;" src="${sessionStorage.getItem('image_url')}" />
                        </figure>
                    
                    <div class="dropdown-trigger">
                        
                        <!-- Imagen -->
                        <span>

                        </span>
                        <span class="icon is-small">
                            
                        </span>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                        <a href="perfil.html" class="dropdown-item">Mi perfil</a>
                        <a href="mis_subastas.html?user_id=${sessionStorage.getItem('sesion_actual')}" class="dropdown-item">Mis Subastas </a>
                        <a href="mis_ofertas.html?user_id=${sessionStorage.getItem('sesion_actual')}" class="dropdown-item">Mis Ofertas</a>
                        <hr class="dropdown-divider" />
                        <a id="cerrar_sesion" class="dropdown-item"> Cerrar Sesión </a>
                        </div>
                    </div>
                    </span>
                </div>
            </div>
        </div>
    </nav>
    `;

function loadNavbar() {
    const navbarend = document.getElementById("navbar-end");
    const sesion_actual = sessionStorage.getItem("sesion_actual");
    
    if (navbarend) {
        if (sesion_actual) {
            // Usuario logueado
            navbarend.innerHTML = navbarloged;
            if (typeof cerrarSesion === 'function') cerrarSesion();
        } else {
            // Usuario no logueado
            navbarend.innerHTML = navbarunloged;
            spawnbtns();
        }
    }
    }


// Esperar a que el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
    loadNavbar();
};

const loginbtn = document.getElementById('loginbtn');
const signinbtn = document.getElementById('signinbtn');

function spawnbtns() {
    const loginbtn = document.getElementById('loginbtn');
    const signinbtn = document.getElementById('signinbtn');
    
    if (loginbtn) {
        const loginDropdown = loginbtn.closest('.dropdown');
        loginbtn.addEventListener('click', () => {
            loginDropdown.classList.toggle('is-active');
            const signinDropdown = signinbtn ? signinbtn.closest('.dropdown') : null;
            if (signinDropdown) {
                signinDropdown.classList.remove('is-active');
            }
        });
    }
    
    if (signinbtn) {
        const signinDropdown = signinbtn.closest('.dropdown');
        signinbtn.addEventListener('click', () => {
            signinDropdown.classList.toggle('is-active');
            const loginDropdown = loginbtn ? loginbtn.closest('.dropdown') : null;
            if (loginDropdown) {
                loginDropdown.classList.remove('is-active');
            }
        });
    }
};