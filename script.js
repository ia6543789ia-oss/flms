// LISTA DE VÍDEOS (Ambos abrem instantaneamente ao toque em qualquer celular)
const videosData = [
    {
        id: 1,
        title: "Juntos Novamente (Together Again)",
        description: "Aparentemente, algo significativo!",
        duration: "47:24",
        src: "https://drive.google.com/file/d/1EKidCwAOuySNkAehRMEx8gYSNh2m7Q8t/view?pli=1", 
        poster: "video/main.png"
    },
    {
        id: 2,
        title: "Vídeo Explicativo (YouTube) - SÓ ASSISTA DEPOIS DE VER O EPISÓDIO",
        description: "Explicação/dedução coerente!",
        duration: "18:25",
        src: "https://youtu.be/517Zkq0_qC0?si=2DeJgGgWTkwoj03l", 
        poster: "video/main2.png"
    }
];

// ELEMENTOS DO DOM
const videoGrid = document.getElementById('videoGrid');
const searchInput = document.getElementById('searchInput');

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    renderVideoGrid(videosData);
    setupEventListeners();
});

// RENDERIZAR GRID DE VÍDEOS NA HOME
function renderVideoGrid(list) {
    videoGrid.innerHTML = '';
    if (list.length === 0) {
        videoGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Nenhum vídeo encontrado.</p>';
        return;
    }

    list.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <div class="card-thumbnail">
                <img src="${video.poster}" alt="${video.title}">
                <div class="play-overlay"><i class="fa-solid fa-arrow-up-right-from-square"></i></div>
                <span class="badge-duration">${video.duration}</span>
            </div>
            <div class="card-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
            </div>
        `;
        card.addEventListener('click', () => {
            window.open(video.src, '_blank'); // Abre perfeitamente no player nativo do celular
        });
        videoGrid.appendChild(card);
    });
}

// EVENT LISTENERS DE BUSCA
function setupEventListeners() {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = videosData.filter(v => 
            v.title.toLowerCase().includes(query) || 
            v.description.toLowerCase().includes(query)
        );
        renderVideoGrid(filtered);
    });
}