async function Search() {
    const searchInput = document.getElementById("search_input").value;
    document.getElementById("auctions").innerHTML = "";
    
    const URL = `http://localhost:3030/api/v1/auctions?search=${searchInput}`;
    
    try {
        const response = await fetch(URL);
        const auctions = await response.json();
        
        auctions.forEach(auction => {
            const card = `
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
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img
                                        src="${auction.image_url}"
                                        alt="Placeholder image"
                                    />
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-5">${auction.title}</p>
                                <p class="title is-6">$${auction.initial_price}</p>
                            </div>
                        </div>

                        <div class="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
                            iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
                            <a href="#">#responsive</a>
                            <br/>
                            ${auction.modification_date.slice(0,10)}
                        </div>
                    </div>
                </div>
            `;
            
            let auctions_container = document.getElementById("auctions");
            let auctionactual = document.createElement("div");
            auctionactual.className = "card post";
            auctionactual.innerHTML = card;
            auctions_container.appendChild(auctionactual);
        });
    } catch (error) {
        console.error("Error fetching auctions:", error);
        document.getElementById("auctions").innerHTML = 
            `<div class="notification is-danger">Error al cargar las subastas</div>`;
    }
}

document.getElementById("search_button").addEventListener("click", Search);

document.getElementById("search_input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        Search();
    }
});

// GET a todas las subastas
async function GetAuctions() {
    document.getElementById("auctions").innerHTML = ""
    const URL = "http://localhost:3030/api/v1/auctions"
    // const URL2 = "http://localhost:3030/api/v1/users"
    const response = await fetch(URL)
    const auctions = await response.json();

    auctions.forEach(auction => {
        const card = `
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
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img
                                src="${auction.image_url}"
                                alt="Placeholder image"

                            />
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-5">${auction.title}</p>
                        <p class="title is-6">$${auction.initial_price}</p>
                    </div>
                    </div>

                    <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
                    iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
                    <a href="#">#responsive</a>
                    <br/>
                    ${auction.modification_date.slice(0,10)}</time>
                    </div>
                </div>
            </div>
            `

        let auctions_container = document.getElementById("auctions")
        let auctionactual = document.createElement("div")
        auctionactual.classname = "card post"
        auctionactual.innerHTML = card
        auctions_container.appendChild(auctionactual)
    });

}