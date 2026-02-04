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
<<<<<<< HEAD
                <div class="navbar-item">
                    <div class="buttons">
                    <!-- Boton de crear subasta -->
                    <a class="button crear_subasta is-primary" id="button_create_auction">
                        <strong onclick="OpenCreateAuction()">Crear Subasta</strong>
                    </a>
                    </div>
=======
                <div id="navbar-item-crear-subasta" class="navbar-item">
>>>>>>> a9c6a299b0cbb174f02a1105fb124ba873667baa
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
    <div id="CreateAuctionModal" class="modal"></div>
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

function OpenCreateAuction() {
    const modal = document.getElementById("CreateAuctionModal");
    
    const create_auction = `
        <div class="modal-background" onclick="CloseCreateAuctionModal()"></div>

        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title is-center" style="color: darkolivegreen">Crear subasta</p>
                <button class="delete" aria-label="close" onclick="CloseCreateAuctionModal()"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">Título</label>
                    <div class="control">
                        <input class="input" type="text" id="auction_title" placeholder="Escriba el título de la subasta">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Precio Inicial</label>
                    <div class="control">
                        <input class="input" type="number" id="auction_initial_price" placeholder="Ingrese el precio inicial" min="0" step="0.01">
                    </div>
                </div>
                    
                <div class="field">
                    <label class="label">Categoría</label>
                    <div class="control">
                        <div class="select">
                            <select id="select_categories">
                                <option value="" disabled selected>Selecciona una Categoría</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Condición</label>
                    <div class="control">
                        <div class="select">
                            <select id="select_conditions">
                                <option value="" disabled selected>Selecciona una Condición</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Tipo de canje</label>
                    <div class="control">
                        <div class="select">
                            <select id="select_offers_type">
                                <option value="" disabled selected>Selecciona un Tipo de canje</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Imagen</label>
                    <div class="control">
                        <input class="input" type="link" id="auction_image" placeholder="Ingrese el link de la imagen">
                    </div>
                </div>
                
                <div class="field">
                    <label class="label">Descripción</label>
                    <div class="control">
                        <textarea class="textarea" id="auction_description" placeholder="Ingrese una descripción"></textarea>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="control">
                    <button class="button is-primary" onclick="CreateAuction()">Crear subasta</button>
                </div>
                <div class="control">
                    <a class="button is-primary" onclick="CloseCreateAuctionModal()">Cancelar</a>
                </div>
            </footer>
        </div>`
        // Appendeo el formulario de edición al contenedor
        modal.innerHTML = create_auction;

        modal.classList.add("is-active");

        // Relleno cada dropdown con su respectivo contenido
        const backend_categories = "http://localhost:3030/api/v1/categories"
        fetch(backend_categories).then((response) => {
            return response.json()
        }).then((categories) => {
            const dropdown_categories = document.getElementById("select_categories")
            categories.forEach(category => {
                const NewCategory = document.createElement("option")
                NewCategory.value = category.id
                NewCategory.innerText = category.name_category

                dropdown_categories.appendChild(NewCategory)
            });
            
        })

        const backend_offers_type = "http://localhost:3030/api/v1/offers_type"
        fetch(backend_offers_type).then((response) => {
            return response.json()
        }).then((offers_type) => {
            const dropdown_offers_type = document.getElementById("select_offers_type")
            offers_type.forEach(offer_type => {
                const NewOfferType = document.createElement("option")
                NewOfferType.value = offer_type.id
                NewOfferType.innerText = offer_type.type
                
                dropdown_offers_type.appendChild(NewOfferType)
            });
        })

        const backend_conditions = "http://localhost:3030/api/v1/conditions"
        fetch(backend_conditions).then((response) => {
            return response.json()
        }).then((conditions) => {
            const dropdown_conditions = document.getElementById("select_conditions")
            conditions.forEach(condition => {
                const NewCondition = document.createElement("option")
                NewCondition.value = condition.id
                NewCondition.innerText = condition.auction_condition
                
                dropdown_conditions.appendChild(NewCondition)
            });
        })
        
    window.CreateAuction = function() {
        data_auction = {
            title: document.getElementById("auction_title").value,
            descripcion: document.getElementById("auction_description").value,
            initial_price: document.getElementById("auction_initial_price").value,
            category_id: document.getElementById("select_categories").value,
            condition: document.getElementById("select_conditions").value,
            images_urls: document.getElementById("auction_image").value,
            auctioneer_id: sessionStorage.getItem("sesion_actual"),
            offer_type: document.getElementById("select_offers_type").value,
            auction_status: 1,
            location_id: 1
        }

        if (data_auction.title.length === 0 || data_auction.initial_price <= 0 || data_auction.images_urls.length === 0 || data_auction.descripcion.length === 0 || data_auction.category_id.length === 0 || data_auction.condition.length === 0 || data_auction.offer_type.length === 0) {
            alert("Todos los campos son obligatorios y el precio inicial debe ser mayor a 0")
        } else {
            fetch("http://localhost:3030/api/v1/auctions", {
            headers: { 'Content-Type': 'application/json' }, 
            method: 'POST',
            body: JSON.stringify(data_auction),
            }).then(response => {
                if(!response.ok) {
                    console.log(auctioneer_id)
                    throw new Error(`HTTP error! status: ${response.status}`)
                
                }
                return response.json()
            }).then(data => {
                console.log("Success", data)
                window.location.replace("index.html")
            }).catch(error => {
                console.error("Error", error)
            })
        }
    }
 


}

function CloseCreateAuctionModal() { 
    document.getElementById("CreateAuctionModal").classList.remove("is-active");     
}
