document.addEventListener("DOMContentLoaded", () => {
    const ConfirmTriggerButton = document.querySelector(".ConfirmButton");

    ConfirmTriggerButton.addEventListener("click", async () => {
        try {
            //get data from database
            const response = await fetch('/RetreiveDBEntries/');
            const data = await response.json();
            const EntriesFromDB = data.entries;
            //get the section for the entries to go into
            const ScoreBreakdownSection = document.getElementById("ScoreEntrySection");
            ScoreBreakdownSection.innerHTML = "";
            //loop through entries and add each one to the template
            EntriesFromDB.forEach(entry => {
                //create template container
                const ResultsContainer = document.createElement("div");
                ResultsContainer.classList.add("IndividualResultsContainer");

                //add in the html
                ResultsContainer.innerHTML = `
                    <img class="IndividualResultsIcon" src="${entry.logo}" alt="${entry.APIType}">
                    <span class="IndividualResultsContent">${entry.content}</span>
                    <button class="IndividualResultConfirmButton">How Can I fix?</button>
                    <div class="FixHintBubble" style="display: none;"></div>
                `;

                //append to the section
                ScoreBreakdownSection.appendChild(ResultsContainer);
            });
            //call hint bubble listener
            FixHintListener();
            //calculate score
            const EntryCount = EntriesFromDB.length;
            const UserScore = 100 - EntryCount;

            const DynamicScoreDisplay = document.getElementById("ScoreNumber");
            DynamicScoreDisplay.textContent = UserScore
        }
        catch (error) {
            console.error("Error fetching entries:", error);
        }
    });

});

//Function to handle clicks of the "How Can I fix?" buttons
function FixHintListener() {
    document.querySelectorAll(".IndividualResultConfirmButton").forEach(button => {
        button.addEventListener("click", async (click) => {
            //get variables for the template - API type from alt image text, related bubble
            const WholeTemplate = click.target.closest(".IndividualResultsContainer");
            const APIType = WholeTemplate.querySelector(".IndividualResultsIcon").alt;
            const FixHintBubble = WholeTemplate.querySelector(".FixHintBubble");
            
            try {
                //call the Hint from the database
                const response = await fetch(`/GetFixHint/${APIType}/`);
                const data = await response.json();
                //add the hint in
                if (data.Hint) {
                    FixHintBubble.innerHTML = `<p>${data.Hint}</p>`;
                    FixHintBubble.style.display = "block";
                }
            }
            catch (error) {
                console.error("Error fetching fix hint:", error);
            }
        });
    });
}