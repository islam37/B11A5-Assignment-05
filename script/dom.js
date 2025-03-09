// Theme Change
const themes = ["theme1", "theme2", "theme3"];
let currentThemeIndex = 0;

document.getElementById("theme-change").addEventListener("click", function() {
    let body = document.body;
    
    // Change theme by updating body ID
    body.id = themes[currentThemeIndex];
    
    // Update theme index
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
});


document.addEventListener("DOMContentLoaded", function () {
    // Select elements
    const taskCount = document.getElementById("decrease-num");
    const completedCount = document.getElementById("increase-num");
    const completeButtons = document.querySelectorAll("[id^='complete-']");
    const activityLog = document.querySelector("aside"); // Activity log container
    const clearHistoryBtn = document.getElementById("clear-history");

    // show alert
    function updateCounts(event) {
        let taskNumber = parseInt(taskCount.textContent);
        let completedNumber = parseInt(completedCount.textContent);

        if (taskNumber > 0) {
            // Get task title from button's parent card
            let taskTitle = event.target.closest("div").querySelector("h3").textContent;
            
            // Show an alert with the task name
            alert(`Task Completed: ${taskTitle}`);

            // Update counts
            taskCount.textContent = taskNumber - 1;
            completedCount.textContent = completedNumber + 1;

            // Add to activity log
            addToActivityLog(taskTitle);

            // Disable the clicked button
            event.target.disabled = true;
            event.target.classList.add("bg-gray-400", "cursor-not-allowed");
            event.target.textContent = "Completed";
        }
    }

    // Function to add completed task to activity log
    function addToActivityLog(taskTitle) {
        const logEntry = document.createElement("p");
        logEntry.textContent = `✔ Completed: ${taskTitle}`;
        logEntry.classList.add("text-green-600", "font-semibold", "mt-2");

        activityLog.appendChild(logEntry);
    }

    // Function to clear activity log
    function clearActivityLog() {
        const logs = activityLog.querySelectorAll("p");
        logs.forEach((log) => log.remove());
    }

    // Add event listener to each "Complete" button
    completeButtons.forEach((button) => {
        button.addEventListener("click", updateCounts);
    });

    // Add event listener to "Clear History" button
    clearHistoryBtn.addEventListener("click", clearActivityLog);

    // Function to update the current date
    function updateCurrentDate() {
        const dateElement = document.querySelector(".text-gray-600.text-sm p"); // Select the date element
        const today = new Date();
        const options = { weekday: "short", month: "short", day: "2-digit", year: "numeric" };
        const formattedDate = today.toLocaleDateString("en-US", options);
        dateElement.textContent = formattedDate; // Update the date
    }

    updateCurrentDate(); // Call function
});
