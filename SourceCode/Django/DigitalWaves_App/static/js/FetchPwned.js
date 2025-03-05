// JavaScript source code
document.addEventListener("DOMContentLoaded", () => {
    const ScanButton = document.querySelector(".ScanButton button");
    const resultsContainer = document.querySelector("#DataBreachResults");

    ScanButton.addEventListener("click", async () => {
        try {
            const response = await fetch("/FetchPwned/"); // Call the view
            const data = await response.json(); // Parse JSON response
            if (data.UserPwnedData && data.UserPwnedData.length > 0) {
                data.UserPwnedData.forEach((breach) => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <p>Breach Name: ${breach.Name}</p>
                        <p>Breach Date: ${breach.BreachDate}</p>
                        <p>Title: ${breach.Title}</p>
                        <p>Domain: ${breach.Domain}</p>
                        <p><a href="${breach.PwnedDataLink}" target="_blank">More Information</a></p>                               
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

