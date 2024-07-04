import Noticia from "../Models/Noticia.js";
import { RequestsAPI } from "../RequestsAPI.js";
import {
    imprimir,
    validarSesion,
    eventoClickCerrarSesion,
} from "../utils/functions.js";

//validamos la sesion del usuario
validarSesion();

// agregamos evento click al boton de cerrar sesion
eventoClickCerrarSesion();

//obtener el id de la noticia
const params = new URLSearchParams(window.location.search);
const idNoticia = params.get("id");

console.log(idNoticia);

//function para mostrar un error en el detalle de la noticia
const mostrarError = (error) => {
    imprimir("detalle-error", error);
};

//function para mostrar el detalle de la noticia
const mostrarDetalle = (data) => {
    //limpiamos el error en caso de que exista
    imprimir("detalle-error", "");  
    
    const noticia = new Noticia(
        data.id,
        data.categoria,
        data.titulo,
        data.subtitulo,
        data.urlimg,
        data.descripcion,
        data.textodestacado,
        data.fecha,
        data.autor
    )
    imprimir("detalle", noticia.mostrarArticulo());
};


//eventos click para redirigir a la pagina de editar noticia
document
    .querySelector("#boton-editar-prueba-noticia")
    .addEventListener("click", () => {
        document.location.replace(`editar-noticia.html?id=${idNoticia}`);
    });

//eventos click para eliminar la noticia
document
    .querySelector("#boton-eliminar-noticia")
    .addEventListener("click", () => {
        RequestsAPI.deleteNoticia(idNoticia)
            .then(() => {
                document.location.replace("panel-mujeres.html");
            })
            .catch((error) => {
                mostrarError(error);
            });
    });


//obtenemos la noticia por su id
RequestsAPI.getNoticia(idNoticia)
    .then(mostrarDetalle)
    .catch((error) => {
        mostrarError(error);
    }); 