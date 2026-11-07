import basketCard from "./cart.js"
import { data_from_locale_storige } from "./main.js";



const product_cards = document.getElementById("product_cards");


export let my_bascket = JSON.parse(localStorage.getItem("my_bascket")) || [];
const btn_close_product = document.getElementById("btn_close_product");


export function cardProducts(product){
    if(product_cards){
        product_cards.innerHTML = "";
    }
    product.forEach(element => {
        // console.log(element.name)
        const articale = document.createElement("article");
        articale.dataset.id = element.id;
        articale.classList = "flex flex-col w-full h-fit shadow-2xl bg-gray-200 rounded-2xl overflow-hidden p-6 border border-gray-300";
                articale.innerHTML = `<img class="w-full h-[50%] rounded-lg" src="${element.image}" alt="">
                    <div class="flex flex-col gap-1.5 h-[25%]">
                        <h3 class=" font-bold w-full text-lg truncate">${element.name}</h3>
                        <p class="text-gray-500 truncate">${element.category}</p>
                    </div>
                    <div class="flex justify-between">
                        <p class="font-bold text-red-600 text-lg">${element.price} DH</p>
                        <p class="w-fit px-3.5 py-1 bg-gray-100 rounded-lg text-gray-500 border border-gray-300">${element.details}</p>
                    </div>
                
                    <div class="w-full flex flex-col items-center">
                        <p class="font-bold text-green-700">By drive or delivery</p>
                        <Button id="add_btn" class="w-fit px-8 py-2 bg-red-600 hover:bg-red-400 rounded-2xl text-gray-100 font-bold">Add to</Button>
                    </div>
                `
        product_cards?.append(articale)
        articale.addEventListener("click", (e)=>{   
            // console.log(e.currentTarget.dataset.id);
            const btn_id = e.target.id;
            const card_id = Number(e.currentTarget.dataset.id);
            if(btn_id === "add_btn"){
                const existe = my_bascket.find(prod=> prod.id===card_id);
                if(existe){
                    alert("The product allredy added !!.")
                } else {
                    const find_in_product = product.find(pro=> pro.id===card_id);
                    find_in_product.quantity +=1;
                    my_bascket.push(find_in_product)
                    basketCard(my_bascket);
                    localStorage.setItem("my_bascket", JSON.stringify(my_bascket));
                }
            }
        })
    });

}



const dashboardTable = document.getElementById("dashboard_products_list");






export function renderDashboard(products) {
    console.log("Admin test");
    
    dashboardTable.innerHTML = "";
    products.forEach(product => {
        const tr = document.createElement("tr");
        tr.dataset.id = product.id;
        tr.classList = "hover:bg-gray-50 transition";
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
        tr.addEventListener("click", (e) => {
            const card_id = e.currentTarget.dataset.id;
            const index = data_from_locale_storige.findIndex(item => item.id == card_id);
            
            if (index !== -1) {
                if (e.target.id === "remove_btn") {
                    const isConfirmed = confirm("Are you sure you wanna remove the product?");
                    
                    if (isConfirmed) {
                        data_from_locale_storige.splice(index, 1);
                        localStorage.setItem("data_from_locale_storige", JSON.stringify(data_from_locale_storige));

                        renderDashboard();
                    }
                }
                
                if (e.target.id === "edite_btn" || e.target.id === "edit_btn") {
                    const product = data_from_locale_storige[index];

                    document.getElementById("name").value = product.name || "";
                    document.getElementById("category").value = product.category || "";
                    document.getElementById("price").value = product.price || "";
                    document.getElementById("details").value = product.details || "";
                    document.getElementById("image").value = product.image || "";

                    const admin_edite_popup = document.getElementById("admin_edite_popup");
                    if(admin_edite_popup) {
                        admin_edite_popup.classList.remove("hidden");
                    }
                    
                }
            }
        });
        btn_close_product.addEventListener("click", (e)=>{
            // admin_edite_popup.classList.add("hidden");
            console.log("text");
            
        })
    });
}

