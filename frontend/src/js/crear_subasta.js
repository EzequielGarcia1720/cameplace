
document.addEventListener('DOMContentLoaded', () => {
    const navbar_item_crear_subasta = document.getElementById('navbar-item-crear-subasta');
    const crear_subasta_btn = document.createElement('div');
    crear_subasta_btn.innerHTML = `
        <div class="buttons">
            <a id="crear_subasta_btn" class="button crear_subasta is-primary">
                <strong>Crear Subasta</strong>
            </a>
        </div>
    `;
    navbar_item_crear_subasta.appendChild(crear_subasta_btn);

});

document.addEventListener('DOMContentLoaded', () => {
    // Contenedor del modal
    let modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'modalContainer';
        document.body.appendChild(modalContainer);
    }

    // addEventListener del boton del navbar
    document.getElementById('crear_subasta_btn').addEventListener('click', (e) => {
        e.preventDefault();
        
        modalContainer.innerHTML = `
            <div class="modal is-active" id="previewModal">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Crear Subasta</p>
                        <button class="delete" aria-label="close" id="closeModalBtn"></button>
                    </header>
                    <section class="modal-card-body" id="modalBody">
                        <!-- Aquí van los datos -->
                    </section>
                    <footer class="modal-card-foot">
                        <button style="color:white" class="mr-5 button is-primary" id="confirmAuctionBtn">Confirmar y crear</button>
                        <button class="button" id="cancelModalBtn">Cancelar</button>
                    </footer>
                </div>
            </div>
        `;

        const previewModal = document.getElementById('previewModal');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const cancelModalBtn = document.getElementById('cancelModalBtn');
        const confirmAuctionBtn = document.getElementById('confirmAuctionBtn');
        const modalBody = document.getElementById('modalBody');

        // Aquí deberías llenar modalBody con los datos de la subasta a previsualizar
        // Ejemplo: modalBody.innerHTML = '...';

        // Manejar cierre del modal
        closeModalBtn.addEventListener('click', () => {
            previewModal.classList.remove('is-active');
        });
        cancelModalBtn.addEventListener('click', () => {
            previewModal.classList.remove('is-active');
        });
        confirmAuctionBtn.addEventListener('click', () => {
            // Aquí va la lógica para crear la subasta
            previewModal.classList.remove('is-active');
        });
    });
});