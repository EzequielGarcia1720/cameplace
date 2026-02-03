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
            
            console.log("Oferta ID:", offer.id);
            console.log("Raw images_urls:", offer.images_urls);
            console.log("Tipo de dato:", typeof offer.images_urls);
            // LÓGICA DE FORMATO DE FECHA
            const fecha = new Date(offer.creation_date).toLocaleDateString('es-AR', {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            // Generamos la columna de imagen solo si hay imágenes disponibles
            let htmlColumnaImagen = "";

            let urlLimpia = "";

            if (offer.images_urls) {
                if (Array.isArray(offer.images_urls)) {
                    urlLimpia = offer.images_urls[0] || ""; 
                } else {
                    urlLimpia = String(offer.images_urls).replace(/[\{}[\]"']/g, "").trim();
                }
            }
            if (urlLimpia.length > 5 && urlLimpia !== "null" && urlLimpia !== "undefined") {
                
                htmlColumnaImagen = `
                <div class="column is-narrow">
                    <figure class="image is-96x96">
                        <img src="${urlLimpia}" alt="Producto" style="object-fit: cover; height: 100%;">
                    </figure>
                </div>`;
            }

            let htmlButtons = '';
            if (offer.estado == 'Activa') {
                htmlButtons += `
                <button
                    class="boton-reofertar button is-light is-small"
                    onclick="openOfferModal(${offer.auction_id})">
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
                    `;
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
                        ${htmlButtons}
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

// --- FUNCIONES DE FILTRADO ---

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
// --- FUNCIÓN DE ELIMINAR OFERTA ---
window.DeleteOffer = function (id) {
    const Backend_Offers = "http://localhost:3030/api/v1/offers/" + id
    console.log(Backend_Offers) 
    fetch(Backend_Offers, {method: 'DELETE'}).then(() => GetOffers())
}
// --- FUNCIONES MODAL REOFERTAR ---
let currentAuctionId = null;

function openOfferModal(auction_id) {
    currentAuctionId = auction_id;

    document.getElementById("offer_amount").value = "";
    document.getElementById("offer_description").value = "";
    document.getElementById("offer_image").value = "";

    const offerTypeSelect = document.getElementById("offer_type");
    offerTypeSelect.value = "2";

    offerTypeSelect.dispatchEvent(new Event("change"));
    
    document.getElementById("offerModal").classList.add("is-active");
}



function closeOfferModal() {
    document.getElementById("offerModal").classList.remove("is-active");
}

// --- MANEJO DEL TIPO DE OFERTA ---
const offerTypeSelect = document.getElementById("offer_type");
const mountField = document.getElementById("mount_field");

const imageInput = document.getElementById("offer_image");
const imageField = imageInput.closest(".field");

const descriptionInput = document.getElementById("offer_description");
const descriptionField = descriptionInput.closest(".field");

if (offerTypeSelect) {
    offerTypeSelect.addEventListener("change", () => {
        const type = offerTypeSelect.value;

        // --- MONTO ---
        if (type === "1") {
            mountField.style.display = "none";
            document.getElementById("offer_amount").value = "";
        } else {
            mountField.style.display = "block";
        }

        // --- IMAGEN + DESCRIPCIÓN ---
        if (type === "1" || type === "3") {
            imageField.style.display = "block";
            descriptionField.style.display = "block";
        } else {
            imageField.style.display = "none";
            descriptionField.style.display = "none";

            imageInput.value = "";
            descriptionInput.value = "";
        }
    });
}



// --- FUNCION ENVIAR REOFERTA ---
async function submitOffer() {
    const offer_type = document.getElementById("offer_type").value;
    const mount = document.getElementById("offer_amount").value;
    const descripcion = document.getElementById("offer_description").value;
    const imageUrl = document.getElementById("offer_image").value;
    const title = document.getElementById("offer_title").value;

    // Validaciones
    if (!title) {
        alert("El titulo es obligatorio");
        return;
    }

    if ((offer_type == "1" || offer_type == "3") && !descripcion) {
        alert("La descripción es obligatoria");
        return;
    }

    if ((offer_type === "2" || offer_type === "3") && !mount) {
        alert("Ingresá un monto");
        return;
    }

    // if ((offer_type === "1" || offer_type === "3") && !imageUrl) {
    // alert("La URL de la imagen es obligatoria para producto o mixta");
    // return;
    // }



    const data = {
        offer_type: Number(offer_type),
        title,
        descripcion,
        images_urls: imageUrl ? [imageUrl] : [],
        mount: offer_type === "1" ? 0 : Number(mount),
        auctioneer_id: 1,
        bidder_id: 2,       
        auction_id: currentAuctionId
    };
    
    await fetch("http://localhost:3030/api/v1/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    closeOfferModal();
    GetOffers();
}

// Cerrar modal y recargar ofertas
closeOfferModal();
GetOffers();




