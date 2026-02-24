const newsContainer = document.getElementById("news-container");

async function loadNews() {
    newsContainer.innerHTML = "Loading news...";

    try {
        // Get top story IDs
        const response = await fetch(
            "https://hacker-news.firebaseio.com/v0/topstories.json"
        );
        const storyIds = await response.json();

        newsContainer.innerHTML = "";

        // Get first 5 stories (easy & clean)
        for (let i = 0; i < 5; i++) {
            const storyResponse = await fetch(
                `https://hacker-news.firebaseio.com/v0/item/${storyIds[i]}.json`
            );
            const story = await storyResponse.json();

            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");

            newsItem.innerHTML = `
                <h3>${story.title}</h3>
                <a href="${story.url}" target="_blank">Read More</a>
                <hr>
            `;

            newsContainer.appendChild(newsItem);
        }

    } catch (error) {
        newsContainer.innerHTML = "Failed to load news.";
        console.error(error);
    }
}