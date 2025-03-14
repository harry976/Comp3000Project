document.addEventListener("DOMContentLoaded", () => {
    const ConfirmTriggerButton = document.querySelector(".ConfirmButton");

    ConfirmTriggerButton.addEventListener("click", async () => {
        try {
            //get data from database
            const response = await fetch('/RetreiveDBEntries/');
            const data = await response.json();
            const EntriesFromDB = data.entries;
            //get the section for the entries to go into
            const ScoreBreakdownSection = document.getElementById("ScoreBreakdown");
            ScoreBreakdownSection.innerHTML = "";
            //loop through entries and add each one to the template
            EntriesFromDB.forEach(entry => {
                //create template container
                const ResultsContainer = document.createElement("div");
                ResultsContainer.classList.add("IndividualResultsContainer");

                //add in the html
                ResultsContainer.innerHTML = `
                    <img class="IndividualResultsIcon" src="${entry.logo}" alt="Logo">
                    <span class="IndividualResultsContent">${entry.content}</span>
                    <button class="IndividualResultConfirmButton">How Can I fix?</button>
                `;

                //append to the section
                ScoreBreakdownSection.appendChild(ResultsContainer);


            });
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