// JavaScript source code
document.addEventListener("DOMContentLoaded", () => {
    const ScanButton = document.querySelector(".ScanButton button");
    const resultsContainer = document.querySelector("#RedditResults");

    ScanButton.addEventListener("click", async () => {
        try {
            const response = await fetch("/FetchReddit/"); // Call the view
            const data = await response.json(); // Parse JSON response
            console.log("Fetched Data", data);
            if (data.UserRedditData) {
                const UserData = data.UserRedditData
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <p>Username: @${UserData.username}</p>
                    <p>Profile: <a href="${UserData.URL}" target="_blank">${UserData.URL}</a></p>                                                                           
                `;

                resultsContainer.appendChild(listItem);



            } else {
                resultsContainer.innerHTML = "<p>No results found.</p>";
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            resultsContainer.innerHTML = "<p>Error fetching results.</p>";
        }
    });
});

