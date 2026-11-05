import { my_bascket } from "./products.js";


const basket_div = document.getElementById("basket_div");
const bascket_quantity = document.getElementById("bascket_quantity");
const product_montant = document.getElementById("product_montant");
let Montant = 0;
    function totalPrice(){
        Montant = 0;
        bascket_quantity.textContent = my_bascket.length;
        my_bascket.forEach((ele)=>{
            Montant = Montant + (ele.price * ele.quantity);
        })
        product_montant.textContent = Montant;
    }



export default function basketCard(myProduct){
    basket_div.innerHTML = "";
    myProduct.forEach(element => {
        const articale = document.createElement("article");
        articale.dataset.id = element.id;
        articale.classList = "basket_cards w-full grid grid-cols-4 bg-gray-200 rounded-lg p-3";
        articale.innerHTML = `
                <img class="w-auto h-30 rounded-sm" src="${element.image}" alt="">
                <div class="flex flex-col pl-3">
                    <h2 class="text-lg font-bold">${element.name}</h2>
                    <p class="text-gray-500 truncate">${element.category}</p>
                </div>
                <div class="w-full col-span-2 flex flex-col justify-center items-end gap-3">
                    <div class="flex items-center gap-2 text-green-800 bg-green-200 rounded-2xl px-3 ">
                        <h2 class="text-lg font-bold">test</h2>
                        <p>testttt</p>
                    </div>
                    <p class="text-lg text-red-600 font-bold"><span>${element.price*element.quantity}</span>DH</p>
                    <div class="flex gap-1 ">
                        ${element.quantity <= 1? `
                            <Button type="Button" id="remove_btn" class="w-12 h-8 flex items-center justify-center rounded-2xl bg-gray-800 cursor-pointer">
                                <img class="w-auto h-4 pointer-events-none" src="icons/trash-can.png" alt="icon">
                            </Button>` : `
                            <Button type="Button" id="minus_btn" class="w-12 h-8 flex items-center justify-center rounded-2xl bg-gray-800 cursor-pointer">
                                <div class="flex items-center justify-center text-2xl font-extrabold text-white">-</div>
                            </Button>`}
                        <p class="border border-gray-400 flex items-center justify-center px-3 rounded-lg">${element.quantity}</p>
                        <div id="add_quantity" class="flex justify-center items-center w-12 h-8 pb-1.5 text-red-600 rounded-2xl bg-gray-100 border border-gray-400 text-2xl cursor-pointer font-bold">+</div>
                    </div>
                </div>`
        basket_div.append(articale);
        articale.addEventListener("click", (e)=>{ 
            const removeBtn = e.target.closest("#remove_btn"); 
            if(removeBtn){
                const card_id = Number(e.currentTarget.dataset.id);
                const index = my_bascket.findIndex(item => item.id === card_id);
                if(index !== -1){
                    my_bascket.splice(index, 1);
                    localStorage.setItem("my_bascket", JSON.stringify(my_bascket));
                    basketCard(my_bascket);
                }
            }
            const add_quantity = e.target.closest("#add_quantity");
            if(add_quantity){
                element.quantity += 1;
                localStorage.setItem("my_bascket", JSON.stringify(my_bascket));
                basketCard(my_bascket);
            }
            const minus_btn = e.target.closest("#minus_btn");
            if(minus_btn){
                element.quantity -= 1;
                localStorage.setItem("my_bascket", JSON.stringify(my_bascket));
                basketCard(my_bascket);
            }
        })
    });
    

    totalPrice()
}