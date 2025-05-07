const slides = [
    {
        image: "Medios/Mapa1.png",
        video: "Medios/VIDS/VidMapa1.mp4",
        title: "VISITA TOTAL",
        menu: ["OASIS", "FUTURE STORE", "LAB", "ACELERADORA", "UNIVERSITY", "DEV"]
    },
    {
        image: "Medios/Mapa2.png",
        video: "Medios/VIDS/VidMapa2.mp4",
        title: "Visita 2",
        menu: ["OASIS", "FUTURE STORE", "ACELERADORA", "UNIVERSITY", "DEV"]
    },
    {
        image: "Medios/Mapa3.png",
        video: "Medios/VIDS/VidMapa3.mp4",
        title: "Visita rápida",
        menu: ["OASIS", "FUTURE STORE", "UNIVERSITY"]
    },
    {
        image: "Medios/Mapa4.png",
        video: "Medios/VIDS/VidMapa4.mp4",
        title: "Visita 4",
        menu: ["OASIS", "FUTURE STORE", "UNIVERSITY", "DEV"]
    },
    {
        image: "Medios/Mapa5.png",
        video: "Medios/VIDS/VidMapa5.mp4",
        title: "Visita 5",
        menu: ["UNIVERSITY", "OASIS", "FUTURE STORE", "ACELERADORA"]
    }
];

let currentIndex = 0;
const carouselImage = document.getElementById('carouselImage');
const carouselTitle = document.getElementById('carouselTitle');
const menuList = document.querySelector('.menu');
const carouselVideo = document.getElementById('carouselVideo');
const videoSource = document.getElementById('videoSource'); // importante: ahora tenemos <source>
const startButton = document.querySelector('.start-button');

// Asegurar muted y playsinline en JS además del HTML
carouselVideo.muted = true;
carouselVideo.playsInline = true;

// Función para ajustar tamaño de título
function adjustTitleFontSize() {
    const title = document.querySelector('.carousel-title');
    const containerWidth = title.offsetWidth;
    let fontSize = parseFloat(window.getComputedStyle(title).fontSize);

    title.style.whiteSpace = 'nowrap';
    title.style.fontSize = '4vw';

    while (title.scrollWidth > containerWidth && fontSize > 8) {
        fontSize -= 1;
        title.style.fontSize = fontSize + 'px';
    }
}

let mediaUnlocked = false;

document.body.addEventListener('click', () => {
    if (!mediaUnlocked) {
        carouselVideo.muted = true;  // Asegura muteado
        const promise = carouselVideo.play();
        if (promise !== undefined) {
            promise.then(() => {
                carouselVideo.pause();
                mediaUnlocked = true;
                console.log('Contexto multimedia desbloqueado');
            }).catch((err) => {
                console.warn('No se pudo desbloquear el contexto:', err);
            });
        }
    }
}, { once: true });
function showSlide(index) {
    const slide = slides[index];
    carouselImage.src = slide.image;
    carouselTitle.textContent = slide.title;

    videoSource.src = slide.video;
    carouselVideo.load();

    carouselVideo.pause();
    carouselVideo.currentTime = 0;  // Rewind
    carouselVideo.style.opacity = 0;
    carouselImage.style.opacity = 1;

    menuList.innerHTML = '';
    slide.menu.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        menuList.appendChild(li);
    });
}




function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

// BOTÓN START
startButton.addEventListener('click', async () => {
    if (!mediaUnlocked) {
        try {
            carouselVideo.muted = true;
            await carouselVideo.play();
            carouselVideo.pause();
            mediaUnlocked = true;
            console.log('Contexto multimedia desbloqueado');
        } catch (err) {
            console.warn('No se pudo desbloquear el contexto:', err);
        }
    }

    carouselImage.style.opacity = 0;
    carouselVideo.style.opacity = 1;

    // Esperar a que esté listo antes de reproducir
    carouselVideo.addEventListener('canplay', async () => {
        try {
            await carouselVideo.play();
            console.log('Video reproduciéndose');
        } catch (err) {
            console.error('Error al reproducir video:', err);
        }
    }, { once: true });

    // Forzar recarga del video
    carouselVideo.load();
});





// Mostrar primer slide
showSlide(currentIndex);
