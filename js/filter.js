// validacion para busqueda

const validateInt = (number) => (number > 10);

const validateString = (texto) => (texto.length > 3);

const setError = (id1, msg) => {
    document.getElementById(id1).className.concat("input-error");
    document.getElementById(`${id1}-error`).className = "helper-error";
    document.getElementById(`${id1}-error`).innerText = msg;
    }


const cleanError = (id1) => {
    document.getElementById(id1).className.replace("input-error", "");
    document.getElementById(`${id1}-error`).className = "helper"
    document.getElementById(`${id1}-error`).innerText = ""
}

////////////////////

const findMovies = (event) => {
    // esto viene del boton
    event.preventDefault()

    const fTitulo = document.getElementById("fTitulo").value
    const fFechaLanzamiento = document.getElementById("fFechaLanzamiento").value


    console.log(fTitulo.toLowerCase())

    console.log(parseInt(fFechaLanzamiento))
//    let dataSerieById = seriesJSON
    aplicarFiltro (fFechaLanzamiento, fTitulo) 
  
}

const aplicarFiltro = (fFechaLanzamiento, fTitulo) => {
    const seriesContainer = document.getElementById("series_container")
    const series = localStorage.getItem("series");
    const seriesJSON = JSON.parse(series);
   //console.log(seriesJSON)
    console.log("entro a aplicarFiltro")
    let filtro = ""
    let hayConsulta = 0
    if (fFechaLanzamiento != "")
    {
        if (validateInt(fFechaLanzamiento))// valido que sea numerico
        { 
            console.log("hay fecha")
            hayConsulta = 1
            dataSerieById = seriesJSON.filter(movie => movie.year === parseInt(fFechaLanzamiento) || movie.year == fFechaLanzamiento)  // compat con mockup
            //si valida genero el primer filtro
            cleanError("fFechaLanzamiento")
            filtro = `#year=${fFechaLanzamiento}`

        }
        else
            setError("fFechaLanzamiento", "El nro de corresponder a un Año con el formato YYYY") // no deberia llegar porque tiene un numerico
    }   // sino no es error que quede vacio

    if (fTitulo != "")
        if (validateString(fTitulo)) // que no tenga menos de 3 caracteres
        {
            console.log("hay titulo")
            if (hayConsulta == 1)
                dataSerieById = dataSerieById.filter(movie => movie.title.toLowerCase().includes(fTitulo.toLowerCase()))
            else
                dataSerieById = seriesJSON.filter(movie => movie.title.toLowerCase().includes(fTitulo.toLowerCase()))
            cleanError("fTitulo")
            filtro = (filtro) ? filtro.concat(`&titulo=${fTitulo}`) : `#titulo=${fTitulo}`
        }
        else
            setError("fTitulo", "El texto no puede ser menor de 3 letras")


    if (filtro != "") // si hay una consulta valida
    {
         console.log("cambio el hash por ", filtro)
         location.hash = filtro
        showData(dataSerieById)
    }
    else   
    {
        showData(seriesJSON)
    }
    


}

const Reset = (event) => { // PARA PODER HACER CANCELAR EDICION Y HACER UN ALTA
    location.hash = ""
    document.getElementById("crud_title").innerHTML = "Alta"
}
