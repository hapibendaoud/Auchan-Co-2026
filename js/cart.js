import { my_bascket } from "./products.js";


const basket_div = document.getElementById("basket_div");





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
                    <p class="text-gray-500 truncate">${element.description}</p>
                </div>
                <div class="w-full col-span-2 flex flex-col justify-center items-end gap-3">
                    <div class="flex items-center gap-2 text-green-800 bg-green-200 rounded-2xl px-3 ">
                        <h2 class="text-lg font-bold">test</h2>
                        <p>testttt</p>
                    </div>
                    <p class="text-lg text-red-600 font-bold"><span>${element.price}</span>DH</p>
                    <div class="flex gap-1 ">
                        <Button type="Button" id="remove_btn" class="w-12 h-8 flex items-center justify-center rounded-2xl bg-gray-800 cursor-pointer">
                            <img class="w-auto h-4 pointer-events-none" src="icons/trash-can.png" alt="icon">
                        </Button>
                        <p class="border border-gray-400 flex items-center justify-center px-3 rounded-lg">0</p>
                        <div id="plus_btn" class="flex justify-center items-center w-12 h-8 pb-1.5 text-red-600 rounded-2xl bg-gray-100 border border-gray-400 text-2xl cursor-pointer font-bold">+</div>
                    </div>
                </div>`
        basket_div.append(articale);
        articale.addEventListener("click", (e)=>{ 
            const removeBtn = e.target.closest("#remove_btn"); 
            if(removeBtn){
                console.log(e.target.id)
                // console.log(e.currentTarget);
                const card_id = e.currentTarget.dataset.id;
                // my_bascket.splice()
            //     console.log(my_bascket[card_id-1])
                // console.log(my_bascket);
                // my_bascket.splice(card_id-1, 1);
                // console.log(my_bascket);
                basketCard(my_bascket)
            }
            

        })
    });
    
}