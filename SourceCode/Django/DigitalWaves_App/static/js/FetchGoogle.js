// JavaScript source code
document.addEventListener("DOMContentLoaded", () => {
    const ScanButton = document.querySelector(".ScanButton button");
    const resultsContainer = document.querySelector("#GoogleResults");

    ScanButton.addEventListener("click", async () => {
        try {
            const response = await fetch("/FetchGoogle/"); // Call the view
            const data = await response.json(); // Parse JSON response
            if (data.GoogleResults && data.GoogleResults.length > 0) {
                data.GoogleResults.forEach((result) => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <p>${result.title}</p>
                        <p><a href="${result.link}" target="_blank">${result.link}</a></p>
                               
                    `;
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

