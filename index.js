

const {createServer} = require("http");

const fs =require("fs");

const contentType = (extension)=>{

    switch(extension){
        case "html" :return "text/html";
        case "css" :return "text/css";
        case "js" :return "text/javascript";
        case "jpg" :return "text/jpeg";
        case "png" :return "text/png";
        case "json" :return "application/json";
        default:return "text/plain";


    }
}



const servirFichero =(respuesta,ruta,tipo,status)=>{

    respuesta.writeHead(status, {"Content-type" : tipo})
    
    let fichero = fs.createReadStream(ruta);

    fichero.pipe(respuesta);

    fichero.on("end" , ()=>{

        respuesta.end()

    });


}

const servidor =createServer((peticion,respuesta)=>{

    if(peticion.url=="/"){

        servirFichero(respuesta,"./Ficheros_estaticos/index.html","text/html",200)
    }else{
        let ruta ="./Ficheros_estaticos" + peticion.url;
        fs.stat(ruta,(error,datos)=>{
            if(!error && datos.isFile()){
                return servirFichero(respuesta,ruta,contentType(ruta.split(".").pop()),200)
            }
            servirFichero(respuesta,"404.html","text/html",404)
        });
        
    }
});

servidor.listen(process.env.PORT || 3000);