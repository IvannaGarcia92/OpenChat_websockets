// lado del cliente

// instancia de socket.io del lado del cliente
const socket = io();

// guardamos al usuario en una variable
let user;
const chatBox = document.getElementById("chatBox");

// sweet alert para el mensaje 
    // swal: objeto global que nos permite acceder a los métodos de la librería
    // fire: método que nos permite configurar el alerta

// identificación del usuario al ingresar (pide nombre para entrar a la sala)
Swal.fire({
    title: "Identify yourself",
    input: "text",
    text: "Enter your username to identify yourself in the chat",
    inputValidator: (value) => {
        return !value && "You need to enter a username to enter the chat room";
    },
    allowOutsideClick: false,
}).then( result => {
    user = result.value;
})

// enviamos mensajes al servidor
// evento cuando levantamos la tecla (teclado)
chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        if(chatBox.value.trim().length > 0 ) { // quitamos espacios " " al principio y al final (string)
            socket.emit("message", { user : user, message : chatBox.value }); // enviamos el mensaje al servidor
            chatBox.value = "";
        }
    }
})

// recibimos el mensaje desde el lado del servidor y lo renderizamos en pantalla
socket.on("messagesLogs", data => {
    const log = document.getElementById("messagesLogs"); //messagesLogs hace referencia a la etiqueta <p> que contiene los mensajes 

    let messages = ""; // en esta variable vamos a trabajar los datos del forEach
    data.forEach( message => {
        //messages = messages + `${message.user} : ${message.message} <br>`
        const bgColorClass = message.user === user ? 'bg-primary' : 'bg-secondary';
        messages += `<li class="list-group-item ${bgColorClass}">${message.user} : ${message.message}</li>`;
    });
    log.innerHTML = messages;
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

