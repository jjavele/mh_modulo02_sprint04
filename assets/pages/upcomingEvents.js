let div = document.getElementById("container");

function newTemplate(objeto){
    return `<div class="card d-flex bg-black text-white rounded-4 m-2" style="width: 18rem;">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title text-violet">${objeto.name}</h5>
                    <p class="card-text">Date: ${objeto.date}</p>
                    <img src="${objeto.image}" class="card-img-top p-3" alt="museum">
                    <div class="d-flex justify-content-between align-items-center">
                        <a href="./details.html?_id=${objeto._id}" class="btn btn-violet">Details</a>
                        <p class="text-violet">$ ${objeto.price}.0 USD</p>
                    </div>
                </div>
            </div>`
}

function printCard(array, place){
    let template = ""
 
        for (let event of array){
            if(event.date > data.currentDate){
            template += newTemplate(event)
            }
        }
  
    place.innerHTML = template
}

printCard(data.events, container)

//NUEVO
//NUEVO
//NUEVO

// PARA HACER LOS CHECKBOX DINÁMICOS:
// PARA HACER LOS CHECKBOX DINÁMICOS:
// PARA HACER LOS CHECKBOX DINÁMICOS:

//Saco mis categorias desde eventos
const categories = data.events.map(event => event.category);
//console.log(categories);

//elimino las categorias repetidas utilizando SET
const categoriesWithoutRepeats = new Set(categories);
//console.log(categoriesWithoutRepeats);

//convierto ese SET nuevamente en Array
const arrayCategoriesWithoutRepeats = Array.from(categoriesWithoutRepeats);
//console.log(arrayCategoriesWithoutRepeats);

const formForCheckbox = document.getElementById("formCheckbox")

//creo una función para hacer los checkbox dinámicos:
function newTemplateCheckbox(category){
    const div = document.createElement('DIV')
    div.classList.add( 'form-check' )

    const input = document.createElement( 'INPUT' )
    input.type = "checkbox"
    input.className = "form-check-input"
    input.value = category
    input.id = `${category}-check`
    input.name = "category"

    const label = document.createElement('LABEL')
    label.className = "form-check-label"
    label.setAttribute('for',`${category}-check`)
    label.textContent = category
    label.style = "cursor:pointer"

    div.appendChild(input)
    div.appendChild(label)

    return div


    /*return `<div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="${objeto}-check" value="option1">
                <label class="form-check-label text-white fs-5" for="${objeto}-check">${objeto.category}</label>
            </div>`*/
}

function printCheckbox(array, place){
    let templateCheckbox = array.reduce((acc, act) =>{
        return acc + `<div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="check-${act}" value="${act}">
                        <label class="form-check-label text-white fs-5" for="check-${act}">${act}</label>
                    </div>`
    }, "")
    console.log(templateCheckbox)
    place.innerHTML = templateCheckbox
}

printCheckbox(arrayCategoriesWithoutRepeats, formForCheckbox)

//PARA AGREGAR UN ESCUCHADOR A MIS CHECKBOX:
//PARA AGREGAR UN ESCUCHADOR A MIS CHECKBOX:
//PARA AGREGAR UN ESCUCHADOR A MIS CHECKBOX:

//agrego el eventlistener a mi constante de checkbox:
formForCheckbox.addEventListener(`change`, handleChange)

//creo mi función handlechange que opera cuando el navegador escucha un evento y realiza lo que esté en la función:
function handleChange(event){
    const filteredCategories = crossFilters(data.events)
    printCard(filteredCategories, container)
}

//creo mi función para filtrar por catergorias:
function filterByCheck(array){
    const checkbox = Array.from(document.querySelectorAll(`input[type=checkbox]:checked`)).map(check => check.value)
    if(checkbox.length == 0){
        return array
    }else{
        const filteredCategories = array.filter( event => checkbox.includes(event.category))
        return filteredCategories
    }
}

//PARA AGREGAR UN ESCUCHADOR A MI BARRA SEARCH:
//PARA AGREGAR UN ESCUCHADOR A MI BARRA SEARCH:
//PARA AGREGAR UN ESCUCHADOR A MI BARRA SEARCH:

const formForSearchBox = document.getElementById("formSearchBox");

//agrego el eventlistener a mi constante de checkbox:
formForSearchBox.addEventListener(`keyup`, happenedEvent)

//creo mi función happenedEvent que opera cuando el navegador escucha un evento y realiza lo que esté en la función:
function happenedEvent(event){
    const filteredCategories = crossFilters(data.events)
    printCard(filteredCategories, container)
}

//creo mi función para filtrar por search:
function filterBySearch(array){
    //   console.log([formForSearchBox.value])
    const filteredSearch = array.filter(event => event.name.toLowerCase().includes(formForSearchBox.value.toLowerCase()))
    if(filteredSearch.length != "0"){
        return filteredSearch
    }else{
        return alert("Search not found")
    }   
}

//creo una funcion para cruzar las busquedas de search y de checkbox
function crossFilters(array){
        const filters = filterBySearch(array)
        const filter2 = filterByCheck(filters)
        return filter2
}

/*return alert("Búsqueda no encontrada")*/