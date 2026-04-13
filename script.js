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
    // 1. INJECT SIDEBAR
    const navElement = document.querySelector('.side-nav');
    if (navElement) {
        navElement.innerHTML = sidebarHTML;

        // NEW LOGIC: Only allow the "Slide Out" expansion on Desktop (wider than 768px)
        if (window.innerWidth > 768) {
            navElement.addEventListener('mouseenter', () => navElement.classList.add('expanded'));
            navElement.addEventListener('mouseleave', () => navElement.classList.remove('expanded'));
        }
    }

    // 2. FILTER LOGIC
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
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
});