let div = document.getElementById("containerPastEvents");

function newTemplate(objeto){
    return `<div class="card d-flex bg-black text-white rounded-4 m-2" style="width: 18rem;">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title text-violet">${objeto.name}</h5>
                    <p class="card-text">Date: ${objeto.date}</p>
                    <img src="${objeto.image}" class="card-img-top p-3" alt="museum">
                    <div class="d-flex justify-content-between align-items-center">
                        <a href=${"./details.html"} class="btn btn-violet">Details</a>
                        <p class="text-violet">$ ${objeto.price}.0 USD</p>
                    </div>
                </div>
            </div>`
}

function printData(array, place){
    let template = ""
 
        for (let event of array){
            if(event.date < data.currentDate){
            template += newTemplate(event)
            }
        }
  
    console.log(template)
    place.innerHTML += template
}

printData(data.events, containerPastEvents)