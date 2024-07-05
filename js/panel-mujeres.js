import Noticia from "../Models/Noticia.js";
import { RequestsAPI } from "../RequestsAPI.js";
import {
    imprimir,
    obtenerValorInput,
    validarSesion,
    eventoClickCerrarSesion,
} from "../utils/functions.js";

// validamos la sesión del usuario
validarSesion();
// agregamos evento click al botón de cerrar sesión
eventoClickCerrarSesion();

// función para normalizar cadenas de texto eliminando acentos y convirtiendo a minúsculas - pedi ayuda de AI
const normalizarTexto = (texto) => {
    return texto
        .normalize("NFD") // Descompone caracteres acentuados en caracteres simples + diacríticos
        .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos
        .toLowerCase(); // Convierte a minúsculas
};

// función para mostrar las cards de noticias
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
                noticia.autor
            ).mostrarEnCard()
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

const mostrarError = (error) => {
    imprimir("newsContainer-error", error);
}

// evento click para filtrar la lista de noticias
document.querySelector("#boton-filtro").addEventListener("click", () => {
    // obtenemos los valores de los inputs
    const filtroTitulo = obtenerValorInput("input-filtro-titulo");
    const filtroCategoria = obtenerValorInput("input-filtro-categoria");
    const filtroFecha = obtenerValorInput("input-filtro-fecha");

    // Llamamos a la API de nuevo, pero con los filtros
    RequestsAPI.getNoticias().then((data) => {
        const noticiasFiltradas = data.filter((noticia) => {
            const tituloNormalizado = normalizarTexto(noticia.titulo);
            const filtroTituloNormalizado = normalizarTexto(filtroTitulo);
            const categoriaCoincide = !filtroCategoria || noticia.categoria === filtroCategoria;
            const fechaCoincide = !filtroFecha || noticia.fecha === filtroFecha;

            return tituloNormalizado.includes(filtroTituloNormalizado) && categoriaCoincide && fechaCoincide;
        });

        mostrarCardNoticias(noticiasFiltradas);
    }).catch(mostrarError);
});

// obtenemos las cards de noticias
RequestsAPI.getNoticias().then(mostrarCardNoticias).catch(mostrarError);
