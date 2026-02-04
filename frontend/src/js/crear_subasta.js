
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
