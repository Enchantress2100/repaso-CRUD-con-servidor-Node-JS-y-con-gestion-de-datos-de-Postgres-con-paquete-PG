const http = require('http')
const fs = require('fs')
const url=require("url")

const { insertar, consultar, editar, eliminar }= require('./consultas')

http.createServer(async (req, res) => {
    if (req.url == "/" && req.method === "GET") {
        res.setHeader("content-type", "text/html");
        const html = fs.readFileSync("index.html", "utf-8")
        res.end(html)
    }

//ruta post que permitira "create" en el gimnasio
    if (req.url == "/ejercicios" && req.method=="POST") {
        let body = " ";
        req.on("data", (chunk) => {
            body +=chunk
        })
        req.on("end", async () => {
            const datos = Object.values(JSON.parse(body))
            const respuesta = await insertar(datos)
            res.end(JSON.stringify(respuesta)) //lo que retorne insertar
        })
    }

//ruta get que nos devuelva la funcion consultar
    if (req.url == "/ejercicios" && req.method == "GET") {
        const registros = await consultar() 
        res.end(JSON.stringify(registros))
    }
    
//ruta update que nos permita actualizar registros
    if (req.url == "/ejercicios" && req.method == "PUT") {
        let body = "";
        req.on("data", (chunk) => {
            body+=chunk
        })
        req.on("end", async () => {
            const datos = Object.values(JSON.parse(body))
            const respuesta = await editar(datos)
            res.end(JSON.stringify(respuesta))
        })
}
//ruta delete que nos permita borrar registros
    if (req.url.startsWith("/ejercicios?") && req.method == "DELETE") { //se pone ? porque se espera recibir la pagina por query strings
        const { nombre } = url.parse(req.url, true).query
        const respuesta = await eliminar(nombre)
        res.end(JSON.stringify(respuesta))
}
    
}).listen(3000, ()=>console.log('server ON and working OK'))