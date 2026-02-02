// Estado actual de los filtros
let currentFilters = {
    sort: 'recientes',  // Orden por defecto
    category: [],  // Categoría seleccionada
    type_offer: '',  // Tipo de oferta seleccionado
    search: ''  // Tipo de oferta seleccionado  
};

// // Selección de botones de ordenamiento
// const button_recently = document.querySelector("#boton_recientes");
// const button_older = document.querySelector("#boton_masantiguas");
// const button_greater_number_of_offers = document.querySelector("#boton_mayor_cant_ofertas")
// const button_fewer_offers = document.querySelector("#boton_menor_cant_ofertas")

// const ordenar_por = (botonActivo, botonInactivo, tipoOrden) => {
//     if(botonActivo) botonActivo.classList.add('activo'); // Usamos add para asegurar que quede marcado
//     if(botonInactivo) botonInactivo.classList.remove('activo');

//     currentFilters.sort = tipoOrden;
//     console.log("Ordenando por:", currentFilters.sort); 
// } 

// if(button_recently) {
//     button_recently.addEventListener("click", () => ordenar_por(button_recently, button_older, 'recientes'));
//     button_older.addEventListener("click", () => ordenar_por(button_older, button_recently, 'antiguas'));
    
//     button_greater_number_of_offers.addEventListener("click", () => ordenar_por(button_greater_number_of_offers, button_fewer_offers, 'mayor_ofertas'));
//     button_fewer_offers.addEventListener("click", () => ordenar_por(button_fewer_offers, button_greater_number_of_offers, 'menor_ofertas'));
    
//     if(typeof button_higher_price !== 'undefined') {
//         button_higher_price.addEventListener("click", () => ordenar_por(button_higher_price, button_lower_price, 'mayor_precio'));
//         button_lower_price.addEventListener("click", () => ordenar_por(button_lower_price, button_higher_price, 'menor_precio'));
//     }
// }


// GET a todas las subastas
async function GetAuctions() {

    console.log("EJECUTANDO GET AUCTIONS");
    const auctions_container = document.getElementById("auctions");
    if (!auctions_container) return;

    auctions_container.innerHTML = "";

    try {

        const queryParams = new URLSearchParams();

        // Agregamos los filtros actuales a los parámetros de consulta
        if (currentFilters.order) queryParams.append('order', currentFilters.order);       
        if (currentFilters.type_offer) queryParams.append('type_offer', currentFilters.type_offer);
        if (currentFilters.search) queryParams.append('search', currentFilters.search);
        if (currentFilters.sort) queryParams.append('sort', currentFilters.sort);

        currentFilters.category.forEach(catId => {
            queryParams.append('category', catId);
        });


        // Construimos la URL con los parámetros de consulta
        const URL = "http://localhost:3030/api/v1/auctions?" + queryParams.toString()

        // Realizamos la solicitud fetch
        const response = await fetch(URL)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parseamos la respuesta JSON
        const auctions = await response.json();

        if (auctions.length === 0) {
            auctions_container.innerHTML = 
                `<div class="notification is-warning">No se encontraron subastas que coincidan con los filtros aplicados.</div>`;
            return;
        }


        auctions.forEach(auction => {
            const userImageUrl = auction.image_url || 'https://bulma.io/images/placeholders/48x48.png';

            const card = `
                <div class="cell card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img 
                            src="${auction.images_urls}" 
                            alt="placeholder image"
                            />
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img src="${userImageUrl}" alt="User image"/>
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-5">${auction.title}</p>
                                <p class="title is-6">$${auction.initial_price}</p>
                            </div>
                        </div>

                        <div class="content">
                            ${auction.descripcion}
                            <br>
                            <p style="font-weight: bold; color: black"> Última Modificación: ${auction.modification_date.slice(0,10)} </p>
                        </div>
                    </div>
                </div>
            `;

            let auctionactual = document.createElement("div");
            auctionactual.className = "card post";
            // let auctions_container = document.getElementById("auctions");
            auctionactual.innerHTML = card;
            auctions_container.appendChild(auctionactual);
        });
    } catch (error) {
        console.error("Error fetching auctions:", error);
        if (auctions_container){
            auctions_container.innerHTML = '<div class="notification is-danger">Error al cargar las subastas</div>';

        }
        // document.getElementById("auctions").innerHTML = 
        //     `<div class="notification is-danger">Error al cargar las subastas</div>`;
    }

}
function ApplySearch() {
    const input = document.querySelector('#search_input'); 
    if (input) {
        currentFilters.search = input.value;
        console.log("Search applied:", currentFilters.search);
        GetAuctions();
    } else {
        console.error("Search input element not found.");
    }
}

function FilterByCategory(id, elementoHTML) {
    const categoryId = parseInt(id);

    if (elementoHTML.checked) {
        if (!currentFilters.category.includes(categoryId)) {
            currentFilters.category.push(categoryId);
        }
    } else {
        currentFilters.category = currentFilters.category.filter(catId => catId !== categoryId);
    }
    console.log("Categorías filtradas:", currentFilters.category);
    GetAuctions()
}

function FilterByTypeOffer(typeOfferId) {
    if (currentFilters.type_offer === typeOfferId) {
        currentFilters.type_offer = '';
        elementoHTML.checked = false;
    } else {
        currentFilters.type_offer = typeOfferId;
    }
    GetAuctions();
}

// Event listener para buscar al presionar Enter
const inputBusqueda = document.getElementById('search_input');

if (inputBusqueda) {
    inputBusqueda.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita que se recargue la página si está dentro de un form
            ApplySearch(); // Llama a tu función de búsqueda
        }
    });
}




document.addEventListener("DOMContentLoaded", () => {
    
    
    const aplicarOrden = (boton, tipoOrden) => {
        
        document.querySelectorAll('.menu-list a').forEach(a => a.style.fontWeight = 'normal');
        if(boton) boton.style.fontWeight = 'bold';

        currentFilters.sort = tipoOrden;
        console.log("Cambiando orden a:", tipoOrden);
        GetAuctions();
    };

    
    const btnRecientes = document.getElementById("boton_recientes");
    if(btnRecientes) btnRecientes.addEventListener("click", () => aplicarOrden(btnRecientes, 'recientes'));

    const btnAntiguas = document.getElementById("boton_masantiguas");
    if(btnAntiguas) btnAntiguas.addEventListener("click", () => aplicarOrden(btnAntiguas, 'antiguas'));

    const btnMayor = document.getElementById("boton_mayor_cant_ofertas");
    if(btnMayor) btnMayor.addEventListener("click", () => aplicarOrden(btnMayor, 'mayor_ofertas'));

    const btnMenor = document.getElementById("boton_menor_cant_ofertas");
    if(btnMenor) btnMenor.addEventListener("click", () => aplicarOrden(btnMenor, 'menor_ofertas'));

    // Cargar subastas al inicio
    
});