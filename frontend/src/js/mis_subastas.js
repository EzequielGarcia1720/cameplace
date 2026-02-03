let currentFilters = {
    status: '',    // '' significa todos
    search: '',  // Texto del buscador
};

//Barra de busqueda
const find_button = document.querySelector("#buscar_boton")
const searchbar = document.querySelector("#barra_busqueda")

find_button.addEventListener("click", () => {
    search = "http://localhost:3030/api/v1/auctions/search"
    const search_text = searchbar.value;
    if (!search_text || search_text.lenght == 0) {
        alert("No se pueden realizar búsquedas vacías")
        return;
    }
})

// Mis subastas
async function GetAuctions() {

    // Limpiamos el contenedor
    const container = document.getElementById("my_auctions");
    container.innerHTML = ""; 
    
    try {

        // Preparamos los parámetros (Filtros)
        const params = new URLSearchParams();

        if (currentFilters.status) params.append('status', currentFilters.status);
        if (currentFilters.search) params.append('search', currentFilters.search);

        // Construimos la URL (UNA SOLA VEZ)
        const URL = `http://localhost:3030/api/v1/auctions?${params.toString()}`;
        
        // Hacemos el fetch (UNA SOLA VEZ)
        const response = await fetch(URL);

        // Verificamos si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // Parseamos la respuesta JSON
        const auctions = await response.json();

        // Construimos las tarjetas
        auctions.forEach(auction => {
            
            let status_auction = auction.auction_status; 
            let card = "";

            // CASO 1: Subasta con status 1 (Activada)
            if (status_auction === 1) {
                card = `
        
                    <div class="cell card card-full-height">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img
                                    src=${auction.images_urls}
                                    alt="Placeholder image"
                                />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <a href="subasta.html?id=${auction.id}" class="title is-4">${auction.title}</a>
                                    <p class="title is-5">$${auction.initial_price}</p>
                                </div>
                            </div>
                            <div class="content">
                                ${auction.descripcion}
                            </div>
                            <div class="content">
                                Condición: ${auction.auction_condition}
                            </div>
                            <div class="content">
                                Última modificación: ${auction.modification_date.slice(0,10)} a las ${auction.modification_date.slice(11,19)} 
                            </div>
                            <button class="button is-outlined is-stretched">
                                <a href="./seeoffers.html?id=${auction.id}">Ver Ofertas</a>  
                            </button>
                                    
                       
                        </div>
                        <footer class="card-footer">
                            <p class="buttons">
                                <a class="button is-success is-outlined is-small" href="./auction.html?id=${auction.id}">
                                    <span class="icon">
                                        <i class="fas fa-pen-to-square"></i>
                                    </span>
                                    <span>Editar</span> 
                                </a>
                                <button class="button is-dark is-outlined is-small" onclick="PauseAuction(${auction.id})">
                                    <span class="icon">
                                        <i class="fa-solid fa-pause"></i>
                                    </span>
                                    <span>Pausar</span> 
                                </button>
                                <button class="button is-danger is-outlined is-small" onclick="DeleteAuction(${auction.id})">
                                    <span>Eliminar</span>
                                    <span class="icon is-small">
                                        <i class="fas fa-times"></i>
                                    </span>
                                </button>
                            </p>
                        </footer>
                    </div>`;
            }

            // CASO 2: Subasta con status 2 (Pausada)
            if (status_auction === 2) {
                card = `
                        <div class="cell card card-full-height">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img
                                        src=${auction.images_urls}
                                        alt="Placeholder image"
                                    />
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <a href="subasta.html?id=${auction.id}" class="title is-4">${auction.title}</a>
                                        <p class="title is-5">$${auction.initial_price}</p>
                                    </div>
                                </div>
                                <div class="content">
                                    ${auction.descripcion}
                                </div>
                                <div class="content">
                                    Condición: ${auction.auction_condition}
                                </div>
                                <div class="content">
                                    Última modificación: ${auction.modification_date.slice(0,10)} a las ${auction.modification_date.slice(11,19)} 
                                </div>
                                <div class="columns is-vcentered is-center">
                                        <button class="button is-outlined is-stretched">
                                            <a href="./seeoffers.html?id=${auction.id}">Ver Ofertas</a>  
                                        </button>
                                </div>
                            </div>
                            <footer class="card-footer">
                                <p class="buttons">
                                    <a class="button is-success is-outlined is-small" href="./auction.html?id=${auction.id}">
                                        <span class="icon">
                                            <i class="fas fa-pen-to-square"></i>
                                        </span>
                                        <span>Editar</span> 
                                    </a>
                                    <button class="button is-dark is-outlined is-small" onclick="PauseAuction(${auction.id})">
                                        <span class="icon">
                                            <i class="fa-solid fa-play"></i>
                                        </span>
                                        <span>Activar</span> 
                                    </button>
                                    <button class="button is-danger is-outlined is-small" onclick="DeleteAuction(${auction.id})">
                                        <span>Eliminar</span>
                                        <span class="icon is-small">
                                            <i class="fas fa-times"></i>
                                        </span>
                                    </button>
                                </p>
                            </footer>
                        </div>`;
            }

            // CASO 3: Subasta Finalizada (Status 3)
            if (status_auction === 3) {
                card = `
                    <div class="cell card card-full-height">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img
                                    src=${auction.images_urls}
                                    alt="Placeholder image"
                                />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <a href="subasta.html?id=${auction.id}" class="title is-4">${auction.title}</a>
                                    <p class="title is-5">$${auction.initial_price}</p>
                                </div>
                            </div>
                            <div class="content">
                                ${auction.descripcion}
                            </div>
                            <div class="content">
                                Condición: ${auction.auction_condition}
                            </div>
                            <div class="content">
                                Última modificación: ${auction.modification_date.slice(0,10)} a las ${auction.modification_date.slice(11,19)} 
                            </div>
                        </div>
                        <footer class="card-footer">
                            <div class="content">
                                <p class="title is-6">FINALIZADA</p>
                            </div>
                        </footer>
                    </div>`;
            }

            // Si por alguna razón no entra en ningún IF, card estará vacía y no mostrará error
            if (card !== "") {
                let auctionactual = document.createElement("div");
                auctionactual.className = "card post";
                auctionactual.innerHTML = card;
                container.appendChild(auctionactual);
            }
        });

    } catch (error) {
        console.error("Error cargando subastas:", error);
        container.innerHTML = `<div class="notification is-danger">Error al cargar las subastas. Asegúrate de que el backend esté corriendo.</div>`;
    }
}

