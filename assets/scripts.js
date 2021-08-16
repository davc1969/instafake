let imagesPage = 1 //Constante usada para paginación, dice cuantas imágenes se cargan por página


//Función para buscar el usaurio en la base de datos, devuelve el token encontrado si el usuario está en la BD
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
const getPhotos = async (jwt, pageNumber) => {
    try {
        const response = await fetch(`http://localhost:3000/api/photos?page=${pageNumber}`,
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

//FUncion para publicar las fotos en el html.  Se usan tarjetas tipo bootstrap cards
const fillTable = (data, table) => {
    let rows = "";
    console.log("fillTable: ", data, table);

    data.forEach(row => {

        console.log("dillTable each: ", row.download_url, row.author);
        rows += `<div class="card d-block my-5 px-0 mx-0" style="border:1px solid lightblue">
                    <img class="card-img-top" src="${row.download_url}" alt=" " style="margin-inline: auto;">
                    <div >
                        <p class="card-text" style="margin: auto;">${row.author}</p>
                        <div style="font-size:150%; color:black">
                            <i class="far fa-heart" title="Me gusta" style="cursor: pointer;" onclick="actionButton(0)"></i>
                            <i class="far fa-share-square mx-5" title="Compartir" style="cursor: pointer;" onclick="actionButton(1)"></i>
                            <i class="far fa-bookmark" title="Guardar" style="cursor: pointer;" onclick="actionButton(2)"></i>
                        </div>
                    </div>
                </div>`;
    });
    $(`#${table}`).append(rows);
    }



//Captura de evento del formulario para obtener el submit con la información
document.getElementById("formUserInput").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const userEmail    = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("userPassword").value;
    console.log("Submit: ", userEmail, userPassword);

    //Enviar esa información al procecdimiento donde se busca el usuario en la BD
    const JWT = await getUserToken(userEmail, userPassword);
    console.log("Submit: ", JWT);

    if (JWT) {
        toggleFormsDivs('formUserInput', 'photoGrid', 'btnContainer1', 'btnContainer2');
        getPhotos(JWT, imagesPage);
    }
    
})


function actionButton(selection) {
// 0: Me Gusta
// 1: Enviar Publicación
// 2: Guardar Publicación

    const messagesBtn = [
        "Te gustó esta publicación",
        "Envíaste esta publicación a un amigo",
        "Guardaste esta publicación"
    ];

    alert(messagesBtn[selection]);
}


const toggleFormsDivs = (input, photos, button1, button2) => {
    $(`#${input}`).toggle();
    $(`#${photos}`).toggle();
    $(`#${button1}`).toggle();
    $(`#${button2}`).toggle();
}


document.getElementById("closeSession").addEventListener("click", event => {
    event.preventDefault;

    localStorage.clear;
    imagesPage = 1;
    location.reload();
})


document.getElementById("loadImages").addEventListener("click", event => {
    event.preventDefault;

    const JWT = localStorage.getItem("jwt-token")
    imagesPage++;
    console.log("loadImg ", imagesPage);
    if (imagesPage <= 10) {
        getPhotos(JWT, imagesPage);
    } else {
        alert("No hay mas fotos para cargar")
    }
})




