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

                    //start to add into dynamic template
                    //dynamically create new container - main container from main page css
                    const DynamicTemplateResults = document.createElement("div");
                    DynamicTemplateResults.classList.add("IndividualResultsContainer");

                    //create Icon from main page css
                    const DynamicTemplateIcon = document.createElement("img");
                    DynamicTemplateIcon.classList.add("IndividualResultsIcon");
                    DynamicTemplateIcon.src = "/static/NewsLogo.png";
                    DynamicTemplateIcon.alt = `News`;

                    //create content from main page css
                    const DynamicTemplateContent = document.createElement("div");
                    DynamicTemplateContent.classList.add("IndividualResultsContent");


                    //create Clickable URL for the content 
                    const ProfileURL = document.createElement("a");
                    ProfileURL.href = article.url;
                    ProfileURL.target = "_blank";
                    ProfileURL.textContent = article.title;

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

                });
            } else {
                resultsContainer.innerHTML = "<p>No results found.</p>";
            }
            //force the tab to reload and display the contents upon scanning
            const tabButton = document.querySelector("button[onclick*='News']");
            if (tabButton) {
                tabButton.click();
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            resultsContainer.innerHTML = "<p>Something went wrong fetching News data. Please try again later.</p>";
        }
    });
});

