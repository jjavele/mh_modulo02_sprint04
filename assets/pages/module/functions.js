//HOME, UPCOMINGEVENTS Y PASSEVENTS:
//HOME, UPCOMINGEVENTS Y PASSEVENTS:
//HOME, UPCOMINGEVENTS Y PASSEVENTS:

export function newTemplateCard(objeto){
    return `<div class="card d-flex bg-black text-white rounded-4 m-2" style="width: 18rem;">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title text-violet">${objeto.name}</h5>
                    <p class="card-text">Date: ${objeto.date}</p>
                    <img src="${objeto.image}" class="card-img-top p-3" alt="museum">
                    <div class="d-flex justify-content-between align-items-center">
                        <a href="../assets/pages/details.html?_id=${objeto._id}" class="btn btn-violet">Details</a>
                        <p class="text-violet">$ ${objeto.price}.0 USD</p>
                    </div>
                </div>
            </div>`
}

export function newTemplateCardEvents(objeto){
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

export function newTemplateCheckbox(category){
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
}

export function filterByCheck(array){
    const checkbox = Array.from(document.querySelectorAll(`input[type=checkbox]:checked`)).map(check => check.value)
    if(checkbox.length == 0){
        return array
    }else{
        const filteredCategories = array.filter( event => checkbox.includes(event.category))
        return filteredCategories
    }
}

export function crossFilters(array){
    const filters = filterBySearch(array)
    const filter2 = filterByCheck(filters)
    return filter2
}

//STATS
//STATS
//STATS

//TABLA 1

export function highestAssistance(array){
    let highest = 0;
    let position = "";
    for(let i=0; i<array.length; i++){
        if((array[i].assistance * 100) / array[i].capacity > highest){
            highest = ((array[i].assistance * 100) / array[i].capacity).toFixed(1);
            position = array[i].name;
        }
    }    
    return position + " " + highest + "%"; 
}

export function lowestAssistance(array){
    let lowest = 100;
    let position = "";
    for(let i=0; i<array.length; i++){
        if((array[i].assistance * 100) / array[i].capacity < lowest){
            lowest = ((array[i].assistance * 100) / array[i].capacity).toFixed(1);
            position = array[i].name;
        }
    }    
    return position + " " + lowest + "%"; 
}

export function largerCapacity(array){
    let larger = 0;
    let position = "";
    for(let i=0; i<array.length; i++){
        if(array[i].capacity > larger){
            larger = array[i].capacity;
            position = array[i].name;
        }
    }    
    return position + " " + larger.toLocaleString(); 
}

//TABLAS 2 Y 3

export function sumRevenuesPerCategoryForUE(array, category){
    let totalRevenues = 0;
    for(let i=0; i<array.length; i++){
        if(array[i].category == category){
            totalRevenues += array[i].price * array[i].estimate;
        }
    }
    return totalRevenues;  
}

export function sumRevenuesPerCategoryForPE(array, category){
    let totalRevenues = 0;
    for(let i=0; i<array.length; i++){
        if(array[i].category == category){
            totalRevenues += array[i].price * array[i].assistance;
        }
    }
    return totalRevenues;  
}

export function attendancePercentageForUE(array, category){
    let porcentage = [];
    for(let i=0; i<array.length; i++){
        if(array[i].category == category){
            porcentage.push((array[i].estimate * 100) / array[i].capacity);            
        }else{
        }
    }return porcentage; 
}

export function attendancePercentageForPE(array, category){
    let porcentage = [];
    for(let i=0; i<array.length; i++){
        if(array[i].category == category){
            porcentage.push((array[i].assistance * 100) / array[i].capacity);            
        }
    }return porcentage; 
}

export function promedy(array){
    let sum = 0;
    for(let i=0; i<array.length; i++){
        sum += array[i]
    }
    const promedy = sum / array.length;
    return promedy
}

export function revenuesStatisticsForUE(array, category){
    let results = [];
    for(let i=0; i<category.length; i++){
        let revenueByCategory = {
            revenue: (parseFloat(sumRevenuesPerCategoryForUE(array, category[i]))).toLocaleString()
        }
        results.push(revenueByCategory);
    }          
    return results;
}

export function revenuesStatisticsForPE(array, category){
    let results = []
    for(let i=0; i<category.length; i++){
        let revenueByCategory = {
            revenue: (parseFloat(sumRevenuesPerCategoryForPE(array, category[i]))).toLocaleString()
        }
        results.push(revenueByCategory);
    }
    return results;       
}

export function percentageStatisticsForUE(array, category){
    let results = [];
    for(let j=0; j<category.length; j++){
        let percentageByCategory = {
            percentageAttendance: promedy(attendancePercentageForUE(array, category[j])).toFixed(1)
        }
        results.push(percentageByCategory);
    }
    return results;
}

export function percentageStatisticsForPE(array, category){
    let results = [];
    for(let j=0; j<category.length; j++){
        let percentageByCategory = {
            percentageByCategory: promedy(attendancePercentageForPE(array, category[j])).toFixed(1)
        }
        results.push(percentageByCategory);
    }
    return results;
}