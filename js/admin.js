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

// Toast Notification Helper Function
function showToast(message, type = "success") {
    let toast = document.getElementById("toast-notification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-notification";
        toast.className = "fixed bottom-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold transition-all duration-300 opacity-0 translate-y-2 pointer-events-none";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.backgroundColor = type === "success" ? "#16a34a" : "#dc2626"; // Green for success, Red for error
    
    // Show toast
    toast.classList.remove("opacity-0", "translate-y-2");
    toast.classList.add("opacity-100", "translate-y-0");

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove("opacity-100", "translate-y-0");
        toast.classList.add("opacity-0", "translate-y-2");
    }, 3000);
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
const admin_edite_popup = document.getElementById("admin_edite_popup");
const btn_add_product = document.getElementById("btn_add_product");
const btn_close_product = document.getElementById("btn_close_product");
const btn_close_edite_product = document.getElementById("btn_close_edite_product");

btn_add_product?.addEventListener("click", () => {
    const addForm = document.getElementById("addProductForm");
    if(addForm) addForm.reset();
    admin_popup?.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
});

admin_popup?.addEventListener("click", (e) => {        
    if (e.target === btn_close_product || e.target === admin_popup) {
        admin_popup.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
    }
});

btn_close_edite_product?.addEventListener("click", () => {
    admin_edite_popup?.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
});

admin_edite_popup?.addEventListener("click", (e) => {
    if (e.target === admin_edite_popup) {
        admin_edite_popup.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
    }
});

const addProductForm = document.getElementById("addProductForm");
addProductForm?.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value.trim();
    const price = document.getElementById("price").value.trim();
    const details = document.getElementById("details").value.trim();
    const image = document.getElementById("image").value.trim();

    if (!name || !category || !price) {
        showToast("Please fill in all required fields (Name, Category, Price).", "error");
        return;
    }

    data_from_locale_storige.push({
        id: data_from_locale_storige.length > 0 ? Number(data_from_locale_storige[data_from_locale_storige.length - 1].id) + 1 : 1,
        name,
        category,
        price,
        details,
        quantity: 0,
        image
    });
    
    localStorage.setItem("data_from_locale_storige", JSON.stringify(data_from_locale_storige));

    addProductForm.reset();
    admin_popup?.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    render();
    
    showToast("Product added successfully!");
});

document.querySelectorAll("form").forEach(form => {
    form.addEventListener('submit', (event) => {
        const editId = form.dataset.editId || document.getElementById("editeProductForm")?.dataset.editId;
        
        if (editId && form.id !== "addProductForm") {
            event.preventDefault();
            
            const name = document.getElementById("name_edite").value.trim();
            const category = document.getElementById("category_edite").value.trim();
            const price = document.getElementById("price_edite").value.trim();
            const details = document.getElementById("details_edite").value.trim();
            const image = document.getElementById("image_edite").value.trim();

            if (!name || !category || !price) {
                showToast("Please fill in all required fields before saving.", "error");
                return;
            }
            
            const index = data_from_locale_storige.findIndex(item => item.id == editId);

            if (index !== -1) {
                data_from_locale_storige[index] = {
                    ...data_from_locale_storige[index],
                    name,
                    category,
                    price,
                    details,
                    image
                };

                localStorage.setItem("data_from_locale_storige", JSON.stringify(data_from_locale_storige));
                
                admin_edite_popup?.classList.add("hidden");
                document.body.classList.remove("overflow-hidden");
                render();

                showToast("Product updated successfully!");
            } else {
                showToast("Error: Product could not be found.", "error");
            }
        }
    });
});

document.addEventListener("click", (e) => {
    const tr = e.target.closest("tr");
    if (!tr) return;
    
    const card_id = tr.dataset.id;
    const index = data_from_locale_storige.findIndex(item => item.id == card_id);
    
    if (index !== -1) {
        if (e.target.id === "remove_btn" || e.target.closest("#remove_btn")) {
            const isConfirmed = confirm("Are you sure you wanna remove the product?");
            if (isConfirmed) {
                data_from_locale_storige.splice(index, 1);
                localStorage.setItem("data_from_locale_storige", JSON.stringify(data_from_locale_storige));
                render(); 
                showToast("Product removed successfully!");
            }
        }
        
        if (e.target.id === "edite_btn" || e.target.closest("#edite_btn")) {
            const product = data_from_locale_storige[index];
            
            if (admin_edite_popup) {
                admin_edite_popup.classList.remove("hidden");
                document.body.classList.add("overflow-hidden");
            }
            
            const editeForm = document.getElementById("editeProductForm") || admin_edite_popup?.querySelector("form");
            if (editeForm) {
                editeForm.dataset.editId = product.id;
            }
            if (admin_edite_popup) {
                admin_edite_popup.dataset.editId = product.id;
            }
            
            document.getElementById("name_edite").value = product.name || "";
            document.getElementById("category_edite").value = product.category || "";
            document.getElementById("price_edite").value = product.price || "";
            document.getElementById("details_edite").value = product.details || "";
            document.getElementById("image_edite").value = product.image || "";
        }
    }
});