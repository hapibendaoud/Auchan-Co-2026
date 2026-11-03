let products = null;


export default function exportData(){
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            // return products;
        })
        .catch(error => {
            console.error('Error while loading data:', error)
        });
        return products;
}





