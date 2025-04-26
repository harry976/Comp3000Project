// JavaScript source code
document.addEventListener("DOMContentLoaded", () => {
    const ScanButton = document.querySelector(".ScanButton button");
    const resultsContainer = document.querySelector("#DataBreachResults");

    ScanButton.addEventListener("click", async () => {
        try {
            resultsContainer.innerHTML = "";
            const response = await fetch("/FetchPwned/"); // Call the view
            const data = await response.json(); // Parse JSON response
            if (data.UserPwnedData && data.UserPwnedData.length > 0) {
                
                data.UserPwnedData.forEach((breach) => {
                    //start to add into dynamic template
                    //dynamically create new container - main container from main page css
                    const DynamicTemplateResults = document.createElement("div");
                    DynamicTemplateResults.classList.add("IndividualResultsContainer");

                    //create Icon from main page css
                    const DynamicTemplateIcon = document.createElement("img");
                    DynamicTemplateIcon.classList.add("IndividualResultsIcon");
                    DynamicTemplateIcon.src = breach.LogoPath;
                    DynamicTemplateIcon.alt = `HaveIBeenPwned`;

                    //create content from main page css
                    const DynamicTemplateContent = document.createElement("div");
                    DynamicTemplateContent.classList.add("IndividualResultsContent");


                    //regular expression to strip the link out of the description provided by the API
                    const LinkExpression = /href="([^"]+)"/;
                    const Link = breach.Description.match(LinkExpression);
                    const LinkAndName = document.createElement("p");
                    //if the link exists, point them to the link. otherwise, point them to the haveibeenpwned website.
                    if (Link && Link.length > 0) {
                        const PwnedURL = document.createElement("a");
                        PwnedURL.href = Link[1];
                        PwnedURL.target = "_blank";
                        PwnedURL.textContent = `View Article`;
                        LinkAndName.textContent = `${breach.Name} - `;
                        LinkAndName.appendChild(PwnedURL);
                    }
                    else {
                        const PwnedURL = document.createElement("a");
                        PwnedURL.href = "https://haveibeenpwned.com/";
                        PwnedURL.target = "_blank";
                        PwnedURL.textContent = `Discover More`;
                        LinkAndName.textContent = `${breach.Name} -`;
                        LinkAndName.appendChild(PwnedURL);
                        
                    }

                    //create confirm button from main page css
                    const DynamicTemplateButton = document.createElement("button");
                    DynamicTemplateButton.classList.add("IndividualResultConfirmButton");
                    DynamicTemplateButton.textContent = "Confirm";

                    //add all to template div
                    DynamicTemplateContent.appendChild(LinkAndName);
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
            console.error("Error fetching Pwned:", error);
            resultsContainer.innerHTML = "<p>Something went wrong fetching Breaches data. Please try again later.</p>";
        }
    });
});

