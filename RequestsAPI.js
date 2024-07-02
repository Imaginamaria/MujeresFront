
// obtener url es una función que recibe una ruta y retorna la url completa de la ruta que se le pase.

 const obtenerUrl=(ruta) => `${RequestsAPI.urlBaseBackend}/${ruta}`;

 // headers es un objeto que contiene las cabeceras que se enviarán en las peticiones fetch.

 const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
 }


// token es una constante que contiene el token de la sesión que se obtiene del sessionStorage.
 const token = sessionStorage.getItem("session");

 // Si token existe, se añade al objeto headers la cabecera authorization con el valor del token.
 if(token){
    headers.authorization = token;
 }
// procesarRespuesta es una función que recibe una respuesta y retorna la respuesta en formato json. Si la respuesta contiene un error, se lanza una excepción con el mensaje de error.
const procesarRespuesta =(res)=>{
    return res.json().then((data)=>{
        if(data.error){
            throw new Error (data?.error)
        }

        return data
    })
}

const manejarErrores =(error = new Error("Error desconocido"))=>{
    console.error("Ha ocurrido un error:", error.message)
    throw error.message
}

// RequestsAPI es una clase que contiene las funciones que se encargan de realizar las peticiones fetch al backend de manera ordenada y centralizada.
export class RequestsAPI{

    static urlBaseBackend = "http://localhost:3000";

    // post /login



    static login(email, password){
        
        const body = JSON.stringify({email, password});

        return fetch (obtenerUrl("login"),{method: "POST", body, headers})
        .then(procesarRespuesta)
        .catch(manejarErrores)

    }

    
    // post /logout
    static logout() {
        return fetch(obtenerUrl("logout"), { method: "POST", headers })
        .then(procesarRespuesta)
        .catch(manejarErrores);
    }

    // post /registrar
    static register(body) {
        return fetch(obtenerUrl("registrar"), { method: "POST", body, headers })
        .then(procesarRespuesta)
        .catch(manejarErrores);
    }




    // get /usuario
    static getNoticias(opciones={}){
       // queryParams es un objeto que contiene los parámetros de la url, en este caso, los filtros de nombre y categoria.
       const queryParams = new URLSearchParams({});

        // nombre de noticia
       if (opciones.filtroTitulo) {
        queryParams.set("titulo", opciones.filtroTitulo);
      }

        // nombre de categoria deporte
      if (opciones.filtroCategoria) {
        queryParams.set("categoria", opciones.filtroCategoria);
      }

          // nombre de fecha deporte
          if (opciones.filtroFecha) {
            queryParams.set("fecha", opciones.filtroFecha);
          }
       
        return fetch(obtenerUrl("noticias?" + queryParams),{headers})
        .then(procesarRespuesta)
        .catch(manejarErrores)
    }

    
    // get /noticia/:idNoticia
    static getNoticia(idNoticia) {
        return fetch(obtenerUrl(`noticia/${idNoticia}`), { headers })
        .then(procesarRespuesta)
        .catch(manejarErrores);
    }

      // post /noticia
        static postNoticia(body) {
        return fetch(obtenerUrl("noticia"), { method: "POST", headers, body })
        .then(procesarRespuesta)
        .catch(manejarErrores);
  }

  
  // put /noticia/:idNoticia
  static putNoticia(idNoticia, categoria, titulo, subtitulo, urlimg, descripcion, textodestacado, fecha, autor) {
    // en este caso, recibo los datos (categoria, titulo, subtitulo, urlimg, descripcion, textodestacado, fecha, autor) como parametros y los convierto en un objeto body. Tambien podemos recibir un objeto body como parametro como en el caso de postNoticia.
    const body = JSON.stringify({ categoria, titulo, subtitulo, urlimg, descripcion, textodestacado, fecha, autor });
    return fetch(obtenerUrl(`noticia/${idNoticia}`), {
      method: "PUT",
      headers,
      body,
    })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }


  
    // delete /noticia/:idNoticia
    static deleteNoticia(idNoticia) {
        return fetch(obtenerUrl(`noticia/${idNoticia}`), {
        method: "DELETE",
        headers,
        })
        .then(procesarRespuesta)
        .catch(manejarErrores);
    }




}
