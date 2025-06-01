
const inputsArray = [{
    name: "title",
    validation: value => value,
    errorText: "El título es obligatorio"
},{
    name: "year",
    validation: value => value > 1920,
    errorText: "El año debe ser mayor a 1920"
},{
    name: "description",
    validation: value => value.length >= 30,
    errorText: "La descripcion es demasiado corta"
},{
    name: "image",
    validation: value => value.startsWith("https://"),
    errorText: "El formato de la url de la imagen es incorrecto."
}]

const uploadSubmit = (event) => {
    event.preventDefault()
    const values = {};
    let isValid = true;

    for (let index = 0; index < inputsArray.length; index++) {
        const input = inputsArray[index];
        const inputName = input.name;
        const fieldElement = document.getElementById(inputName);
        const errorElement = document.getElementById(`${inputName}-error`);

        if ( !input.validation || input.validation(fieldElement.value)) {
            values[inputName] = fieldElement.value;
            if (fieldElement) fieldElement.className = fieldElement.className.replace(" with-error", "");
            if (errorElement) errorElement.innerText = "";
        } else {
            if (fieldElement) fieldElement.className = fieldElement.className.concat(" with-error");
            if (errorElement) errorElement.innerText = input.errorText;
            isValid = false;
        }
    }

    if (isValid) {
        const initialSeries = localStorage.getItem("series");
        const idEditSerie = location.hash.replace("#", "")
        console.log("por acas")
        // si el objeto existe en el localstorage me lo traigo y lo paso a json
        const series = initialSeries ? JSON.parse(initialSeries) : [];
        const editableSerie = series.find(serie => serie.id === idEditSerie || serie.id === parseInt(idEditSerie)) // para compatibilidad com mockapi
        console.log(editableSerie)
        // si hay un hash
        if (editableSerie){
            // map en base a un array inicial transforma elemento por elemento
            console.log("estoy editando")
            const newSeriesArray = series.map(
                lastSerie => lastSerie.id === idEditSerie ? 
                { id: lastSerie.id,  ...values } :  lastSerie // Agregamos un ID
                // values no tiene id por ese se agrega el nuevo objeto con el mismo nro de id.
                
            )

            localStorage.setItem("series", JSON.stringify(newSeriesArray));
            const cardElement = document.getElementById(idEditSerie)

            cardElement.innerHTML = `
                <img  src="${values.image}"  alt="Imagen de ${values.title}">
                <div class="pl-3 pr-1">
                    <h3>(${values.title}) (${values.year})</h3>
                    <p>${values.description}</p>
                    <div class="d-flex space-between w-100"><button class="btn  btn__primary"  onclick="handleEdit(event)"><i class="fa-solid fa-pencil"></i>Editar</button>
                    <button class="btn  btn__danger" onclick="handleDelete(event)"><i class="fa-solid fa-trash"></i>Eliminar</button></div>
                </div>
            
                `
            location.hash = ""
            event.target.reset()

        } else {
            // alta
        series.push({ id: series.length + 1, ...values }); // Agregamos un ID

        localStorage.setItem("series", JSON.stringify(series));
        //event.target es el form
        event.target.reset()
        console.log(location.hash)
        const seriesContainer = document.getElementById("series_container")
        if (seriesContainer) {
            //seriesJSON.forEach(({id, image, title, year, gender, director, country, description }) => {
                const card = `
                    <div id=${series.length} class="card mb-3">
                        <img src="${values.image}" alt="Imagen de ${values.title}">
                        <div class="pl-3 pr-1">
                            <h3>(${values.title}) (${values.year})</h3>
                            <p>${values.description}</p>
                            <div class="d-flex space-between w-100"><button class="btn  btn__primary"  onclick="handleEdit(event)"><i class="fa-solid fa-pencil"></i>Editar</button>
                            <button class="btn  btn__danger" onclick="handleDelete(event)"><i class="fa-solid fa-trash"></i>Eliminar</button></div>
                        </div>
                    </div>    
                `
                seriesContainer.innerHTML = seriesContainer.innerHTML.concat(card)
            };

        }
        
    }
}

