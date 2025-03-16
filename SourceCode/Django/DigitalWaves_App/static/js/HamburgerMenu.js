document.addEventListener("DOMContentLoaded", function () {
    /* Hamburger menu buttons into variables */
    const InformationWizardButton = document.querySelector(".InformationWizardButton");
    const SideMenuContent = document.getElementById("SideMenu");

    /*code to load the main menu page */
    function LoadMainMenu() {

        SideMenuContent.innerHTML = `
            <label for="check" class="closebtn">&times;</label>
            <button type="button" class="HelpButton">Help</button>
            <button type="button" class="AccountSettingsButton">Account Settings</button>
            <a href="/DataForm/">
                <button type="button" class="InformationWizardButton">Information Wizard</button>
            </a>
            <a href="/login/">
                <button type="button" class="LogoutButton">Log Out</button>
            </a>              
        `;
        /* calls the listeners for the buttons*/
        MainMenuButtonListeners();
    }

    /*HTML code for help page*/
    function LoadHelpMenu() {
        SideMenuContent.innerHTML = `
        <label for="check" class="closebtn">&times;</label>
        <h2 class="HelpHeader">Help</h2>
        <p class="FAQHeader">FAQs:</p>
        <div class="FAQBody">
            <h3>1. What is DigitalWaves?</h3>
            <p>DigitalWaves is a web application designed to help you understand your digital footprint. By pulling data from various online sources, it provides you with a comprehensive view of your online presence. You can review and confirm the information gathered about you, and receive tips to boost your digital privacy and security.</p>
            <h3>2. How does DigitalWaves collect data?</h3>
            <p>DigitalWaves collects data through a form you fill out with some basic information. Afterward, we use various public APIs to gather more data related to your digital footprint (such as social media profiles, data breaches, etc.). This data is then displayed for you to review and confirm.</p>
            <h3>3. What kind of data does DigitalWaves retrieve?</h3>
            <p>DigitalWaves retrieves a wide range of data related to your online presence. This includes:</p>
            <ul>
                <li>Social Media profiles (e.g., Twitter, Reddit, GitHub, etc.)</li>
                <li>Data Breaches (e.g., have you been part of any public data breaches?)</li>
                <li>News Articles mentioning your name or other relevant details</li>
                <li>Property Ownership reports (if available)</li>
            </ul>
            <h3>4. How do I confirm the data that is retrieved?</h3>
            <p>Once the data is fetched, you will see a list of entries under different categories (such as News, Social Media, etc.). You can review each entry and confirm if it's relevant to you.</p>
            <h3>5. What does the score mean?</h3>
            <p>Your digital footprint score is a measure of how much data about you is available online and how exposed your personal information is. The lower the score, the more public your information is. After reviewing and confirming the data, you will see your score, which will be a number out of 100.</p>

            <h3>6. How can I improve my digital footprint?</h3>
            <p>For each entry, DigitalWaves provides a tip on how you can improve your digital footprint. These tips will help you enhance your privacy and reduce your online exposure. Suggestions could include things like:</p>
            <ul>
                <li>Removing outdated social media accounts</li>
                <li>Changing privacy settings on your accounts</li>
                <li>Updating passwords for better security</li>
                <li>Opting out of certain data-sharing services</li>
            </ul>
            <h3>7. Why is my digital footprint score important?</h3>
            <p>Your digital footprint score reflects how exposed your personal data is on the internet. A higher score means your information is well-protected, while a lower score indicates that more of your data is accessible to others, potentially putting you at risk for identity theft, hacking, or unwanted solicitations. Monitoring and managing your digital footprint helps you maintain a safer online presence.</p>
            <h3>8. How do I get my data removed?</h3>
            <p>If you find data that shouldn't be associated with you or would like to have certain entries removed, you can take the following steps:</p>
            <ul>
                <li>Contact the website or service: If data is linked to your social media accounts, you can contact the platform for removal or update privacy settings.</li>
                <li>Use privacy tools: DigitalWaves may also suggest tools or methods to remove your data from public databases.</li>
            </ul>
            <h3>9. Can I delete my account on DigitalWaves?</h3>
            <p>Yes, if you no longer want to use DigitalWaves, you can delete your account at any time. Simply visit the Account Settings section and select the option to delete your account.</p>
            <h3>10. How often is my data updated?</h3>
            <p>You can always check for updates through the Scan For Information button.</p>
            <h3>11. What if I do not agree with the data displayed?</h3>
            <p>If you find any data displayed on your profile to be incorrect or irrelevant, you can either:</p>
            <ul>
                <li>Dispute it directly with the platform it originated from (e.g., a social media profile or news article).</li>
                <li>Contact us if you need assistance in resolving any issues.</li>
            </ul>
            <h3>12. Who can see my data on DigitalWaves?</h3>
            <p>Your data is only visible to you when you log in to your DigitalWaves account. It is not shared with anyone else unless you choose to share specific information yourself.</p>
        </div>
        <button class="BackButton" id="BackButton">Back</button>
    `;
        /*calls the listener for the back button */
        BackButtonListener();
    }

    /*HTML code for Account Settings page*/
    function LoadAccountSettingsMenu() {
        let ChangeUsernameURL = "/ChangeUsername/";
        let ChangePasswordURL = "/ChangePassword/";
        let DeleteAccountURL = "/DeleteAccount/";
        SideMenuContent.innerHTML = `
        <label for="check" class="closebtn">&times</label>
        <h2 class="AccountSettingsHeader">Account Settings</h2>
        <a href="${ChangeUsernameURL}">
            <button type="button" class="ChangeUsernameButton">Change Username</button>
        </a>
        <a href="${ChangePasswordURL}">
            <button type="button" class="ChangePasswordButton">Change Password</button>
        </a>
        <a href="${DeleteAccountURL}">
            <button type="button" class="DeleteAccountButton">Delete Account</button>
        </a
        <button type="button" class="DeleteOptionalInformationButton">Delete Optional Information</button>

        <button class=BackButton id=BackButton>Back</button>
        `;
        /*calls the listener for the back button */
        BackButtonListener();
    }


    /*listeners for the main menu buttons */
    function MainMenuButtonListeners() {
        const HelpButton = document.querySelector(".HelpButton");
        const AccountSettingsButton = document.querySelector(".AccountSettingsButton");
        HelpButton.addEventListener("click", LoadHelpMenu);
        AccountSettingsButton.addEventListener("click", LoadAccountSettingsMenu);
    }

    /*listener for the back buttons on different menu pages */
    function BackButtonListener(){
        const BackButton = SideMenuContent.querySelector(".BackButton")
        BackButton.addEventListener("click", LoadMainMenu);
    }

    /*Load the main menu */
    LoadMainMenu();

});