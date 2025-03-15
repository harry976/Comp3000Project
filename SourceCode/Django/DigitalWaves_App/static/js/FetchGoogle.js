// JavaScript source code
document.addEventListener("DOMContentLoaded", () => {
    const ScanButton = document.querySelector(".ScanButton button");
    const resultsContainer = document.querySelector("#GoogleResults");

    ScanButton.addEventListener("click", async () => {
        try {
            resultsContainer.innerHTML = "";
            const response = await fetch("/FetchGoogle/"); // Call the view
            const data = await response.json(); // Parse JSON response
            if (data.GoogleResults && data.GoogleResults.length > 0) {
                data.GoogleResults.forEach((result) => {
                    //start to add into dynamic template
                    //dynamically create new container - main container from main page css
                    const DynamicTemplateResults = document.createElement("div");
                    DynamicTemplateResults.classList.add("IndividualResultsContainer");

                    //create Icon from main page css
                    const DynamicTemplateIcon = document.createElement("img");
                    DynamicTemplateIcon.classList.add("IndividualResultsIcon");

                    if (result.link.includes("facebook.com")) {
                        DynamicTemplateIcon.src = "https://via.placeholder.com/40";
                        DynamicTemplateIcon.alt = `Facebook`;
                    }
                    else if (result.link.includes("linkedin.com")) {
                        DynamicTemplateIcon.src = "https://via.placeholder.com/40";
                        DynamicTemplateIcon.alt = `LinkedIn`;
                    }
                    else {
                        DynamicTemplateIcon.src = "https://via.placeholder.com/40";
                        DynamicTemplateIcon.alt = `Google`;
                    }

                    //create content from main page css
                    const DynamicTemplateContent = document.createElement("div");
                    DynamicTemplateContent.classList.add("IndividualResultsContent");


                    //create Clickable URL for the content 
                    const ProfileURL = document.createElement("a");
                    ProfileURL.href = result.link;
                    ProfileURL.target = "_blank";
                    ProfileURL.textContent = result.title;

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
        } catch (error) {
            console.error("Error fetching news:", error);
            resultsContainer.innerHTML = "<p>Error fetching results.</p>";
        }
    });
});

