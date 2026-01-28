// --- VARIABLES GLOBALES DE FILTRADO ---
let currentFilters = {
    status: '',    // '' significa todos
    search: '',    // Texto del buscador
    order: 'DESC'  // Orden por defecto
};

// --- CONFIGURACIÓN DE BOTONES ---
// Referencias a los botones
const button_recently = document.getElementById("boton_recientes");
const button_older = document.getElementById("boton_masantiguas");

// Función para cambiar el orden y la clase activa
const ChangeOrder = (botonActivo, botonInactivo) => {
    botonActivo.classList.add('asset');
    botonInactivo.classList.remove('asset');
}

// Evento click: Mas Recientes
if (button_recently) {
    button_recently.addEventListener("click", () => {
        ChangeOrder(button_recently, button_older);
        currentFilters.order = 'DESC';
        GetOffers(); // Llama a la función, pero ya no duplica eventos
    });
}

// Evento click: Mas Antiguas
if (button_older) {
    button_older.addEventListener("click", () => {
        ChangeOrder(button_older, button_recently);
        currentFilters.order = 'ASC';
        GetOffers(); // Llama a la función, pero ya no duplica eventos
    });
}


// --- FUNCIÓN PRINCIPAL (SOLO CARGA DATOS) ---
async function GetOffers() {
    // Referencia al contenedor de ofertas
    const container = document.getElementById("my_offers");
    container.innerHTML = ""; 
    
    try {
        // --- CONSTRUCCIÓN DE URL DINÁMICA ---
        const params = new URLSearchParams();
        
        // Agregamos parámetros solo si tienen valor
        if (currentFilters.status) params.append('status', currentFilters.status);
        if (currentFilters.search) params.append('search', currentFilters.search);
        if (currentFilters.order) params.append('order', currentFilters.order);

        const URL = `http://localhost:3030/api/v1/offers?${params.toString()}`;
        
        const response = await fetch(URL);
        // Verificamos si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        // Parseamos la respuesta JSON
        const offers = await response.json();

        // Recorremos las ofertas y generamos el HTML correspondiente
        offers.forEach(offer => {
            
            // LÓGICA DE FORMATO DE FECHA
            const fecha = new Date(offer.creation_date).toLocaleDateString('es-AR', {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            // Generamos la columna de imagen solo si hay imágenes disponibles
            let htmlColumnaImagen = "";
            
            // Solo si hay imágenes en el array, llenamos la variable con el HTML
            if (offer.images_urls && offer.images_urls.length > 0) {
                htmlColumnaImagen = `
                <div class="column is-narrow">
                    <figure class="image is-96x96">
                        <img class="is-rounded" src="${offer.images_urls[0]}" alt="Producto" style="object-fit: cover; height: 100%;">
                    </figure>
                </div>`;
            }

            // Generamos los tags de Dinero/Producto según corresponda
            let tagsHtml = '';
            
            // --- LÓGICA PARA LOS TAGS ---
            if (offer.mount > 0) {
                tagsHtml += `
                    <span class="tag is-success">
                        <span class="icon"><i class="fas fa-dollar-sign"></i></span>
                        <span>$${offer.mount}</span>
                    </span>`;
            }

            // --- Si es tipo Producto o Mixto ---
            if (offer.offer_type === 1 || offer.offer_type === 3) {
                tagsHtml += `
                    <span class="tag is-warning">
                        <span class="icon"><i class="fas fa-box-open"></i></span>
                        <span>Producto</span>
                    </span>`;
            }

            // Generamos el HTML completo de la oferta
            const offer_html = `
            <article class="message is-link">
                <div class="message-header" style="align-items: center;">
                    <span class="tag is-link is-light mr-2">${fecha}</span>

                    <h3 style="flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-right: 10px;">
                        <a href="./mis_ofertas.html?id=${offer.auction_id}" style="color: inherit; text-decoration: none;">
                            ${offer.title}
                        </a>
                    </h3>
                    
                    <div style="display: flex; gap: 5px;">
                        <button onclick="ReofferOffer('${offer.id}')" class="boton-reofertar button is-light is-small">
                            <span class="icon">
                                <i class="fas fa-pen-to-square"></i>
                            </span>
                            <span>Mejorar</span> 
                        </button>
                        <button onclick="DeleteOffer('${offer.id}')" class="boton-cancelar button is-light is-small">
                            <span>Cancelar</span>
                            <span class="icon is-small">
                                <i class="fas fa-times"></i>
                            </span>
                        </button>
                    </div>
                </div>

                <div class="message-body">
                    <div class="columns is-vcentered">
                        
                        ${htmlColumnaImagen}

                        <div class="column">
                            <div class="tags mb-2">
                                ${tagsHtml}
                                
                                <span class="tag is-light is-capitalized">
                                    ${offer.estado}
                                </span>
                            </div>

                            <p class="is-size-6">
                                ${offer.descripcion}
                            </p>
                        </div>

                    </div>
                </div>    
            </article>
            `;

            let auctionElement = document.createElement("div");
            auctionElement.className = "card post mb-4"; 
            auctionElement.innerHTML = offer_html;
            container.appendChild(auctionElement);
        });

    } catch (error) {
        console.error("Error cargando ofertas:", error);
        container.innerHTML = `<div class="notification is-danger">Error al cargar las ofertas. Asegúrate de que el backend esté corriendo.</div>`;
    }
}

// Llamada inicial para cargar los datos al entrar
GetOffers();

// --- FUNCIONES DE FILTRADO (Tus otras funciones) ---

function ApplySearch() {
    const input = document.querySelector('input[placeholder="Buscar entre mis ofertas"]'); 
    if (input) {
        currentFilters.search = input.value;
        GetOffers();
    }
}

function FilterByStatus(estado, elementoHTML) {
    currentFilters.status = estado;
    
    // Actualizar visualmente la clase is-active en los tabs
    const tabs = document.querySelectorAll('.tabs li');
    tabs.forEach(tab => tab.classList.remove('is-active'));
    
    if (elementoHTML && elementoHTML.parentElement) {
        elementoHTML.parentElement.classList.add('is-active');
    }
    
    GetOffers();
}

window.DeleteOffer = function (id) {
    const Backend_Offers = "http://localhost:3030/api/v1/offers/" + id
    console.log(Backend_Offers)
    fetch(Backend_Offers, {method: 'DELETE'}).then(() => GetOffers())
}