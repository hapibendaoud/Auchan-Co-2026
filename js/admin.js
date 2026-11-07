// import exportData from "./storage.js";
import { renderDashboard } from "./products.js";
import { data_from_locale_storige } from "./main.js";


const filterInput = document.getElementById("filterInput");
const pagination = document.querySelector(".pagination") || createPaginationContainer(); 

const itemsPerPage = 8;
let currentPage = 1;
let currentFilter = "";


function createPaginationContainer() {
    const pagDiv = document.createElement("div");
    pagDiv.className = "pagination flex justify-center items-center gap-2 py-8";
    document.querySelector("main").appendChild(pagDiv);
    return pagDiv;
}

filterInput?.addEventListener('input', e => {
    currentFilter = e.target.value.toLowerCase();
    currentPage = 1;
    render();
});

function render() {
    const filtered = data_from_locale_storige.filter(p => {
        const productName = p.name || p.title || "";
        return productName.toLowerCase().includes(currentFilter);
    });

    const start = (currentPage - 1) * itemsPerPage;
    const pageItems = filtered.slice(start, start + itemsPerPage);

    renderDashboard(pageItems);

    pagination.innerHTML = '';
    const pages = Math.ceil(filtered.length / itemsPerPage);
    
    for (let i = 1; i <= pages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = `px-4 py-2 border rounded-lg text-sm font-semibold ${i === currentPage ? 'bg-red-600 text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-100'}`;
        
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

const admin_popup = document.getElementById("admin_popup");
const btn_add_product = document.getElementById("btn_add_product");
const btn_close_product = document.getElementById("btn_close_product");
btn_add_product.addEventListener("click", (e)=>{
    admin_popup.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
});
admin_popup.addEventListener("click", (e) => {        
if (e.target === btn_close_product || e.target === admin_popup) {
    admin_popup.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}
});

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const details = document.getElementById("details").value;
    const image = document.getElementById("image").value;

    data_from_locale_storige.push({
        id: data_from_locale_storige.length > 0 ? data_from_locale_storige[data_from_locale_storige.length - 1].id + 1 : 1,
        name: name,
        category: category,
        price: price,
        details: details,
        quantity: 0,
        image: image
    });
    console.log(data_from_locale_storige);
    
    localStorage.setItem("data_from_locale_storige", JSON.stringify(data_from_locale_storige));

    form.reset();
    if (admin_popup) {
        admin_popup.classList.add("hidden");
    }

    render();
});


