// JavaScript source code
document.addEventListener("DOMContentLoaded", () => {
    const ScanButton = document.querySelector(".ScanButton button");
    const resultsContainer = document.querySelector("#GitHubResults");

    ScanButton.addEventListener("click", async () => {
        try {
            resultsContainer.innerHTML = "";
            const response = await fetch("/FetchGitHub/"); // Call the view
            const data = await response.json(); // Parse JSON response
            if (data.UserGitHubData) {
                const UserData = data.UserGitHubData
                //start to add into dynamic template
                //dynamically create new container - main container from main page css
                const DynamicTemplateResults = document.createElement("div");
                DynamicTemplateResults.classList.add("IndividualResultsContainer");

                //create Icon from main page css
                const DynamicTemplateIcon = document.createElement("img");
                DynamicTemplateIcon.classList.add("IndividualResultsIcon");
                DynamicTemplateIcon.src = "/static/GitHubLogo.png";
                DynamicTemplateIcon.alt = `GitHub`;

                //create content from main page css
                const DynamicTemplateContent = document.createElement("div");
                DynamicTemplateContent.classList.add("IndividualResultsContent");


                //create Clickable URL for the content 
                const ProfileURL = document.createElement("a");
                ProfileURL.href = UserData.URL;
                ProfileURL.target = "_blank";
                ProfileURL.textContent = `@${UserData.username}`;

                //create confirm button from main page css
                const DynamicTemplateButton = document.createElement("button");
                DynamicTemplateButton.classList.add("IndividualResultConfirmButton");
                DynamicTemplateButton.textContent = "Confirm";

                //add all to template div
                DynamicTemplateContent.appendChild(ProfileURL);
                DynamicTemplateResults.appendChild(DynamicTemplateIcon);
                DynamicTemplateResults.appendChild(DynamicTemplateContent);
                DynamicTemplateResults.appendChild(DynamicTemplateButton);

                //append to results list for front end
                resultsContainer.appendChild(DynamicTemplateResults);

                //end add to dynamic template
                
                
            } else {
                resultsContainer.innerHTML = "<p>No results found.</p>";
            }
        } catch (error) {
            console.error("Error fetching GitHub:", error);
            resultsContainer.innerHTML = "<p>Something went wrong fetching GitHub data. Please try again later.</p>";
        }
    });

});




