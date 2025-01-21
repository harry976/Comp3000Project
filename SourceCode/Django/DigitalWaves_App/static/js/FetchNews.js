// JavaScript source code
document.addEventListener("DOMContentLoaded", () => {
    const ScanButton = document.querySelector(".ScanButton button");
    const resultsContainer = document.querySelector(".Results ul");

    ScanButton.addEventListener("click", async () => {
        try {
            const response = await fetch("/FetchNews/"); // Call the view
            const data = await response.json(); // Parse JSON response
            if (data.articles && data.articles.length > 0) {
                data.articles.forEach((article) => {
                    const listItem = document.createElement("li");
                    const link = document.createElement("a");
                    link.href = article.url;
                    link.target = "_blank";
                    link.textContent = article.url;
                    listItem.appendChild(link);
                    resultsContainer.appendChild(listItem);
                });
            } else {
                resultsContainer.innerHTML = "<p>No results found.</p>";
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            resultsContainer.innerHTML = "<p>Error fetching results.</p>";
        }
    });
});

