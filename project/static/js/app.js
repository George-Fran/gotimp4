const previo_imagen = document.querySelector('.previo-imagen');
const previo_contenido = document.querySelector('.previo-titulo');
const downloadFormSubmit = document.getElementById('download-form-submit');
const videoUrlInput = document.getElementById('video-url');
const boton = document.querySelector('.boton');
const botonDescargar = document.querySelector('.boton-d');
async function nombreVideo() {
    const input = document.querySelector('.input-text');
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const idVideo = input.value.match(regExp);
    const url = `https://yt-api.p.rapidapi.com/dl?id=${idVideo[7]}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '423c888facmshf160383056b04ecp104eddjsnedef25fab4ec',
            'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        function traerNombre(){
            return result.title;
        }
        function traerImagen(){
            return result.thumbnail[1].url;
        }
        console.log(result);
    } catch (error) {
        console.error(error);
    }

    const titulo = document.createElement('H2');
    const boton = document.createElement('BUTTON');
    const imagen = document.createElement('IMG');
    imagen.src = traerImagen();
    previo_imagen.appendChild(imagen);
    titulo.textContent = traerNombre();
    previo_contenido.appendChild(titulo);

    videoUrlInput.value = input.value;
    downloadFormSubmit.style.display = 'block';
}

boton.addEventListener('click', () => {
    nombreVideo();
});
