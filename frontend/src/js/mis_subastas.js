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
    const busqueda = searchbar.value;
    console.log(busqueda)
    if (!busqueda || busqueda.lenght == 0) {
        alert("No se pueden realizar búsquedas vacías")
        return;
    }
})
