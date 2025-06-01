const handleDelete = event => {
    const { parentElement: card} = event.target.parentElement.parentElement
    const id = card.id;
    const series = localStorage.getItem("series")
    const seriesJson = JSON.parse(series)
    const newSeriesArray = seriesJson.filter(serie => serie.id !== parseInt(id) && serie.id != (id)) // compatibilidad con mockapi
    localStorage.setItem("series", JSON.stringify(newSeriesArray));
    console.log(seriesJson)
    console.log(newSeriesArray)

    const container = document.getElementById("series_container")
    container.removeChild(document.getElementById(id)) // rmuevo la card 
  // console.log(container.childNodes)
  //container.innerHTML
}