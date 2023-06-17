import {highestAssistance, lowestAssistance, largerCapacity, sumRevenuesPerCategoryForUE, sumRevenuesPerCategoryForPE, attendancePercentageForUE, attendancePercentageForPE, promedy, revenuesStatisticsForUE, revenuesStatisticsForPE, percentageStatisticsForUE, percentageStatisticsForPE} from "./module/functions.js"

const tableOne = document.getElementById("tableOne")
const tableTwo = document.getElementById("tableTwo")
const tableThree = document.getElementById("tableThree")

let data;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json()) //resolve (respuesta positiva): utilizamos método json qe nos devuelve otra promesa
    .then(info =>{
        data = info
        console.log(data.events)
        
        //UPCOMING EVENTS STATISTICS BY CATEGORY
        //UPCOMING EVENTS STATISTICS BY CATEGORY
        //UPCOMING EVENTS STATISTICS BY CATEGORY

        console.log("UPCOMING STATISTICS BY CATEGORY:")

        const upcomingEvents = data.events.filter(events =>{
            if(events.date > data.currentDate){
                return{};
            }  
        })

        console.log(upcomingEvents);

        //Saco mis categorias desde eventos futuros
        const categoriesForUpcomingEvents = upcomingEvents.map(event => event.category);

        //elimino las categorias repetidas utilizando SET
        const categoriesForUpcomingEventsWithoutRepeats = new Set(categoriesForUpcomingEvents);
        //console.log(categoriesWithoutRepeats);

        //convierto ese SET nuevamente en Array
        const arrayCategoriesForUpcomingEventsWithoutRepeats = Array.from(categoriesForUpcomingEventsWithoutRepeats);
        console.log(arrayCategoriesForUpcomingEventsWithoutRepeats);

        const revenuesUpcomingEvents = revenuesStatisticsForUE(upcomingEvents, arrayCategoriesForUpcomingEventsWithoutRepeats)
        console.log(revenuesUpcomingEvents)

        const percentagesUpcomingEvents = percentageStatisticsForUE(upcomingEvents, arrayCategoriesForUpcomingEventsWithoutRepeats)
        console.log(percentagesUpcomingEvents)

        const arrayUpcomingEvents = arrayCategoriesForUpcomingEventsWithoutRepeats.map((category, index)=>{
            return{
                category: category,
                revenue: revenuesUpcomingEvents[index].revenue,
                percentage: percentagesUpcomingEvents[index].percentageAttendance
            }
        });

        console.log(arrayUpcomingEvents);

        let statiticsUpcomingEvents = [{arrayCategoriesForUpcomingEventsWithoutRepeats}, revenuesStatisticsForUE(upcomingEvents, arrayCategoriesForUpcomingEventsWithoutRepeats), percentageStatisticsForUE(upcomingEvents, arrayCategoriesForUpcomingEventsWithoutRepeats)]

        console.log(statiticsUpcomingEvents)

        const templateTableTwo = arrayUpcomingEvents.reduce((acc, act) =>{
                return  acc +  `<tr>
                                <td>${act.category}</td>
                                <td>$${act.revenue}</td>
                                <td>${act.percentage}%</td>
                            </tr>`           
        },"")
        
        tableTwo.innerHTML = templateTableTwo;

        //PAST EVENTS STATISTICS BY CATEGORY
        //PAST EVENTS STATISTICS BY CATEGORY
        //PAST EVENTS STATISTICS BY CATEGORY

        console.log("PASTEVENTS STATISTICS BY CATEGORY:")

        const pastEvents = data.events.filter(events =>{
            if(events.date < data.currentDate){
                return{}
            }  
        })
            
        console.log(pastEvents);

        //Saco mis categorias desde eventos futuros
        const categoriesForPastEvents = pastEvents.map(event => event.category);

        //elimino las categorias repetidas utilizando SET
        const categoriesForPastEventsWithoutRepeats = new Set(categoriesForPastEvents);
        //console.log(categoriesWithoutRepeats);

        //convierto ese SET nuevamente en Array
        const arrayCategoriesForPastEventsWithoutRepeats = Array.from(categoriesForPastEventsWithoutRepeats);
        console.log(arrayCategoriesForPastEventsWithoutRepeats);

        console.log(highestAssistance(pastEvents))

        console.log(lowestAssistance(pastEvents))

        console.log(largerCapacity(pastEvents))

        const revenuesPastEvents = revenuesStatisticsForPE(pastEvents, arrayCategoriesForPastEventsWithoutRepeats)
        console.log(revenuesPastEvents);

        const percentagesPastEvents = percentageStatisticsForPE(pastEvents, arrayCategoriesForPastEventsWithoutRepeats)
        console.log(percentagesPastEvents);

        const arrayPastEvents = arrayCategoriesForPastEventsWithoutRepeats.map((category, index)=>{
            return{
                category: category,
                revenue: revenuesPastEvents[index].revenue,
                percentage: (percentagesPastEvents[index].percentageByCategory)
            }
        });

        console.log(arrayPastEvents);

        const templateTableThree = arrayPastEvents.reduce((acc, act) =>{
            return  acc +  `<tr>
                                <td>${act.category}</td>
                                <td>$${act.revenue}</td>
                                <td>${act.percentage}%</td>
                            </tr>`
        },"")
        
        tableThree.innerHTML = templateTableThree;

        console.log("EVENTS STATISTICS:")

        const highestAssistancePastEvents = highestAssistance(pastEvents)
        console.log(highestAssistancePastEvents)

        const lowestAssistancePastEvents = lowestAssistance(pastEvents)
        console.log(lowestAssistancePastEvents)

        const largerAssistancePastEvents = largerCapacity(pastEvents)
        console.log(largerAssistancePastEvents)

        const arrayEventsStatistics = {
            HA: highestAssistancePastEvents,
            LA: lowestAssistancePastEvents,
            LAA: largerAssistancePastEvents
        }

        console.log(arrayEventsStatistics);

        const templateTableOne =
                            `<tr>
                                <td>${arrayEventsStatistics.HA}</td>
                                <td>${arrayEventsStatistics.LA}</td>
                                <td>${arrayEventsStatistics.LAA}</td>
                            </tr>`

        tableOne.innerHTML = templateTableOne;

    })
.catch(err => console.log(err))

