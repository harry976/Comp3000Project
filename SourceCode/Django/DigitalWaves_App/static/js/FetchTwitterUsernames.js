// JavaScript source code
document.addEventListener("DOMContentLoaded", () => {
    const ScanButton = document.querySelector(".ScanButton button");
    const resultsContainer = document.querySelector("#TwitterResults");

    ScanButton.addEventListener("click", async () => {
        try {
            const response = await fetch("/FetchTwitterUsernames/"); // Call the view
            const data = await response.json(); // Parse JSON response
            if (data.UserTwitterData) {
                const UserData = data.UserTwitterData
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <p>Name: ${UserData.name}</p>
                    <p>Username: @${UserData.username}</p>
                    <p>ID: ${UserData.id}</p>
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

