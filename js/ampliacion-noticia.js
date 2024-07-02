import { error } from "console";
import Noticia from "../Models/Noticia.js";
import { RequestsAPI } from "../RequestsAPI.js";
import {
        imprimir,
        validarSesion,
        eventoClickCerrarSesion,
    } from "../utils/functions.js";


// validamos la sesion del usuario
validarSesion();

// agregamos evento click al boton de cerrar sesion
eventoClickCerrarSesion();

// obtenemos el id de la noticia
const params = new URLSearchParams(window.location.search);
const idNoticia = params.get("id");

// function para mostrar un error en el detalle de la noticia
const mostrarError = (error) => {
    imprimir("detalle-error", error);
  };

  // function para mostrar el detalle de la mascota
  const mostrarDetalle = (data) => {
    // limpiamos el error en caso de que exista
    imprimir("detalle-error", "");  

    // para cada card de noticia, creamos una instancia de la clase Noticia y la mostramos
    const noticia = new Noticia(
      data.id,
      data.titulo,
      data.subtitulo,
      data.categoria,
      data.textodestacado,
      data.imagen,
      data.fecha,
      data.autor
    ).mostrarDetalle();
    imprimir("detalle", noticia.mostrarDetalle());
  };

  // evento click para redirigir a la pagina de editar mascota
  document
    .querySelector("#boton-editar-noticia")
    .addEventListener("click", () => {
      document.location.replace(`editar-noticia.html?id=${idNoticia}`);
    });

    // evento click para eliminar la mascota
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

    // obtenemos la mascota por su id
    RequestsAPI.getNoticia(idNoticia)
    .then(mostrarDetalle)
    .catch((error) => {
        mostrarError(error);
    });