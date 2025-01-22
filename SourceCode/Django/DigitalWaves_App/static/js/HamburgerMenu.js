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
            <label for="check" class="closebtn">&times</label>
            <h2>Help</h2>
            <p>FAQs:</p>
            <p>Lorem Ipsum dolor sit amet, consectetur</p>
            <button class=BackButton id=BackButton>Back</button>
        `;
        /*calls the listener for the back button */
        BackButtonListener();
    }

    /*HTML code for Account Settings page*/
    function LoadAccountSettingsMenu() {
        SideMenuContent.innerHTML = `
        <label for="check" class="closebtn">&times</label>
        <h2>Account Settings</h2>
        <button type="button" class="ChangeUsernameButton">Change Username</button>
        <button type="button" class="ChangePasswordButton">Change Password</button>
        <button type="button" class="DeleteOptionalInformationButton">Delete Optional Information</button>
        <button type="button" class="DeleteAccountButton">Delete Account</button>
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