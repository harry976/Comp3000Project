// JavaScript source code
function OpenTab(ClickEvent, ResultTabName) {

    //loop through every tab content and hide it from view
    let ResultTabContent = document.querySelectorAll(".ResultsTabContent");
    ResultTabContent.forEach(Tab => {
        Tab.style.display = "none"; //changes the display style so the content is hidden
    });
    //Loop through every tab and remove the 'active' tag, that denotes the selected tab
    let ResultsTab = document.querySelectorAll(".ResultsTab");
    ResultsTab.forEach(Tab => {
        Tab.classList.remove("active"); //remove the tag
    });

    document.getElementById(ResultTabName).style.display = "block"; //set the selected tab to visible
    ClickEvent.currentTarget.classList.add("active"); //add the active tag to the selected tab
}