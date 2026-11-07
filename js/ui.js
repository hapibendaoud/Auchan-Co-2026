import fs from 'fs';


export async function editLocalFile() {
    const data = fs.readFileSync('data.json', 'utf8');
    const jsonObject = JSON.parse(data);
    jsonObject.forEach(element => {
        console.log(element)
    });
}


// fs.writeFileSync('data.json', JSON.stringify(jsonObject, null, 2));
