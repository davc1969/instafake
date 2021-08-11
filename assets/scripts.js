
//Función para buscar el usaurio en la base de datos
const getUserToken = async (email, password) => {
    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            body: JSON.stringify({ email: email, password: password }),
        });
        const { token } = await response.json();
        console.log("getUserToken: ", token);
        localStorage.setItem('jwt-token',token);
        return token;
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}

// Funcion para conectarse a la base de datos de fotos
const getPhotos = async (jwt) => {
    try {
        const response = await fetch('http://localhost:3000/api/photos',
            {
                method:'GET',
                headers: {
                Authorization: `Bearer ${jwt}`
                }
            })
            const {data} = await response.json()
            console.log(data);
            if (data) {
                console.log("getPhoto: ", data);
                fillTable(data,"photoGrid")
                // toggleFormAndTable('js-form-wrapper','js-table-wrapper')
            }
    } 
    catch (err) {
        localStorage.clear()
        console.error(`Error: ${err}`)
    }
}


// <div class="card" style="width: 600px;">
// <img class="card-img-top" src="https://picsum.photos/id/0/5616/3744" alt="">
// <p class="card-text" style="margin: auto;">Alejandro Escamilla</p>
// <div>
  
// </div>
// </div>

const fillTable = (data, table) => {
    let rows = "";
    console.log("fillTable: ", data, table);
    
    for(i = 0; i < 10; i++){
        let row = data[i];
        console.log("dillTable each: ", row.download_url, row.author);
        rows += `<div class="card d-block my-5 px-0 mx-0" style="border:1px solid lightblue">
                    <img class="card-img-top" src="${row.download_url}" alt=" " style="margin-inline: auto;">
                    <p class="card-text" style="margin: auto;">${row.author}</p>
                </div>`;
    };
    $(`#${table}`).append(rows);
    }


    // $.each(data, (i, row) => {
    //     console.log("dillTable each: ", row.download_url, row.author);
    //     rows += `<div class="card" style="width: 600px;">
    //                 <img class="card-img-top" src="${row.download_url}" alt="">
    //                 <p class="card-text" style="margin: auto;">${row.author}</p>
    //             </div>`;
    // });
    // $(`#${table}`).append(rows);
//};

//Captura de evento del formulario para obtener el submit con la información
document.getElementById("formUserInput").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const userEmail    = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("userPassword").value;
    console.log("Submit: ", userEmail, userPassword);

    //Enviar esa información al procecdimiento donde se busca el usuario en la BD
    const JWT = await getUserToken(userEmail, userPassword);
    console.log("Submit: ", JWT);

    getPhotos(JWT);
})