import basketCard from "./cart.js"



const product_cards = document.getElementById("product_cards");

// export let my_bascket = [
//     {
//         id: 6,
//         name: "Charles Vignon Protein Chocolate Muesli",
//         price: 65,
//         description: "Organic and gourmet crunchy chocolate muesli, French oats, 19% protein",
//         details: "350g",
//         image: "img/download (6).webp",
//         quantity: 0
//     }
// ]

export let my_bascket = JSON.parse(localStorage.getItem("my_bascket")) || [];



export function cardProducts(product){
    product_cards.innerHTML = "";
    product.forEach(element => {
        // console.log(element.name)
        const articale = document.createElement("article");
        articale.dataset.id = element.id;
        articale.classList = "flex flex-col w-full h-120 shadow-2xl bg-gray-200 rounded-2xl overflow-hidden p-6 border border-gray-300";
                articale.innerHTML = `<img class="w-full h-[50%] rounded-lg" src="${element.image}" alt="">
                <div class="h-[25%]">
                    
                    <div class="flex flex-col gap-1.5 ">
                        <h3 class=" font-bold w-full">${element.name}</h3>
                        <p class="font-bold text-red-600 text-lg">${element.price} DH</p>
                    </div>
                </div>
                <p class="w-fit px-3.5 py-1 bg-gray-100 rounded-lg text-gray-500 border border-gray-300">${element.quantity}</p>
                <div class="">
                    <div class="w-full flex flex-col items-center">
                        <p class="font-bold text-green-700">By drive or delivery</p>
                        <Button id="add_btn" class="w-fit px-8 py-2 bg-red-600 hover:bg-red-400 rounded-2xl text-gray-100 font-bold">Add to</Button>
                    </div>
                </div>`
        product_cards.append(articale)
        articale.addEventListener("click", (e)=>{   
            console.log(e.currentTarget.dataset.id);
            const btn_id = e.target.id;
            const card_id = Number(e.currentTarget.dataset.id);
            if(btn_id === "add_btn"){
                const existe = my_bascket.find(prod=> prod.id===card_id);
                if(existe){
                    existe.quantity += 1;
                    basketCard(my_bascket);
                    console.log("exist")
                    localStorage.setItem("my_bascket", JSON.stringify(my_bascket));
                } else {
                    const find_in_product = product.find(pro=> pro.id===card_id);
                    find_in_product.quantity +=1;
                    my_bascket.push(find_in_product)
                    console.log(my_bascket)
                    basketCard(my_bascket);
                    localStorage.setItem("my_bascket", JSON.stringify(my_bascket));
                }
            }
        })
    });

}


