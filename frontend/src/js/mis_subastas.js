
let currentFilters = {
    status: '',    // '' significa todos
    search: '',    // Texto del buscador
    order: 'DESC'  // Orden por defecto
};
//Ordenar por
const button_recently = document.querySelector("#boton_recientes");
const button_older = document.querySelector("#boton_masantiguas");
const button_greater_number_of_offers = document.querySelector("#boton_mayor_cant_ofertas")
const button_fewer_offers = document.querySelector("#boton_menor_cant_ofertas")
const button_higher_price = document.querySelector("#boton_mayor_precio")
const button_lower_price = document.querySelector("#boton_menor_precio")

const ordenar_por = (boton1, boton2) => {
    boton1.classList.toggle('activo');
    boton2.classList.remove('activo');
}   

button_recently.addEventListener("click", () => {
    ordenar_por(button_recently, button_older);
});

button_older.addEventListener("click", () => {
    ordenar_por(button_older,button_recently)
})

button_greater_number_of_offers.addEventListener("click", () => {
    ordenar_por(button_greater_number_of_offers, button_fewer_offers);
});

button_fewer_offers.addEventListener("click", () => {
    ordenar_por(button_fewer_offers, button_greater_number_of_offers);
});

button_higher_price.addEventListener("click", () => {
    ordenar_por(button_higher_price, button_lower_price);
});

button_lower_price.addEventListener("click", () => {
    ordenar_por(button_lower_price, button_higher_price);
});
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

    const container = document.getElementById("my_auctions");
    container.innerHTML = ""; 


    try {

            // --- CONSTRUCCIÓN DE URL DINÁMICA ---
        const params = new URLSearchParams();
        
        if (currentFilters.status) params.append('status', currentFilters.status);
        // Agregamos parámetros solo si tienen valor
        const URL = `http://localhost:3030/api/v1/auctions?${params.toString()}`
        const response = await fetch(URL)

        // Verificamos si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // Parseamos la respuesta JSON
        const auctions = await response.json();

        // Construimos las tarjetas de subastas
        auctions.forEach(auction => {
            let finish_auction = auction.auction_status

            let card = `
                <div class="cell card">
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
                                <p class="title is-4">${auction.title}</p>
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
                        <div class="columns is-vcentered">
                                <div class="column">
                                    <button class="button is-outlined">
                                        <a href="./seeoffers.html?id=${auction.id}">Ver Ofertas</a>  
                                    </button>
                                </div>
                                <div class="column is-narrow">
                                    <button class="button is-outlined" onclick="FinishAuction(${auction.id})">
                                        <a>Finalizar</a>  
                                    </button>
                                </div>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <p class="buttons">
                            <a class="button is-success is-outlined" href="./auction.html?id=${auction.id}">
                                <span class="icon">
                                    <i class="fas fa-pen-to-square"></i>
                                </span>
                                <span>Editar</span> 
                            </a>
                            <button class="button is-dark is-outlined" onclick="PauseAuction(${auction.id})">
                                <span class="icon">
                                    <i class="fa-solid fa-pause"></i>
                                </span>
                                <span>${auction.status_name}</span> 
                            </button>
                            <button class="button is-danger is-outlined" onclick="DeleteAuction(${auction.id})">
                                <span>Eliminar</span>
                                <span class="icon is-small">
                                    <i class="fas fa-times"></i>
                                </span>
                            </button>
                        </p>
                    </footer>
                </div>`
            if (finish_auction === 2) {
                card = `
                    <div class="cell card">
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
                                <p class="title is-4">${auction.title}</p>
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
                            FINALIZADA
                        </div>
                    </footer>
                </div>
                `
            }
            let auctions_container = document.getElementById("my_auctions")
            let auctionactual = document.createElement("div")
            auctionactual.classname = "card post"
            auctionactual.innerHTML = card
            auctions_container.appendChild(auctionactual)
        });
    } catch (error) {
        console.error("Error cargando subastas:", error);
        container.innerHTML = `<div class="notification is-danger">Error al cargar las subastas. Asegúrate de que el backend esté corriendo.</div>`;
    }
}

// Llamada inicial para cargar los datos al entrar
GetAuctions();

function FilterByStatus(estado, elementoHTML) {
    currentFilters.status = estado;
    
    // Actualizar visualmente la clase is-active en los tabs
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
        if (AuctionStatus == 1) {
            AuctionStatus = 0
        } else {
            AuctionStatus = 1
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
    // 1. Confirmación (Si cancela, cortamos la ejecución aquí)
    if (!confirm("¿Estás seguro de que quieres finalizar esta subasta? Esta acción no se puede deshacer.")) {
        return;
    }

    const Backend_Auctions = "http://localhost:3030/api/v1/auctions/" + id;

    try {
        // 2. Traemos la subasta actual para no perder sus datos (título, precio, etc.)
        const response = await fetch(Backend_Auctions);
        if (!response.ok) throw new Error("No se pudo obtener la subasta");
        
        const auction = await response.json();

        // 3. Preparamos el objeto con el ESTADO FORZADO A 2 (Finalizada)
        const data_auction = {
            title: auction.title,
            initial_price: auction.initial_price,
            category_id: auction.category_id,
            condition: auction.condition,
            offer_type: auction.offer_type,
            images_urls: auction.images_urls,
            descripcion: auction.descripcion,
            auctioneer_id: auction.auctioneer_id,
            auction_status: 2, // <--- Aquí forzamos el 2 (Finalizada)
            location_id: auction.location_id
        };

        // 4. Enviamos la actualización al Backend
        const putResponse = await fetch(Backend_Auctions, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(data_auction),
        });

        if (putResponse.ok) {
            // 5. ¡Éxito! Refrescamos la lista visualmente
            alert("Subasta finalizada correctamente.");
            GetAuctions(); // Volvemos a pintar las cartas con el estado nuevo
        } else {
            alert("Hubo un error al intentar finalizar la subasta.");
            console.error("Error del servidor:", await putResponse.text());
        }

    } catch (error) {
        console.error("Error crítico:", error);
        alert("Ocurrió un error de conexión.");
    }
}
