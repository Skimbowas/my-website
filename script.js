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

        // Extract the specific file name from the URL
        const pathArray = window.location.pathname.split("/");
        let currentPage = pathArray[pathArray.length - 1].toLowerCase();
        
        // Handle root URLs (like kapalaga.com/)
        if (currentPage === "" || currentPage === "index") {
            currentPage = "index.html";
        }

        const navLinks = document.querySelectorAll('.nav-item a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href').toLowerCase();
            
            // Check for exact matches or clean URL matches
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

    async function updateReadingList() {
    // Replace this with your specific "Read" shelf RSS link
    const rssUrl = 'https://www.goodreads.com/review/list_rss/YOUR_ID?shelf=readhttps://www.goodreads.com/review/list_rss/200425656?key=XFU7yPtgLVBXglkDxyim9LtoZzZiG-ksfKQ-l2dh5deXIrhR&shelf=read'; 
    const proxyUrl = 'https://api.allorigins.win/get?url=';

    try {
        const response = await fetch(`${proxyUrl}${encodeURIComponent(rssUrl)}`);
        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        
        // This selects the first (most recent) book in your "Read" list
        const book = xmlDoc.querySelector("item");
        const readingElement = document.querySelector("#now ul li:nth-child(3)");

        if (book) {
            const title = book.querySelector("title").textContent;
            // Update the label to reflect that these are completed books
            readingElement.innerHTML = `📚 Recently read: ${title}`;
        } else {
            // Fallback if you haven't marked any books as "Read" yet
            readingElement.innerHTML = `📚 Recently read: Building my library...`;
        }
    } catch (error) {
        console.error("Error fetching Goodreads feed:", error);
        // Keep the manual text if the API/Proxy fails
        readingElement.innerHTML = `📚 Recently read: [Saga by Brian K Vaughan]`;
    }
}

document.addEventListener("DOMContentLoaded", updateReadingList);
});