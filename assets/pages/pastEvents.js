import {newTemplateCardEvents, newTemplateCheckbox, filterByCheck} from "./module/functions.js"

const div = document.getElementById("container");
const formForCheckbox = document.getElementById("formCheckbox")
const formForSearchBox = document.getElementById("formSearchBox");

formForCheckbox.addEventListener(`change`, handleChange)
formForSearchBox.addEventListener(`keyup`, happenedEvent)

let data

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json()) //resolve (respuesta positiva): utilizamos método json qe nos devuelve otra promesa
    .then(info =>{ //
        data = info

        printCard(data.events, container)

        const categories = data.events.map(event => event.category);

        //elimino las categorias repetidas utilizando SET
        const categoriesWithoutRepeats = new Set(categories);

        const arrayCategoriesWithoutRepeats = Array.from(categoriesWithoutRepeats);

        printCheckbox(arrayCategoriesWithoutRepeats, formForCheckbox)

    })
.catch(err => console.log(err))

function printCard(array, place){
    let template = ""
 
        for (let event of array){
            if(event.date < data.currentDate){
            template += newTemplateCardEvents(event)
            }
        }
    place.innerHTML = template
}

//CHECKBOX:

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

function handleChange(event){
    const filteredCategories = crossFilters(data.events)
    printCard(filteredCategories, container)
}

//SEARCHox:

function happenedEvent(event){
    const filteredCategories = crossFilters(data.events)
    printCard(filteredCategories, container)
}

function filterBySearch(array){
    //   console.log([formForSearchBox.value])
    const filteredSearch = array.filter(event => event.name.toLowerCase().includes(formForSearchBox.value.toLowerCase()))
    if(filteredSearch.length != "0"){
        return filteredSearch
    }else{
        return alert("Search not found")
    }   
}

function crossFilters(array){
        const filters = filterBySearch(array)
        const filter2 = filterByCheck(filters)
        return filter2
}