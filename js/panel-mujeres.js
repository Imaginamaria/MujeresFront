import Noticia from "../Models/Noticia.js";
import { RequestsAPI } from "../RequestsAPI.js";
import {
    imprimir,
    obtenerValorInput,
    validarSesion,
    eventoClickCerrarSesion,
  } from "../utils/functions.js";


// validamos la sesion del usuario
validarSesion();
// agregamos evento click al boton de cerrar sesion
eventoClickCerrarSesion();

// function para mostrar las cards de noticias
const mostrarCardNoticias = (data) => {

    console.log(data);
    // limpiamos el error en caso de que exista
    imprimir("newsContainer-error", "");

    // para cada card de noticia, creamos una instancia de la clase Noticia y la mostramos
    
        const cardNoticias = data
        .map((noticia) =>
            new Noticia(
                noticia.id,
                noticia.categoria,
                noticia.titulo,
                noticia.subtitulo,
                noticia.urlimg,
                noticia.descripcion,
                noticia.textodestacado,
                noticia.fecha,
                noticia.autor)
            .mostrarEnCard()
        )
        .join("");

         // imprimimos la card de noticias en el elemento con id newsContainer
        imprimir("newsContainer", cardNoticias);
    


        // Agregamos evento click a cada item de la lista de noticias
        document.querySelectorAll(".news-card").forEach((itemCard) => {
        itemCard.addEventListener("click", () => {
        
        // Redirigimos a la página de detalle de la noticia
        document.location.replace(`detalle-noticia.html?id=${itemCard.id}`);

        
    });
});


}

const mostrarError = (error)=>{
    imprimir ("newsContainer-error", error)
}

// evento click para filtrar la lista de noticias
document.querySelector("#boton-filtro").addEventListener("click", () => {
  // obtenemos los valores de los inputs
  const filtroTitulo = obtenerValorInput("input-filtro-titulo");
  const filtroCategoria= obtenerValorInput("input-filtro-categoria");
  const filtroFecha = obtenerValorInput("input-filtro-fecha");


    // Llamamos a la API de nuevo, pero con los filtros
    RequestsAPI.getNoticias({ filtroTitulo, filtroFecha, filtroCategoria })
        .then(mostrarCardNoticias)
        .catch(mostrarError);
});

// obtenemos la cards de noticias
RequestsAPI.getNoticias().then(mostrarCardNoticias).catch(mostrarError);
