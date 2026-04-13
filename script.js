const sidebarHTML = `
    <div class="nav-item">
        <a href="index.html">
            <span class="icon">🏠</span>
            <span class="nav-text">Home</span>
        </a>
    </div>
    <div class="nav-item">
        <a href="photos.html">
            <span class="icon">📸</span>
            <span class="nav-text">Photos</span>
        </a>
    </div>
    <div class="nav-item">
        <a href="library.html">
            <span class="icon">📚</span>
            <span class="nav-text">Library</span>
        </a>
    </div>
    <div class="nav-item">
        <a href="projects.html">
            <span class="icon">🚀</span>
            <span class="nav-text">Projects</span>
        </a>
    </div>
`;

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. SIDEBAR & ACTIVE STATE ---
    const navElement = document.querySelector('.side-nav');
    if (navElement) {
        navElement.innerHTML = sidebarHTML;

        const currentPath = window.location.pathname.toLowerCase();
        const navLinks = document.querySelectorAll('.nav-item a');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').toLowerCase();
            const pageName = linkPath.replace('.html', ''); 

            // HIGHLIGHT LOGIC
            const isExactMatch = currentPath.endsWith(linkPath) || currentPath.endsWith(pageName);
            const isHomeRoot = (currentPath === "/" || currentPath.endsWith('/index')) && linkPath === "index.html";
            const isPartialMatch = currentPath.includes(pageName) && pageName !== "index";

            if (isExactMatch || isHomeRoot || isPartialMatch) {
                link.parentElement.classList.add('active-page');
            }
        });

        if (window.innerWidth > 768) {
            navElement.addEventListener('mouseenter', () => navElement.classList.add('expanded'));
            navElement.addEventListener('mouseleave', () => navElement.classList.remove('expanded'));
        }
    }

    // --- 2. ENTRANCE ANIMATIONS & FILTERS ---
    const itemsToAnimate = document.querySelectorAll('.book-card, .photo-item, .project-card');
    itemsToAnimate.forEach(item => item.classList.add('entrance-anim'));

    const filterBtns = document.querySelectorAll('.filter-btn');
    const bookCards = document.querySelectorAll('.book-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');

                bookCards.forEach(card => {
                    const statusTag = card.querySelector('.status-tag');
                    if (filterValue === 'all' || statusTag.classList.contains(filterValue)) {
                        card.style.display = "block";
                        card.style.animation = 'none';
                        card.offsetHeight; 
                        card.style.animation = '';
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }

    // --- 3. LIGHTBOX ---
    const galleryImages = document.querySelectorAll('.photo-item img');
    if (galleryImages.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        document.body.appendChild(lightbox);
        const lightboxImg = document.createElement('img');
        lightbox.appendChild(lightboxImg);

        galleryImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });
        lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
    }
});