//Formas de CASTEAR: Asignar un tipo a una variable.
const bAdd = document.querySelector("#bAdd") as HTMLButtonElement;
const inputTitle = document.querySelector("#title") as HTMLInputElement;
const inputCost = <HTMLInputElement>document.querySelector("#cost");
const inputCurrency:HTMLInputElement = <HTMLInputElement>document.querySelector("#currency");

//Este archivo "sabe" de expenses.ts porque los dos fueron citados en index.html
const expenses = new Expenses("USD");

render();

// "?" si no estás seguro de que el elemento existe. "!" si estás seguro
bAdd?.addEventListener("click", e => {
    if (inputTitle.value !== "" && inputCost.value !== "" && !isNaN(parseFloat(inputCost.value))){
        const title = inputTitle.value;
        const cost:number  = parseFloat(inputCost.value);
        const currency = <Currency>inputCurrency.value;

        expenses.add({title: title, cost:{number:cost, currency:currency}});

        render()
    } else {
        alert("Completa los datos correctamente")
    }
})

function render(){
    let html = "";

    expenses.getItems().forEach(item => {
        const {id, title, cost} = item;
        const {number, currency} = cost;

        html += `
        <div class="item">
            <div><span class="currency">${currency}</span>${number}</div>
            <div>${title}</div>
            <div><button class="bEliminar" data-id="${id}">Eliminar</button></div>
        </div>
        `
    })

    $("#items").innerHTML = html;
    $("#display").textContent = expenses.getTotal();

    $$(".bEliminar").forEach(bEliminar => {
        bEliminar.addEventListener("click", e => {
            const id = (e.target as HTMLButtonElement).getAttribute("data-id");
            //La ínea de abajo daba error si id estaba sin "!". Esto es porque
            //había una posibilidad de que id fuera null, pero al ponerle el "!"
            //nosotros avisamos que no hay posibilidad de que eso suceda.
            expenses.remove(parseInt(id!));

            render();
        })
    })
}

function $ (selector:string):HTMLElement {
    return document.querySelector(selector) as HTMLElement;
}

function $$ (selector:string):NodeListOf<HTMLElement> {
    return document.querySelectorAll(selector) as NodeListOf<HTMLElement>
}