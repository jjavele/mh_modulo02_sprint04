let div = document.getElementById("cointainerDetails");

function newTemplate(objeto){
    return `<div class="pt-4 ps-2 pe-2">
                <div class="card mb-3 bg-black text-violet rounded-4" style="max-width: 768px;">
                    <div class="row g-0">
                        <div class="col-md-4 d-flex object-fit-contain">
                            <img src="${objeto.image}" class="img-fluid rounded-start p-3 rounded-4 object-fit-cover" alt="${(objeto.name).replace(/ /g, "-")}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h4 class="card-title">${objeto.name}</h4>
                                <p class="card-text fs-5">${objeto.description}</p>
                                <p class="card-text fs-5">${objeto.date}</p>
                                <p class="card-text fs-5">${objeto.place}</p>
                                <p class="card-text fs-5">${objeto.price}.0 USD.</p>
                                <p class="card-text fs-5"><small class="text-violet">${objeto.capacity} P</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}

function printData(array, place){
    let template = ""
    for (let event of array){
        template += newTemplate(event)
    }
    console.log(template)
    place.innerHTML += template
}

printData(data.events, cointainerDetails)