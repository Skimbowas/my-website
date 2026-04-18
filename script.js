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

        const pathArray = window.location.pathname.split("/");
        let currentPage = pathArray[pathArray.length - 1].toLowerCase();
        
        if (currentPage === "" || currentPage === "index") {
            currentPage = "index.html";
        }

        const navLinks = document.querySelectorAll('.nav-item a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href').toLowerCase();
            const isExact = (currentPage === linkHref);
            const isCleanMatch = (linkHref.replace('.html', '') === currentPage);

            if (isExact || isCleanMatch) {
                link.parentElement.classList.add('active-page');
            } else {
                link.parentElement.classList.remove('active-page');
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
                    if (filterValue === 'all' || (statusTag && statusTag.classList.contains(filterValue))) {
                        card.style.display = "block";
                        card.style.animation = 'none';
                        card.offsetHeight; // Reflow trick [cite: 11]
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
        let lightbox = document.querySelector('.lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            document.body.appendChild(lightbox);
            const lightboxImg = document.createElement('img');
            lightbox.appendChild(lightboxImg);
        }
        
        const lightboxImg = lightbox.querySelector('img');

        galleryImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });
        lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
    }

    // --- 4. GOODREADS AUTOMATION ---
    async function updateReadingList() {
        // Checking if we are on the page with the "Now" list first
        const readingElement = document.getElementById("reading-link");
        if (!readingElement) return; 

        const rssUrl = 'https://www.goodreads.com/review/list_rss/200425656?key=XFU7yPtgLVBXglkDxyim9LtoZzZiG-ksfKQ-l2dh5deXIrhR&shelf=read'; 
        const proxyUrl = 'https://api.allorigins.win/get?url=';

        try {
            const response = await fetch(`${proxyUrl}${encodeURIComponent(rssUrl)}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");
            
            const firstItem = xmlDoc.querySelector("item");

            if (firstItem) {
                let fullTitle = firstItem.querySelector("title").textContent;
                const cleanTitle = fullTitle.split(' by ')[0];
                readingElement.innerHTML = `📚 Recently read: ${cleanTitle}`;
            }
        } catch (error) {
            console.error("Goodreads Fetch Error:", error);
            // Sticking with your manual entry as a fallback
            readingElement.innerHTML = `📚 Recently read: Saga by Brian K Vaughan`;
        }
    }

    // CALL THE FUNCTION
    updateReadingList();
});