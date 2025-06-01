document.addEventListener("DOMContentLoaded", () => {
    const series = localStorage.getItem("series");
    const seriesJSON = JSON.parse(series);

    showData(seriesJSON)
})

const showData = (seriesJSON) => {
    const seriesContainer = document.getElementById("series_container")
    seriesContainer.innerHTML = ""
    seriesCount =  document.getElementById("seriesCount") 
    if (seriesJSON.length > 0)
        seriesCount.innerHTML = "(" + seriesJSON.length + ")"
    else
        seriesCount.innerHTML = "No se encontraron peliculas que coincidan con el criterio seleccionado"
    if (seriesJSON) {
        seriesJSON.forEach(({id, image, title, year, description }) => {
            const card = `
             <div  id=${id} class="card p-1 mb-2" >
                <img  src="${image}"  alt="Imagen de ${year}">
                <div class="pl-3 pr-1">
                    <h3>${title} (${year})</h3>
                    <p>${description.substring(0, 150).concat("...")}</p>
                    <div class="d-flex space-between w-100">
                        <button class="btn  btn__primary"  onclick="handleEdit(event)"><i class="fa-solid fa-pencil"></i>Editar</button>
                        <button class="btn  btn__danger" onclick="handleDelete(event)"><i class="fa-solid fa-trash"></i>Eliminar</button>
                    </div>
                </div>
            </div>
            `
            seriesContainer.innerHTML = seriesContainer.innerHTML.concat(card)
        });
    }
}