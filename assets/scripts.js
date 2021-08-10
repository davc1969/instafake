


//Captura de evento del formulario para obtener el submit conla información
document.getElementById("formUserInput").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const userEmail    = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("userPassword").value;
    console.log("Submit: ", userEmail, userPassword);
})