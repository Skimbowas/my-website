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

        // Better Active Page Detection
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-item a');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (currentPath.includes(linkPath) || (currentPath.endsWith('/') && linkPath === 'index.html')) {
                link.parentElement.classList.add('active-page');
            }
        });

        if (window.innerWidth > 768) {
            navElement.addEventListener('mouseenter', () => navElement.classList.add('expanded'));
            navElement.addEventListener('mouseleave', () => navElement.classList.remove('expanded'));
        }
    }

    // --- 2. APPLY FLOATING EFFECT & FILTERS ---
    const bookCards = document.querySelectorAll('.book-card');
    const photoItems = document.querySelectorAll('.photo-item');
    const projectCards = document.querySelectorAll('.project-card');

    // Add entrance animation class to all items automatically
    [...bookCards, ...photoItems, ...projectCards].forEach(item => {
        item.classList.add('entrance-anim');
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
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
                        // Re-trigger animation when filtered back in
                        card.style.animation = 'none';
                        card.offsetHeight; // trigger reflow
                        card.style.animation = '';
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }

    // --- 3. LIGHTBOX LOGIC ---
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