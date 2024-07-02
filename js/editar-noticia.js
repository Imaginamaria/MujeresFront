import {
    validarSesion,
    obtenerValorInput,
    eventoClickCerrarSesion,
    imprimir,
  } from "../utils/helpers.js";
  import { RequestsAPI } from "../RequestsAPI.js";

  // validamos la sesion del usuario
validarSesion();

// agregamos evento click al boton de cerrar sesion
eventoClickCerrarSesion();

// obtenemos el id de al noticoa
const params = new URLSearchParams(window.location.search);
const idMascota = params.get("id");

// function para mostrar un error en el detalle de editar mascota
const mostrarError = (error) => {
    imprimir("editar-noticia-error", error);
  };

  // function para popular los campos de la mascota a editar
const popularCampos = (data) => {
    
    document.querySelector("#input-titulo").value = data.titulo;
    document.querySelector("#input-subtitulo").value = data.subtitulo;
    document.querySelector("#input-textodestacado").value = data.textodestacado;
    document.querySelector("#select-categoria").value = data.categoria;
    document.querySelector("#input-fecha").value = data.fecha;
    document.querySelector("#input-autor").value = data.autor;
    document.querySelector("#imput-img-url").value = data.urlimg;
    document.querySelector("#input-descripcion").value = data.descripcion;
  };


// obtenemos la noticia por su id
  RequestsAPI.getNoticia(idNoticia)
  .then(popularCampos)
  .catch((error)=>{
    mostrarError(error);
  })

  // evento click para actualizar la noticia
  document
  .querySelector("#boton-actualizar-noticia")
  .addEventListener("click", () => {
    
    const titulo = obtenerValorInput("#input-titulo").value;
    const subtitulo = obtenerValorInput("#input-subtitulo").value;
    const textodestacado = obtenerValorInput("#editar-textodestacado").value;
    const categoria = obtenerValorInput("#editar-categoria").value;
    const fecha = obtenerValorInput("#editar-fecha").value;
    const autor = obtenerValorInput("#editar-autor").value;
    const urlimg = obtenerValorInput("#imput-img-url").value;
    const descripcion = obtenerValorInput("#input-descripcion").value;
    
    if( !titulo || !subtitulo || !textodestacado || !categoria || !fecha || !autor || !urlimg || !descripcion){
      // mostramos un error si los campos estan vacios
      imprimir("editar-noticia-error", "Por favor complete todos los campos");
      return;
    }
    
    // hacemos el fetch, usando el metodo update de request api
    RequestsAPI.putNoticia(idNoticia, titulo, subtitulo, textodestacado, categoria, fecha, autor, urlimg, descripcion)
    .then(() => {
      // si el registro es exitoso, redirigimos al usuario a la pagina de login
      document.location.replace(`detalle-noticia.html?id=${idNoticia}`);
    })
    .catch((error) => {
      // si hay un error al actulizar la noticia, mostramos un error
      imprimir("editar-noticia-error", error);
    });
  });
