
// Objetivo: Definir la clase Noticia con sus atributos y métodos

export default class Noticia{
    id;
    categoria;
    titulo;
    subtitulo;
    urlimg;
    descripcion;
    textodestacado;
    fecha;
    autor;


    constructor(id=0, categoria="", titulo="", subtitulo="", urlimg="", descripcion="", textodestacado="", fecha="", autor=""){

        this.id = id;
        this.categoria = categoria;
        this.titulo = titulo;
        this.subtitulo = subtitulo;
        this.urlimg = urlimg;
        this.descripcion = descripcion;
        this.textodestacado = textodestacado;
        this.fecha = fecha;
        this.autor = autor;

    }

    mostrarEnCard() {
        return `<div class="col-md-4 news-card" id="${this.id}" title="${this.titulo}" date="${this.fecha}" category="${this.categoria}">
                    <div class="card mb-3">
                        <div class="card-body ">
                            <h4 class="card-categoria mb-2 text-muted">${this.categoria}</h4>
                            <h5 class="card-title">${this.titulo}</h5>
                            <img src="${this.urlimg}" alt="" class="card-img-top img-fluid">
                            <h6 class="card-subtitle mt-2 mb-2 text-muted">${this.fecha}</h6>
                            <p class="card-text">${this.textodestacado}</p>

                        </div>
                    </div>
                </div>`;
    }

    
    

    mostrarEnDetalle() {
        return `<div class="col-md-4 news-card" id="${this.id}" title="${this.titulo}" date="${this.fecha}" category="${this.categoria}">
                    <div class="card mb-3">
                    <h6 class="card-date mb-2 text-muted">${this.fecha}</h6>
                        <h4 class="card-categoria mb-2 text-muted">${this.categoria}</h4>
                        <img src="${this.urlimg}" alt="" class="card-img-top img-fluid">
                        <div class="card-body">
                            <h5 class="card-subtitle">${this.subtitulo}</h5>
                            
                            <p class="card-text">${this.textodestacado}</p>
                            <div class="d-flex justify-content-between">
                                <input type="button" class="btn btn-primary w-100 me-1 custom-button" id="form-editar-noticia" value="Editar Noticia" />
                                <input type="button" class="btn btn-secondary w-100 ms-1 custom-button" id="form-borrar-noticia" value="Borrar Noticia" />
                            </div>
                        </div>
                    </div>
                </div>
                `;
    }

    mostrarArticulo() {
        return `
        <div id="newsContainer" class="row justify-content-center pb-3">
    <div class="container news-card" id="${this.id}" title="${this.titulo}" date="${this.fecha}" category="${this.categoria}" style="max-width: 800px;">
            <p class="text-muted">Publicado el: <span id="date">${this.fecha}</span> | Autor: <span id="author">${this.autor}</span> | Deporte: <span id="category">${this.categoria}</span></p>
   
        <h1 class="mt-4" id="title">${this.titulo}</h1>
        <h5 class="card-subtitle mb-4 text-muted">${this.subtitulo}</h5>
        
        <img src="${this.urlimg}" alt="Imagen del Artículo" class="img-fluid mb-4" id="image">
        
        <div class="row">
            <div class="col-12">
            
                <blockquote class="blockquote text-center">
                    <p class="mb-0" id="highlighted-text">${this.textodestacado}</p>
                </blockquote>
                <p id="content" class="text-justify">${this.descripcion}</p>
            </div>
        </div>

        <div class="mt-4">
        
            <input type="button" class="btn btn-primary" id="boton-editar-prueba-noticia"  value="Editar Prueba Noticia">
            

            <div id="detalle-error" class="error"></div>
        </div>
    </div>
</div>



                `;
    }
}