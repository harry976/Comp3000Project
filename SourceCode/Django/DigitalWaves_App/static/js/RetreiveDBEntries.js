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
                    <button class="IndividualResultConfirmButton">How Can I Fix?</button>
                    <div class="FixHintBubble" style="display: none;"></div>
                `;

                //append to the section
                ScoreBreakdownSection.appendChild(ResultsContainer);
            });
            //call hint bubble listener
            FixHintListener();
            //define weightings to use in score
            const Weightings = {
                "CompaniesHouse": 4,
                "Google": 1,
                "HaveIBeenPwned": 5,
                "News": 2,
                "Reddit": 1,
                "GitHub": 1,
                "Twitter": 3,
                "LinkedIn": 2,
                "Facebook": 3,

            };
            //calculate score using weighting
            let TotalWeight = 0;
            EntriesFromDB.forEach(i => {
                const EntryType = i.APIType;
                const Weight = Weightings[EntryType] || 1;
                TotalWeight += Weight;

            });
            const UserScore = Math.max(100 - TotalWeight, 0); // ensures the score stays between 0 and 100
            const DynamicScoreDisplay = document.getElementById("ScoreNumber");
            const DynamicScoreCircle = document.getElementById("DisplayCircle");
            const DynamicScoreOutOf = document.getElementById("OutOfHundred");
            if (UserScore > 95) {
                //green circle
                DynamicScoreDisplay.style.color = "#28a745";
                DynamicScoreCircle.style.borderColor = "#28a745";
                DynamicScoreOutOf.style.color = "#28a745";
            }
            else if (UserScore <= 95 && UserScore >= 80) {

                DynamicScoreDisplay.style.color = "#ff8000";
                DynamicScoreCircle.style.borderColor = "#ff8000";
                DynamicScoreOutOf.style.color = "#ff8000";
                //amber circle
            }
            else {
                DynamicScoreDisplay.style.color = "#FF4C4C";
                DynamicScoreCircle.style.borderColor = "#FF4C4C";
                DynamicScoreOutOf.style.color = "#FF4C4C";
                //red circle
            }
            
            DynamicScoreDisplay.textContent = UserScore

            const PreviousScanResult = await GetPreviousScore();
            SetPreviousScore(UserScore);

            const ScoreDifference = UserScore - PreviousScanResult;
            let message = "";
            let colour = "";
            if (ScoreDifference < 0) {
                //text equals score difference decreased
                message = `Your score has increased by ${Math.abs(ScoreDifference)}, keep scanning and work at it!`;
                colour = "#FF4C4C";

            }
            else if (ScoreDifference > 0) {
                //text equals score difference improved
                message = `Your score has decreased by ${Math.abs(ScoreDifference)}, keep it up!`;
                colour = "#28a745";
            }
            else {
                //score not changed
                message = "Your score has remained the same";
                colour = "black"
            }
            const ScoreDisplayBox = document.getElementById("ScoreCompare");
            ScoreDisplayBox.textContent = message;
            ScoreDisplayBox.style.color = colour;
            ScoreDisplayBox.style.display = "block";


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
                    document.getElementById("HintOverlay").style.display = "block";
                }
            }
            catch (error) {
                console.error("Error fetching fix hint:", error);
            }
        });
    });
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".IndividualResultsContainer") && !e.target.classList.contains("IndividualResultConfirmButton")) {
            document.querySelectorAll(".FixHintBubble").forEach(bubble => {
                bubble.style.display = "none";
            });
            document.getElementById("HintOverlay").style.display = "none";
        }
    });
}

async function GetPreviousScore() {
    const response = await fetch("/GetPreviousScore/");
    const data = await response.json();

    if (data.PreviousScore !== null) {
        return data.PreviousScore;
    }
    else return null;

}

async function SetPreviousScore(UserScore) {
    await fetch('/SetPreviousScore/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({PreviousScore: UserScore})
    });
}