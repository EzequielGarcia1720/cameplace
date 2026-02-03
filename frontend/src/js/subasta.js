

async function loadAuctionDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log("El id de la subasta es: " + id);
    const auctionContainer = document.getElementById('contenedor');
    let auction = "";

    await fetch(`http://localhost:3030/api/v1/auctions/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            auction = data;
            console.log(auction);

            // Crear un elemento div y asignar el HTML usando los datos correctos
            const cardDiv = document.createElement('div');
            // Determinar el estado de la subasta
            let statusBadge = '';
            if (auction.auction_status === 1) {
                statusBadge = `<div class="auction-status-badge status-active">🟢 Subasta Activa</div>`;
            } else if (auction.auction_status === 2) {
                statusBadge = `<div class="auction-status-badge status-paused">🟡 Subasta Pausada</div>`;
            } else if (auction.auction_status === 3) {
                statusBadge = `<div class="auction-status-badge status-ended">🔴 Subasta Finalizada</div>`;
            }
            cardDiv.innerHTML = `
                <div class="columns mt-5 auction_columns">
                    <div class="column auction_column is-two-thirds">
                        <figure class="image is-2by1">
                            <img class="auction_img" src="${auction.images_urls}" />
                        </figure>
                        <h1 class="title is-3 mt-2">${auction.title}</h1>
                        <h2 class="subtitle is-5">Precio inicial: $${auction.initial_price}</h2>
                    </div> 
                    <div class="column auction_column">
                        <!-- Sección de Ofertar -->
                        <div class="bid-section">
                            <div class="bid-header">
                                <h1 class="title is-4">Realizar Oferta</h1>
                            </div>
                            ${auction.auction_status === 3 ? `
                                <div class="auction-ended-message ended-message-style">
                                    <strong>SUBASTA FINALIZADA</strong>
                                    <p class="text-grey">No se pueden realizar más ofertas.</p>
                                </div>
                            ` : auction.auction_status === 2 ? `
                                <div class="auction-paused-message paused-message-style">
                                    <strong>SUBASTA PAUSADA</strong>
                                    <p class="text-grey">Las ofertas están temporalmente deshabilitadas.</p>
                                </div>
                            ` : `
                                <!-- Pestañas de Tipo de Oferta -->
                                <div class="bid-tabs mt-4">
                                    <button id="cashTab" class="bid-tab" data-tab="cash">💰 Dinero</button>
                                    <button id="tradeTab" class="bid-tab" data-tab="trade">🔄 Producto</button>
                                    <button id="mixedTab" class="bid-tab" data-tab="mixed">💸 Mixta</button>
                                </div>

                                <!-- Mensaje inicial -->
                                <div id="selectOfferMsg" class="select-offer-message select-offer-style">
                                    Selecciona el tipo de oferta que deseas realizar
                                </div>

                                <!-- Formulario de Oferta en Dinero -->
                                <form class="bid-form mt-5" id="cashForm" hidden>
                                    <div class="form-group">
                                        <label for="cashAmount">Monto en pesos:</label>
                                        <div class="field">
                                            <input class="input" type="number" id="cashAmount" min="${auction.initial_price}" step="1000" 
                                                placeholder="${auction.initial_price}" required>
                                        </div>
                                        <small>Oferta mínima: $${auction.initial_price}</small>
                                    </div>
                                    <button id="cashSubmit" type="submit" class="btn btn-primary btn-full">
                                        📨 Enviar Oferta en Dinero
                                    </button>
                                </form>

                                <!-- Formulario de Trueque -->
                                <form class="bid-form" id="tradeForm" hidden>
                                    <div class="form-group">
                                        <label for="tradeItem">¿Qué ofreces?</label>
                                        <input type="text" class="input" id="tradeItem" 
                                            placeholder="Ej: MacBook Pro 2020" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Descripción del trueque:</label>
                                        <br>
                                        <textarea class="textarea" id="tradeDescription" rows="4" 
                                                placeholder="Describe el estado, accesorios incluidos, etc..." required></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>Link de Imagen:</label>
                                        <br>
                                        <input class="input" id="tradeImageLink" 
                                                placeholder="Proporciona un enlace a la imagen del producto" required></input>
                                    </div>
                                    <button id="tradeSubmit" type="submit" class="btn btn-secondary btn-full">
                                        🔄 Ofrecer Trueque
                                    </button>
                                </form>

                                <!-- Formulario Mixto -->
                                <form class="bid-form" id="mixedForm" hidden>
                                    <div class="form-group">
                                        <label for="mixedCash">Monto en dinero:</label>
                                        <div class="field">
                                            <input class="input" type="number" id="mixedCashAmount" min="${auction.initial_price}" step="1000" 
                                                placeholder="${auction.initial_price}" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="mixedTrade">Item de trueque:</label>
                                        <input type="text" class="input" id="mixedTrade" 
                                            placeholder="Ej: Nintendo Switch + juegos" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Descripción del trueque:</label>
                                        <br>
                                        <textarea class="textarea" id="mixedTradeDescription" rows="3" 
                                                placeholder="Describe el estado, accesorios incluidos, etc..." required></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>Link de Imagen:</label>
                                        <br>
                                        <input class="input" id="mixedImageLink" 
                                                placeholder="Proporciona un enlace a la imagen del producto" required></input>
                                    </div>
                                    <button id="mixedSubmit" type="submit" class="btn btn-accent btn-full">
                                        💰🔄 Oferta Mixta
                                    </button>
                                </form>
                            `}
                        </div>
                    </div>
                </div>
                <div class="columns mt-2 mb-5 auction_columns">
                    <div class="column auction_column is-two-thirds">
                        <!-- Información de la Subasta -->
                        <div class="auction-description">
                            ${statusBadge}
                            <div class="meta-item">
                                <span class="meta-label">📅 Publicada:</span>
                                <span>${auction.creation_date ? new Date(auction.creation_date).toLocaleDateString() : ''}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">🎯 Tipo de oferta:</span>
                                <span>${auction.offer_type_name || ''}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">📦 Condición:</span>
                                <span>${auction.auction_condition || ''}</span>
                            </div>

                        </div>
                        <div class="auctioneer-info">
                            <img src="${auction.image_url || `https://ui-avatars.com/api/?name=${auction.firstname || ''}+${auction.lastname || ''}`}" alt="Avatar del subastador" class="auctioneer-avatar">
                            <div>
                                <strong>${auction.firstname || ''} ${auction.lastname || ''}</strong>
                                <p class="text-grey"> @${auction.username || ''}</p>
                            </div>
                        </div>

                        <div class="auction-meta">
                            <div class="product-description">
                                <h3>Descripción</h3>
                                <p>${auction.descripcion || ''}</p>
                            </div>
                        </div>

                    </div>
                    <div class="column auction_column">
                        <!-- Lista de Ofertas Recientes -->
                        <div class="current-stats">
                            <div class="stat">
                                <span class="stat-label"><strong>Ofertas recibidas:</strong></span>
                                <span class="stat-value">${auction.count_offers}</span>
                            </div>
                            <div class="offer-type-indicators offer-type-indicators-style">
                                <div class="indicator-col-style">
                                    <span class="cash_indicator"></span>
                                    <span class="cash_indicator_label" >Dinero</span>
                                </div>
                                <div class="indicator-col-style">
                                    <span class="trade_indicator"></span>
                                    <span class="trade_indicator_label">Producto</span>
                                </div>
                                <div class="indicator-col-style">
                                    <span class="mixed_indicator"></span>
                                    <span class="mixed_indicator_label">Mixta</span>
                                </div>
                            </div>
                        </div>

                        <div class="recent-bids">
                            <h3>📊 Ofertas Recientes</h3>
                            <div class="bids-list">
                            <!-- Ofertas recientes se cargarán acá -->
                            </div>
                            <a href="#" class="view-all-bids">Ver todas las ofertas (${auction.count_offers || 0}) </a>
                        </div>
                    </div>
                </div>
            `;
            auctionContainer.appendChild(cardDiv);

            
            if (auction.auction_status == 1) {
            // --- Alternancia de formularios y mensaje ---
            const bidTabs = cardDiv.querySelectorAll('.bid-tab');
            const bidForms = cardDiv.querySelectorAll('.bid-form');
            const selectOfferMsg = cardDiv.querySelector('#selectOfferMsg');

            bidTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabType = tab.getAttribute('data-tab');
                    const form = cardDiv.querySelector(`#${tabType}Form`);
                    // Alternar visibilidad del formulario
                    const isActive = form.style.display === '';
                    // Ocultar formularios
                    bidForms.forEach(form => form.style.display = 'none');
                    // Si estaba activo, mostrar mensaje; si no, mostrar el formulario
                    if (isActive) {
                        selectOfferMsg.style.display = '';
                    } else {
                        form.style.display = '';
                        selectOfferMsg.style.display = 'none';
                    }
                });
            });

            // Al cargar, mostrar solo el mensaje
            bidForms.forEach(f => f.style.display = 'none');
            selectOfferMsg.style.display = '';

            // Deshabilitar tipos de oferta segun si la subasta es de tipo solo dinero, solo trueque o ambos
            const offerTypeElement = auction.offer_type_name;
            if (offerTypeElement) {
                const offerType = offerTypeElement;
                bidTabs.forEach(tab => {
                    const tabType = tab.getAttribute('data-tab');
                    if (offerType === 'Dinero' && (tabType === 'trade' || tabType === 'mixed')) {
                        tab.classList.add('disabled');
                        tab.style.pointerEvents = 'none';
                    } else if (offerType === 'Producto' && (tabType === 'cash' || tabType === 'mixed')) {
                        tab.classList.add('disabled');
                        tab.style.pointerEvents = 'none';
                    } else if (offerType === 'Mixta') {
                        // No deshabilitar ningún tab
                        tab.classList.remove('disabled');
                        tab.style.pointerEvents = '';
                    }
                });
            }


            // --- Listeners de pestañas ---
            cardDiv.querySelectorAll('.bid-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabType = tab.getAttribute('data-tab');
                    const form = cardDiv.querySelector(`#${tabType}Form`);
                    if (!form) return; // Evita error si el formulario no existe
                    const isActive = tab.classList.contains('active');
                    // Quitar 'active' de todos los tabs y formularios
                    cardDiv.querySelectorAll('.bid-tab').forEach(t => t.classList.remove('active'));
                    cardDiv.querySelectorAll('.bid-form').forEach(f => f.classList.remove('active'));
                    if (!isActive) {
                        tab.classList.add('active');
                        form.classList.add('active');
                    }
                });
            });
        };

            // --- Envío de ofertas ---
            cardDiv.querySelectorAll('.bid-form').forEach(form => {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Enviando...';
                    submitBtn.disabled = true;

                    // Obtener datos según el formulario
                    let offerData = {
                        auction_id: auction.id,
                        offer_type: null, // 1: Dinero, 2: Producto, 3: Mixta
                        title: auction.title,
                        descripcion: '',
                        images_urls: '',
                        mount: 0,
                        auctioneer_id: auction.user_id, // subastador
                        bidder_id: parseInt(sessionStorage.getItem('sesion_actual')),
                        estado: 'Activa' // Estado por defecto
                    };

                    if (form.id === 'cashForm') {
                        offerData.offer_type = 1;
                        offerData.descripcion = 'Oferta en dinero';
                        offerData.mount = parseFloat(form.querySelector('#cashAmount').value);
                    } else if (form.id === 'tradeForm') {
                        offerData.offer_type = 2;
                        offerData.descripcion = form.querySelector('#tradeDescription').value;
                        offerData.title = form.querySelector('#tradeItem').value;
                        offerData.images_urls = form.querySelector('#tradeImageLink').value;
                        offerData.mount = 0;
                    } else if (form.id === 'mixedForm') {
                        offerData.offer_type = 3;
                        offerData.descripcion = form.querySelector('#mixedTradeDescription').value;
                        offerData.title = form.querySelector('#mixedTrade').value;
                        offerData.images_urls = form.querySelector('#mixedImageLink').value;
                        offerData.mount = parseFloat(form.querySelector('#mixedCashAmount').value);
                    }

                    // Enviar POST a la API
                    try {
                        const response = await fetch('http://localhost:3030/api/v1/offers', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(offerData)
                        });
                        if (!response.ok) throw new Error('Error al enviar la oferta');
                        alert('¡Oferta enviada correctamente!');
                        form.reset();
                        window.location.reload();
                    } catch (err) {
                        alert('Error al enviar la oferta');
                        console.error(err);
                    } finally {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                });
            });

        })
        .catch(error => {
            console.error("Error fetching auction details:", error);
            const auctionContainer = document.getElementById('contenedor');
            if (auctionContainer) {
                auctionContainer.innerHTML = '<p>Error al cargar los detalles de la subasta.</p>';
            }
        });
}

