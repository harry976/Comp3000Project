// JavaScript source code
//unused code - may impleemnt in the future 
document.addEventListener("DOMContentLoaded", () => {
    const ScanButton = document.querySelector(".ScanButton button");
    const resultsContainer = document.querySelector("#SocialMediaResults");

    ScanButton.addEventListener("click", async () => {
        try {
            const response = await fetch("/FetchSocialMediaProfiles/"); // Call the view
            const data = await response.json(); // Parse JSON response
            if (data.SocialMediaProfiles && data.SocialMediaProfilles.length > 0) {
                resultsContainer.innerHTML = '';
                data.SocialMediaProfiles.forEach((Profile) => {
                    const listItem = document.createElement("li");
                    const link = document.createElement("a");
                    link.href = profile.url;
                    link.target = "_blank";
                    link.textContent = Profile.name || Profile.url;
                    listItem.appendChild(link);
                    resultsContainer.appendChild(listItem);
                });
            } else {
                resultsContainer.innerHTML = "<p>No results found.</p>";
            }
        } catch (error) {
            console.error("Error fetching Profiles:", error);
            resultsContainer.innerHTML = "<p>Error fetching results.</p>";
        }
    });
});

