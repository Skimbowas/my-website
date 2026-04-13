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

// This function injects the sidebar and sets up the hover effect
document.addEventListener("DOMContentLoaded", () => {
    const navElement = document.querySelector('.side-nav');
    if (navElement) {
        navElement.innerHTML = sidebarHTML;

        // Add the hover animation logic
        navElement.addEventListener('mouseenter', () => navElement.classList.add('expanded'));
        navElement.addEventListener('mouseleave', () => navElement.classList.remove('expanded'));
    }

    // Filter Logic for the Library Page
    const filterBtns = document.querySelectorAll('.filter-btn');
    const bookCards = document.querySelectorAll('.book-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove 'active' class from all buttons and add to the clicked one
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            bookCards.forEach(card => {
                // Check the status tag inside the card
                const statusTag = card.querySelector('.status-tag');
                
                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                } else if (statusTag.classList.contains(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});