// Estado actual de los filtros
let currentFilters = {
    sort: 'recientes',  // Orden por defecto
    category: [],  // Categoría seleccionada
    type_offer: '',  // Tipo de oferta seleccionado
    search: '',  // Tipo de oferta seleccionado 
    page: 1 
};
        
const actualizarBotonesPaginacion = (totalResultados) => {
    const limitePorPagina = 18; 
    const totalPaginas = Math.ceil(totalResultados / limitePorPagina);
    const paginaActual = currentFilters.page;

    const botonesAnterior = document.querySelectorAll(".pagination-previous");
    const botonesSiguiente = document.querySelectorAll(".pagination-next");


    botonesAnterior.forEach(btn => {
        if (paginaActual === 1) {
            btn.setAttribute("disabled", true); // Para que se vea gris
            btn.style.pointerEvents = "none";   // Para que no se pueda clickear
            btn.style.opacity = "0.5";          // Efecto visual
        } else {
            btn.removeAttribute("disabled");
            btn.style.pointerEvents = "auto";
            btn.style.opacity = "1";
        }
    });
    botonesSiguiente.forEach(btn => {
        // Si la página actual es mayor o igual al total, apagamos
        if (paginaActual >= totalPaginas || totalResultados === 0) {
            btn.setAttribute("disabled", true);
            btn.style.pointerEvents = "none";
            btn.style.opacity = "0.5";
        } else {
            btn.removeAttribute("disabled");
            btn.style.pointerEvents = "auto";
            btn.style.opacity = "1";
        }
    });
};

function FilterByCategory(id, elementoHTML) {
    const categoryId = parseInt(id);

    if (elementoHTML.checked) {
        if (!currentFilters.category.includes(categoryId)) {
            currentFilters.category.push(categoryId);
        }
    } else {
        currentFilters.category = currentFilters.category.filter(catId => catId !== categoryId);
    }
    currentFilters.page = 1;
    GetAuctions()
}

function ApplySearch() {
    const input = document.querySelector('#search_input'); 
    if (input) {
        currentFilters.search = input.value;
        currentFilters.page = 1;
        GetAuctions();
    } else {
        console.error("Search input element not found.");
    }
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

async function GetAuctions() {
    
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
        if (currentFilters.page) queryParams.append('page', currentFilters.page);

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

        let total = 0
        if(auctions.length > 0 && auctions[0].total_resultados){
            total = parseInt(auctions[0].total_resultados)
        }
        actualizarBotonesPaginacion(total);

        if (auctions.length === 0) {
            auctions_container.innerHTML = 
                `<div class="notification is-warning">No se encontraron subastas que coincidan con los filtros aplicados.</div>`;
            return;
        }


        auctions.forEach(auction => {

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
                                    <img src="${auction.image_url || `https://ui-avatars.com/api/?name=${auction.firstname || ''}+${auction.lastname || ''}`}" alt="User image"/>
                                </figure>
                            </div>
                            <div class="media-content">
                                <a href="subasta.html?id=${auction.id}" class="title is-5">${auction.title}</a>
                                <p class="subtitle is-6">@${auction.username}</p>
                                
                            </div>
                        </div>

                        <div class="content">
                            ${auction.offer_type === 1 ? `<p class="title is-5" class="title is-6">Precio inicial: $${auction.initial_price}</p>` : ''}
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
        currentFilters.page = 1;
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
    
    
    const changePage = (direction) => {
        if (direction === -1 && currentFilters.page === 1) return;
        currentFilters.page += direction;
        window.scrollTo({ top: 0, behavior: 'smooth' })
        GetAuctions()
    }

    const btnsPrev = document.querySelectorAll(".pagination-previous");
    const btnsNext = document.querySelectorAll(".pagination-next");
    
    btnsPrev.forEach(button => {
        button.addEventListener("click", () => changePage(-1))
    });
    btnsNext.forEach(button => {
        button.addEventListener("click", () => changePage(1))
    });

});