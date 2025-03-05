// JavaScript source code
document.addEventListener("DOMContentLoaded", () => {
    const ScanButton = document.querySelector(".ScanButton button");
    const resultsContainer = document.querySelector("#GitHubResults");

    ScanButton.addEventListener("click", async () => {
        try {
            const response = await fetch("/FetchGitHub/"); // Call the view
            const data = await response.json(); // Parse JSON response
            console.log("Fetched Data", data);
            if (data.UserGitHubData) {
                const UserData = data.UserGitHubData
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

