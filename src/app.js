// lado del servidor

// importacion de modulos
const express = require("express");
const expHbs = require("express-handlebars");
const socket = require("socket.io");

const app = express();
const PORT = 8080;

// middlewares
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
app.get("/", (req,res) => {
    //.send("Holi"); (veremos Holi en el navegador)
    res.render("index"); //(veremos chat con websockets(h1) en el navegador)
})

// handlebars
app.engine("handlebars", expHbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// ref al server
const httpServer = app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
})

// instancia de socket.io (del lado del servidor)
const io = new socket.Server(httpServer);

// guardamos los mensajes en la memoria volátil
let messages = [];

// establecemos la conexión
io.on("connection", (socket) => {
    console.log("New user connected.");

    socket.on("message", data => {
        messages.push(data); // enviamos el mensaje al array

        // una vez guardado el mensaje en el array messages[], se lo volvemos a enviar al cliente, que este lo debe renderizar en pantalla
        io.emit("messagesLogs", messages);
    })
})
