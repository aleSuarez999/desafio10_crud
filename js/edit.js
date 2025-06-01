const handleEdit = event => {

    event.preventDefault()
    const {parentElement: card} = event.target.parentElement.parentElement
    // asignacion avanzada de card
    editar(card)

}

const editar = (card) => {
    const id = card.id
    console.log(id)
    document.getElementById("crud_title").innerHTML = `Modificar Pelicula ${id}`
    const data = localStorage.getItem("series")
    console.log(data)
    const dataSerieById = JSON.parse(data).find( serie => serie.id === id || serie.id === parseInt(id) )
    console.log("series", dataSerieById)
    // este tiene una sola serie con todos los campos y conciden con los nombres de los campos
    Object.entries(dataSerieById).forEach(
        // recorre el id que coincide con el id del input del form
        ([key, value]) => {
            const input = document.getElementById(key)
            if (input ){
                input.value = value
            }
        }

    )

    //console.log(Object.keys)
    location.hash = id
    document.getElementById("title").focus()
    
}


// si por el historial se vuelve a atras permite editar nuevamente
window.addEventListener("hashchange", (event)=>{
    event.preventDefault()
    console.log("hashchange")
    let parametros = location.hash.split("#")[1]
   // console.log("parametros", archivo)
    //let parametros = location.search // me traigo lo que le sigue a la barra esto era con ?
    
    console.log("isnan=?", isNaN(parametros))
    console.log("location", window.location)
    console.log("PARAMETROS", parametros)
    if (isNaN(parametros)) // si no es numero busco 
    {
        const params = new URLSearchParams("?".concat(parametros)); // transformo a objeto de busqueda

        const fTitulo = (params.get("titulo")) ? params.get("titulo") : ""
        const fFechaLanzamiento = (parseInt(params.get("year")))?parseInt(params.get("year")):""; // para que no me tome NAN
        // si hay algun valor en el titulo lo completo en los campos de busqueda porque en aplicar filtro valido la busqueda
        document.getElementById("fTitulo").value = (fTitulo) ? fTitulo : ""
        document.getElementById("fFechaLanzamiento").value = (fFechaLanzamiento) ? fFechaLanzamiento : ""

        console.log("BUSCA TITULO: ", fTitulo)
        console.log("BUSCA año: ", fFechaLanzamiento)

        //const q = parseInt(params.get("q"), 10);
        //return 0
        aplicarFiltro(fFechaLanzamiento, fTitulo)
    }
    
})