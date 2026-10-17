// LISTA DE VÍDEOS
const videosData = [
    {
        id: 1,
        title: "Juntos Novamente (Together Again)",
        description: "Aparentemente, algo significativo!",
        duration: "47:24",
        type: "drive",
        // Usando o formato oficial de incorporação (/preview) do Google Drive para carregar perfeitamente em qualquer dispositivo
        src: "https://drive.google.com/file/d/1EKidCwAOuySNkAehRMEx8gYSNh2m7Q8t/preview", 
        poster: "video/main.png"
    },
    {
        id: 2,
        title: "Vídeo Explicativo (YouTube) - SÓ ASSISTA DEPOIS DE VER O EPISÓDIO",
        description: "Explicação/dedução coerente!",
        duration: "18:25",
        type: "youtube",
        src: "https://youtu.be/517Zkq0_qC0?si=2DeJgGgWTkwoj03l", 
        poster: "video/main2.png"
    }
];

// ELEMENTOS DO DOM
const catalogSection = document.getElementById('catalogSection');
const playerSection = document.getElementById('playerSection');
const videoGrid = document.getElementById('videoGrid');
const relatedList = document.getElementById('relatedList');
const relatedSection = document.getElementById('relatedSection');
const playerLayout = document.getElementById('playerLayout');
const searchInput = document.getElementById('searchInput');

const mainIframe = document.getElementById('mainIframe');
const backBtn = document.getElementById('backBtn');
const currentTitle = document.getElementById('currentTitle');
const currentDesc = document.getElementById('currentDesc');

let currentVideoObj = null;

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
                <div class="play-overlay"><i class="fa-solid ${video.type === 'youtube' ? 'fa-arrow-up-right-from-square' : 'fa-play'}"></i></div>
                <span class="badge-duration">${video.duration}</span>
            </div>
            <div class="card-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
            </div>
        `;
        card.addEventListener('click', () => handleVideoClick(video));
        videoGrid.appendChild(card);
    });
}

// CONTROLAR CLIQUE NO VÍDEO
function handleVideoClick(video) {
    if (video.type === 'youtube') {
        window.open(video.src, '_blank');
    } else {
        openPlayer(video);
    }
}

// ABRIR PLAYER COM O VÍDEO DO DRIVE
function openPlayer(video) {
    currentVideoObj = video;
    mainIframe.src = video.src;
    currentTitle.textContent = video.title;
    currentDesc.textContent = video.description;

    catalogSection.classList.add('hidden');
    playerSection.classList.remove('hidden');

    renderRelatedVideos();
}

// VOLTAR PARA O CATÁLOGO
function closePlayer() {
    mainIframe.src = ''; 
    playerSection.classList.add('hidden');
    catalogSection.classList.remove('hidden');
}

// RENDERIZAR VÍDEOS RELACIONADOS NA SIDEBAR
function renderRelatedVideos() {
    relatedList.innerHTML = '';
    const filtered = videosData.filter(v => v.id !== currentVideoObj.id);

    if (filtered.length === 0) {
        relatedSection.classList.add('hidden');
        playerLayout.classList.add('single-video');
    } else {
        relatedSection.classList.remove('hidden');
        playerLayout.classList.remove('single-video');
        filtered.forEach(video => {
            const card = document.createElement('div');
            card.className = 'related-card';
            card.innerHTML = `
                <div class="related-thumb">
                    <img src="${video.poster}" alt="${video.title}">
                </div>
                <div class="related-info">
                    <h4>${video.title}</h4>
                    <p>${video.duration}</p>
                </div>
            `;
            card.addEventListener('click', () => handleVideoClick(video));
            relatedList.appendChild(card);
        });
    }
}

// EVENT LISTENERS
function setupEventListeners() {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = videosData.filter(v => 
            v.title.toLowerCase().includes(query) || 
            v.description.toLowerCase().includes(query)
        );
        renderVideoGrid(filtered);
    });

    backBtn.addEventListener('click', closePlayer);
}