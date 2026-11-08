import basketCard from "./cart.js";
import { data_from_locale_storige } from "./main.js";
import { getCurrentViewMode } from "./ui.js";

const product_cards = document.getElementById("product_cards");
const dashboardTable = document.getElementById("dashboard_products_list");

export let my_bascket = JSON.parse(localStorage.getItem("my_bascket")) || [];

export function cardProducts(product) {
    if (!product_cards) return;
    
    const isList = getCurrentViewMode() === "list";

    // Set container layout based on view mode
    product_cards.className = isList 
        ? "w-full h-fit flex flex-col gap-4 py-6"
        : "w-full h-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8 py-6";

    product_cards.innerHTML = "";

    product.forEach(element => {
        const articale = document.createElement("article");
        articale.dataset.id = element.id;
        
        articale.className = isList 
            ? "bg-white rounded-xl shadow p-4 border border-gray-200 flex flex-row items-center justify-between gap-6 w-full"
            : "flex flex-col w-full h-fit shadow-2xl bg-gray-200 rounded-2xl overflow-hidden p-6 border border-gray-300 gap-3";

        articale.innerHTML = isList ? `
            <img class="w-24 h-24 object-contain rounded-lg shrink-0 bg-white" src="${element.image}" alt="${element.name}">
            <div class="flex-1">
                <h3 class="font-bold text-lg text-gray-800 truncate">${element.name}</h3>
                <p class="text-sm text-gray-500">${element.category}</p>
                <p class="text-xs text-gray-400 mt-1">${element.details || ''}</p>
            </div>
            <div class="flex items-center gap-6 shrink-0">
                <span class="text-xl font-extrabold text-red-600">${element.price} DH</span>
                <button id="add_btn" class="px-6 py-2 bg-red-600 hover:bg-red-400 rounded-2xl text-gray-100 font-bold">Add to</button>
            </div>
        ` : `
            <img class="w-full h-48 object-contain rounded-lg bg-white" src="${element.image}" alt="${element.name}">
            <div class="flex flex-col gap-1.5">
                <h3 class="font-bold w-full text-lg truncate">${element.name}</h3>
                <p class="text-gray-500 truncate text-sm">${element.category}</p>
            </div>
            <div class="flex justify-between items-center">
                <p class="font-bold text-red-600 text-lg">${element.price} DH</p>
                <p class="w-fit px-3.5 py-1 bg-gray-100 rounded-lg text-gray-500 border border-gray-300 text-xs">${element.details}</p>
            </div>
            <div class="w-full flex flex-col items-center mt-2">
                <p class="font-bold text-green-700 text-xs mb-2">By drive or delivery</p>
                <button id="add_btn" class="w-fit px-8 py-2 bg-red-600 hover:bg-red-400 rounded-2xl text-gray-100 font-bold">Add to</button>
            </div>
        `;

        product_cards.appendChild(articale);

        articale.addEventListener("click", (e) => {   
            const btn_id = e.target.id;
            const card_id = Number(e.currentTarget.dataset.id);
            if(btn_id === "add_btn"){
                const existe = my_bascket.find(prod => prod.id === card_id);
                if(existe){
                    alert("The product already added !!.");
                } else {
                    const find_in_product = product.find(pro => pro.id === card_id);
                    if(find_in_product) {
                        find_in_product.quantity = (find_in_product.quantity || 0) + 1;
                        my_bascket.push(find_in_product);
                        basketCard(my_bascket);
                        localStorage.setItem("my_bascket", JSON.stringify(my_bascket));
                    }
                }
            }
        });
    });
}

export function renderDashboard(products) {
    if (!dashboardTable) return;
    dashboardTable.innerHTML = "";
    products.forEach(product => {
        const tr = document.createElement("tr");
        tr.dataset.id = product.id;
        tr.className = "hover:bg-gray-50 transition";
        tr.innerHTML = `
                <td class="py-4 px-6 flex items-center gap-4">
                    <img class="w-12 h-12 object-cover rounded-lg border" src="${product.image}" alt="">
                    <div>
                        <h4 class="font-bold text-gray-800">${product.name}</h4>
                        <p class="text-xs text-gray-400">ID: ${product.id}</p>
                    </div>
                </td>
                <td class="py-4 px-6">
                    <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">${product.category}</span>
                </td>
                <td class="py-4 px-6 font-bold text-red-600">${product.price} DH</td>
                <td class="py-4 px-6 text-sm text-gray-500">${product.details}</td>
                <td class="py-4 px-6 text-center">
                    <div class="flex justify-center gap-2">
                        <button id="edite_btn" class="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-semibold">Edit</button>
                        <button id="remove_btn" class="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-semibold">Delete</button>
                    </div>
                </td>
        `;
        dashboardTable.append(tr);
    });
}