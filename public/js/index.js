"use strict";
//Formas de CASTEAR: Asignar un tipo a una variable.
var bAdd = document.querySelector("#bAdd");
var inputTitle = document.querySelector("#title");
var inputCost = document.querySelector("#cost");
var inputCurrency = document.querySelector("#currency");
//Este archivo "sabe" de expenses.ts porque los dos fueron citados en index.html
var expenses = new Expenses("USD");
render();
// "?" si no estás seguro de que el elemento existe. "!" si estás seguro
bAdd === null || bAdd === void 0 ? void 0 : bAdd.addEventListener("click", function (e) {
    if (inputTitle.value !== "" && inputCost.value !== "" && !isNaN(parseFloat(inputCost.value))) {
        var title = inputTitle.value;
        var cost = parseFloat(inputCost.value);
        var currency = inputCurrency.value;
        expenses.add({ title: title, cost: { number: cost, currency: currency } });
        render();
    }
    else {
        alert("Completa los datos correctamente");
    }
});
function render() {
    var html = "";
    expenses.getItems().forEach(function (item) {
        var id = item.id, title = item.title, cost = item.cost;
        var number = cost.number, currency = cost.currency;
        html += "\n        <div class=\"item\">\n            <div><span class=\"currency\">" + currency + "</span>" + number + "</div>\n            <div>" + title + "</div>\n            <div><button class=\"bEliminar\" data-id=\"" + id + "\">Eliminar</button></div>\n        </div>\n        ";
    });
    $("#items").innerHTML = html;
    $("#display").textContent = expenses.getTotal();
    $$(".bEliminar").forEach(function (bEliminar) {
        bEliminar.addEventListener("click", function (e) {
            var id = e.target.getAttribute("data-id");
            //La ínea de abajo daba error si id estaba sin "!". Esto es porque
            //había una posibilidad de que id fuera null, pero al ponerle el "!"
            //nosotros avisamos que no hay posibilidad de que eso suceda.
            expenses.remove(parseInt(id));
            render();
        });
    });
}
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
