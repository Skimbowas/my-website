// ... (rest of your Lightbox code above)

    async function updateReadingList() {
        const rssUrl = 'https://www.goodreads.com/review/list_rss/200425656?key=XFU7yPtgLVBXglkDxyim9LtoZzZiG-ksfKQ-l2dh5deXIrhR&shelf=read'; 
        const proxyUrl = 'https://api.allorigins.win/get?url=';

        try {
            const response = await fetch(`${proxyUrl}${encodeURIComponent(rssUrl)}`);
            const data = await response.json();
            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");
            
            const firstItem = xmlDoc.querySelector("item");
            const readingElement = document.querySelector("#now ul li:nth-child(3)");

            if (firstItem && readingElement) {
                let fullTitle = firstItem.querySelector("title").textContent;
                const cleanTitle = fullTitle.split(' by ')[0];
                readingElement.innerHTML = `📚 Recently read: ${cleanTitle}`;
            }
        } catch (error) {
            console.error("Goodreads Fetch Error:", error);
        }
    }

    // CRITICAL: You must call the function here!
    updateReadingList(); 
});