import {
  validarSesion,
  obtenerValorInput,
  eventoClickCerrarSesion,
  imprimir,
} from "../utils/functions.js";
import { RequestsAPI } from "../RequestsAPI.js";

// Validamos la sesión del usuario
validarSesion();

// Agregamos evento click al botón de cerrar sesión
eventoClickCerrarSesion();

// Obtenemos el id de la noticia
const params = new URLSearchParams(window.location.search);
const idNoticia = params.get("id");

// Función para mostrar un error en el detalle de editar noticia
const mostrarError = (error) => {
  imprimir("editar-noticia-error", error);
};

// Función para popular los campos de la noticia a editar
const popularCampos = (data) => {
  document.querySelector("#editar-titulo").value = data.titulo;
  document.querySelector("#editar-subtitulo").value = data.subtitulo;
  document.querySelector("#editar-textodestacado").value = data.textodestacado;
  document.querySelector("#editar-categoria").value = data.categoria;
  document.querySelector("#editar-fecha").value = data.fecha;
  document.querySelector("#editar-autor").value = data.autor;
  document.querySelector("#editar-img-url").value = data.urlimg;
  document.querySelector("#editar-descripcion").value = data.descripcion;
};

// Obtenemos la noticia por su id
RequestsAPI.getNoticia(idNoticia)
  .then(popularCampos)
  .catch((error) => {
    mostrarError(error);
  });

// Evento click para actualizar la noticia
document
  .querySelector("#boton-actualizar-noticia")
  .addEventListener("click", () => {
    const titulo = obtenerValorInput("editar-titulo");
    const subtitulo = obtenerValorInput("editar-subtitulo");
    const textodestacado = obtenerValorInput("editar-textodestacado");
    const categoria = obtenerValorInput("editar-categoria");
    const fecha = obtenerValorInput("editar-fecha");
    const autor = obtenerValorInput("editar-autor");
    const urlimg = obtenerValorInput("editar-img-url");
    const descripcion = obtenerValorInput("editar-descripcion");

    // Validamos que todos los campos estén presentes
    if (
      !titulo ||
      !subtitulo ||
      !textodestacado ||
      !categoria ||
      !fecha ||
      !autor ||
      !urlimg ||
      !descripcion
    ) {
      mostrarError("Todos los campos son requeridos.");
      return;
    }

    // Convertimos los datos en el formato correcto (string)
// Creación del objeto noticiaActualizada
const noticiaActualizada = {
  titulo: titulo.replace(/"/g, ''), // Reemplazar comillas dobles por vacío
  subtitulo: subtitulo.replace(/"/g, ''),
  textodestacado: textodestacado.replace(/"/g, ''),
  categoria: categoria.replace(/"/g, ''),
  fecha: fecha.replace(/"/g, ''),
  autor: autor.replace(/"/g, ''),
  urlimg: urlimg.replace(/"/g, ''),
  descripcion: descripcion.replace(/"/g, ''),
};
    console.log("Noticia actualizada:", noticiaActualizada);

    // Actualizamos la noticia en el servidor
    RequestsAPI.putNoticia(idNoticia, noticiaActualizada)
      .then(() => {
        document.location.replace(`detalle-noticia.html?id=${idNoticia}`);
      })
      .catch((error) => {
        mostrarError(error);
      });
  });
