import { cardProducts , my_bascket } from "./products.js";
import exportData from "./storage.js";
import basketCard from "./cart.js";



const pagination = document.querySelector(".pagination");
const category_div = document.getElementById("category");
const filterInput = document.getElementById("filterInput");
const category_array = [];
const itemsPerPage = 10; 
let currentPage = 1;
let currentFilter = "";

function checkForData() {
    const data = exportData(); 
    if (data === null || data === undefined) {
        setTimeout(checkForData, 50);
    } else {
        filterInput?.addEventListener('input', e => {
            currentFilter = e.target.value.toLowerCase();
            currentPage = 1;
            render();
        });
        function render() {
            const filtered = data.filter(p => {
                const productName = p.name || p.title || "";
                return productName.toLowerCase().includes(currentFilter);
            });

            const start = (currentPage - 1) * itemsPerPage;
            const pageItems = filtered.slice(start, start + itemsPerPage);

            cardProducts(pageItems);

            pagination.innerHTML = '';
            const pages = Math.ceil(filtered.length / itemsPerPage);
            
            for (let i = 1; i <= pages; i++) {
                const btn = document.createElement('button');
                btn.textContent = i;
                btn.className = `px-4 py-2 border rounded-lg ${i === currentPage ? 'bg-red-600 text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-100'}`;
                
                if (i === currentPage) {
                    btn.disabled = true;
                }
                
                btn.addEventListener('click', () => { 
                    currentPage = i; 
                    render(); 
                });
                pagination.appendChild(btn);
            }
        }
        
        render();
        basketCard(my_bascket);

        const basket_btn = document.getElementById("basket_btn");
        const basket_popup = document.getElementById("basket_popup");
        const close_popup = document.getElementById("close_popup");
        basket_btn.addEventListener("click", (e)=>{
            basket_popup.classList.remove("hidden");
            document.body.classList.add("overflow-hidden");
        });
        basket_popup.addEventListener("click", (e) => {
            if (e.target === basket_popup || e.target === close_popup) {
                basket_popup.classList.add("hidden");
                document.body.classList.remove("overflow-hidden");
            }
        });
        data.forEach(element => {
            if (!category_array.includes(element.category)) {
                category_array.push(element.category);
            }
        });
        category_array.forEach(element => {
            category_div.innerHTML += `<p class="w-fit px-4 py-1.5 bg-gray-100 rounded-2xl text-gray-500 cursor-pointer">${element}</p>`;
        });





























    }
}

checkForData();





// const basket_cards = document.querySelectorAll(".basket_cards");
// basket_cards.addEventListener("click", (e)=>{

// })















