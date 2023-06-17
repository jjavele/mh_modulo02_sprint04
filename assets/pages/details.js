const $details = document.getElementById("containerDetails")

console.log(location.search)

const params = new URLSearchParams(location.search)

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json()) //resolve (respuesta positiva): utilizamos método json qe nos devuelve otra promesa
    .then(info =>{ //
        data = info
        //console.log(data.amazing)
        
        const _id = params.get("_id")

        const findedCard = data.events.find( element => element._id == _id)

        console.log(findedCard)

        $details.innerHTML = `
            <div class="pt-4 ps-2 pe-2">
                <div class="card mb-3 bg-black text-violet rounded-4" style="max-width: 768px;">
                    <div class="row g-0">
                        <div class="col-md-4 d-flex object-fit-contain">
                            <img src="${findedCard.image}" class="img-fluid rounded-start p-3 rounded-4 object-fit-cover" alt="${(findedCard.name).replace(/ /g, "-")}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h4 class="card-title">${findedCard.name}</h4>
                                <p class="card-text fs-5">${findedCard.description}</p>
                                <p class="card-text fs-5">Date: ${findedCard.date}</p>
                                <p class="card-text fs-5">Place: ${findedCard.place}</p>
                                <p class="card-text fs-5">Price: ${findedCard.price}.0 USD.</p>
                                <p class="card-text fs-5"><small class="text-violet">Capacity: ${findedCard.capacity} P</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`

    })
    .catch(err => console.log(err))