function FilterByCategory(categoryId) {
    currentFilters.category = categoryId;
    GetAuctions();
}

function FilterByTypeOffer(id, elementoHTML) {
    if (currentFilters.offer_type == id) {
        currentFilters.offer_type = '';
        elementoHTML.checked = false;
    } else {
        currentFilters.offer_type = id;
    }
    GetAuctions();
}

function ApplySearch() {
    const input = document.querySelector('input[placeholder="Buscar entre mis subastas"]'); 
    if (input) {
        currentFilters.search = input.value;
        GetAuctions();
    }
}
function FilterByStatus(estado, elementoHTML) {
    currentFilters.status = estado;
    
    const tabs = document.querySelectorAll('.tabs li');
    tabs.forEach(tab => tab.classList.remove('is-active'));
    
    if (elementoHTML && elementoHTML.parentElement) {
        elementoHTML.parentElement.classList.add('is-active');
    }
    
    GetAuctions();
}
window.DeleteAuction = function (id) {
    const Backend_Auctions = "http://localhost:3030/api/v1/auctions/" + id
    console.log(Backend_Auctions)
    fetch(Backend_Auctions, {method: 'DELETE'}).then(() => GetAuctions())
}



window.PauseAuction = function(id) {
    const Backend_Auctions = "http://localhost:3030/api/v1/auctions/" + id
    fetch(Backend_Auctions).then((response) => {
        return response.json();
    }).then((auction) => {
        let AuctionStatus = auction.auction_status
        if (AuctionStatus == 2) {
            AuctionStatus = 1
        } else {
            AuctionStatus = 2
        }
        const data_auction = {
            title: auction.title,
            initial_price: auction.initial_price,
            category_id: auction.category_id,
            condition: auction.condition,
            offer_type: auction.offer_type,
            images_urls: auction.images_urls,
            descripcion: auction.descripcion,
            auctioneer_id: auction.auctioneer_id,
            auction_status: AuctionStatus,
            location_id: auction.location_id
        }
        fetch(Backend_Auctions, {
        headers: { 'Content-Type': 'application/json' }, 
        method:'PUT',
        body: JSON.stringify(data_auction),
        }).then(response => {
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
                
            }
            return response.json()
        }).then(data => {
            console.log("Success", data)
            window.location.replace("mis_subastas.html")
        }).catch(error => {
            console.error("Error", error)
        })
        
    })

}

window.FinishAuction = async function(id) {
    // 1. Confirmamos la acción con el usuario
    if (!confirm("¿Estás seguro de que quieres finalizar esta subasta? Esta acción no se puede deshacer.")) {
        return;
    }

    const Backend_Auctions = "http://localhost:3030/api/v1/auctions/" + id;

    try {
        // 2. Obtenemos los datos actuales de la subasta
        const response = await fetch(Backend_Auctions);
        if (!response.ok) throw new Error("No se pudo obtener la subasta");
        
        const auction = await response.json();

        // 3. Preparamos los datos para la actualización
        const data_auction = {
            title: auction.title,
            initial_price: auction.initial_price,
            category_id: auction.category_id,
            condition: auction.condition,
            offer_type: auction.offer_type,
            images_urls: auction.images_urls,
            descripcion: auction.descripcion,
            auctioneer_id: auction.auctioneer_id,
            auction_status: 3, 
            location_id: auction.location_id
        };

        // 4. Enviamos la solicitud PUT para actualizar el estado
        const putResponse = await fetch(Backend_Auctions, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(data_auction),
        });

        if (putResponse.ok) {
            
            alert("Subasta finalizada correctamente.");
            GetAuctions(); 
        } else {
            alert("Hubo un error al intentar finalizar la subasta.");
            console.error("Error del servidor:", await putResponse.text());
        }

    } catch (error) {
        console.error("Error crítico:", error);
        alert("Ocurrió un error de conexión.");
    }
}