loadAuctionDetails();


















// // Cambio de pestañas
// document.querySelectorAll('.bid-tab').forEach(tab => {
//     tab.addEventListener('click', () => {
//         // Remover active de todas las pestañas
//         document.querySelectorAll('.bid-tab').forEach(t => t.classList.remove('active'));
//         document.querySelectorAll('.bid-form').forEach(f => f.classList.remove('active'));
        
//         // Activar pestaña clickeada
//         tab.classList.add('active');
//         const tabType = tab.getAttribute('data-tab');
//         document.getElementById(tabType + 'Form').classList.add('active');
//     });
// });

// //Deshabilitar tipos de oferta segun si la subasta es de tipo solo dinero, solo trueque o ambos
// const offerTypeElement = auction.offer_type_name;
// if (offerTypeElement) {
//     const offerType = offerTypeElement.value;
//     const bidTabs = document.querySelectorAll('.bid-tab');
//     bidTabs.forEach(tab => {
//         const tabType = tab.getAttribute('data-tab');
//         if (offerType === 'Dinero' && tabType === 'trade') {
//             tab.classList.add('disabled');
//             tab.style.pointerEvents = 'none';
//         } else if (offerType === 'Producto' && tabType === 'money') {
//             tab.classList.add('disabled');
//             tab.style.pointerEvents = 'none';
//         }
//     });
// }

// // Envío de ofertas
// document.querySelectorAll('.bid-form').forEach(form => {
//     form.addEventListener('submit', async (e) => {
//         e.preventDefault();
        
//         //envío a la API
//         const submitBtn = form.querySelector('button[type="submit"]');
//         const originalText = submitBtn.textContent;
//         submitBtn.textContent = 'Enviando...';
//         submitBtn.disabled = true;

        
//         await new Promise(resolve => setTimeout(resolve, 2000));
        
//         alert('¡Oferta enviada correctamente! El vendedor será notificado.');
//         submitBtn.textContent = originalText;
//         submitBtn.disabled = false;
//         form.reset();
//     });
// });