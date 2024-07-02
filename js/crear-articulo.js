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

// evento click para agregar un nuevo articulo
document.querySelector("#boton-crear-noticia").addEventListener("click", ()=>{

    // obtenemos los valores de los inputs
    const titulo = obtenerValorInput("input-titulo");
    const subtitulo = obtenerValorInput("input-subtitulo");
    const textodestacado = obtenerValorInput("input-textodestacado");
    const categoria = obtenerValorInput("input-categoria");
    const fecha = obtenerValorInput("input-fecha");
    const autor = obtenerValorInput("input-autor");
    const urlimg = obtenerValorInput("imput-img-url");
    const descripcion = obtenerValorInput("input-descripcion");

    // validamos que los campos no esten vacios
    if(!titulo || !subtitulo || !textodestacado || !categoria || !fecha || !autor || !urlimg || !descripcion){
        imprimir("form-crear-noticia-error", "Por favor complete todos los campos");
        // para que no siga y termine aca.
        return;
    }

    // creamos el body del post, con los valores de los inputs
    const body = JSON.stringify({ titulo, subtitulo, textodestacado, categoria, fecha, autor, urlimg, descripcion });
    console.log(body);

    // hacemos el fetch, usando el metodo postNoticia de request api
    RequestsAPI.postNoticia(body)
    .then(()=>{

        // redireccionamos al usuario al panel de mujeres
        document.location.replace("panel-mujeres.html");
    })
    .catch((error)=>{
        // si hay un error, lo mostramos en la consola y en el formulario
        imprimir("form-crear-articulo-error", error);


    });

 })