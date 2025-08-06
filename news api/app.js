const apiKey = "pub_a934f5e8431040be82bd6f06d257e3c0";
let currentPage = 1;
let selectedLanguage = "en";

const newsContainer = document.getElementById("news-container");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const pageInfo = document.getElementById("page-info");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// NewsData.io returns up to 10 articles per page on free plan
async function fetchNews(page = 1) {
    newsContainer.innerHTML = "";
    loading.style.display = "block";
    errorDiv.style.display = "none";

    // Build the NewsData.io API endpoint
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=${selectedLanguage}&page=${page}`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (!data.results || !data.results.length) throw new Error("No articles found");

        data.results.forEach((article) => {
            const card = document.createElement("div");
            card.className = "news-card";
            card.innerHTML = `
                <img src="${article.image_url || 'https://via.placeholder.com/400x200'}" alt="news" class="news-image" />
                <div class="news-content">
                    <h2 class="news-title">${article.title}</h2>
                    <p class="news-description">${article.description || ''}</p>
                    <div class="news-meta">
                        <span class="news-source">${article.source_id || ""}</span>
                        <span>${article.pubDate ? new Date(article.pubDate).toLocaleString() : ''}</span>
                    </div>
                    <a href="${article.link}" target="_blank" class="news-link">Read More</a>
                </div>
            `;
            newsContainer.appendChild(card);
        });

        pageInfo.textContent = `Page ${currentPage}`;
        prevBtn.disabled = (currentPage === 1);
        // NewsData.io doesn't always return total pages, so you may need to disable nextBtn if less than 10 results
        nextBtn.disabled = data.results.length < 10;
    } catch (err) {
        errorDiv.style.display = "block";
        newsContainer.innerHTML = "";
        pageInfo.textContent = `Page ${currentPage}`;
        prevBtn.disabled = (currentPage === 1);
        nextBtn.disabled = true;
        console.error("Failed to fetch news:", err.message);
    } finally {
        loading.style.display = "none";
    }
}

window.changePage = function (direction) {
    if (direction === -1 && currentPage <= 1) return;
    currentPage += direction;
    fetchNews(currentPage);
};

document.getElementById("language").addEventListener("change", (e) => {
    selectedLanguage = e.target.value;
    currentPage = 1;
    fetchNews(currentPage);
});

// Initial Load
fetchNews(currentPage);
