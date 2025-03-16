document.addEventListener("DOMContentLoaded", () => {
    const resultsContainers = document.querySelectorAll("#AllResults");
    resultsContainers.forEach((container) => {
        container.addEventListener("click", async (click) => {
            if (click.target && click.target.classList.contains("IndividualResultConfirmButton")) {
                //upon click of the confirm button, get information from the parent container
                const WholeTemplate = click.target.closest(".IndividualResultsContainer");
                const Logo = WholeTemplate.querySelector(".IndividualResultsIcon").src;
                const Content = WholeTemplate.querySelector(".IndividualResultsContent").innerHTML;
                const APIType = WholeTemplate.querySelector(".IndividualResultsIcon").alt;

                //change the button text for user interaction
                click.target.disabled = true;
                click.target.textContent = "Confirmed";
                click.target.style.backgroundColor = "#28a745";


                //send a JSON POST to the database - View handles logic
                const ResponseToDB = await fetch('/SaveEntryToDB/', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        logo: Logo,
                        content: Content,
                        APIType: APIType,
                    }),
                });
                const responseDBPush = await ResponseToDB.json();
                console.log(responseDBPush);
            }                         
        });

    });       
});