import exportData from "./storage.js";
import { renderDashboard } from "./products.js";

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
checkForData();
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
    }
}

