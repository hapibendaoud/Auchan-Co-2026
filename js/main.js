import { cardProducts , my_bascket } from "./products.js";
import exportData from "./storage.js";
import basketCard from "./cart.js";

// let my_bascket = [
//     {
//         id: 10,
//         name: "Comtes de Provence Apricots",
//         description: "Organic apricot jam 65% fruits, cooked in a cauldron with cane sugar, less sweet[cite: 11]",
//         price: 55,
//         details: "No Weight",
//         image: "img/download (10).webp",
//     }
// ]

const pagination = document.querySelector(".pagination");
const itemsPerPage = 10; 
let currentPage = 1;
let currentFilter = "";

function checkForData() {
    const data = exportData(); 
    if (data === null || data === undefined) {
        setTimeout(checkForData, 50);
    } else {
        // console.log("products: ", data);

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
        });
        close_popup.addEventListener("click", (e)=>{
            basket_popup.classList.add("hidden");
        })






























    }
}

checkForData();





// const basket_cards = document.querySelectorAll(".basket_cards");
// basket_cards.addEventListener("click", (e)=>{

// })















