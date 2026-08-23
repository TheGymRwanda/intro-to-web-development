// Get the current year
const currentYear = new Date().getFullYear();
// Display it in the footer
document.getElementById("current-year").textContent = currentYear;


// Change Background Color in Coding journey section 
function changeBackgroundColor(color) {
    let sections = document.getElementsByClassName("Coding-journey-section");

    for (let section of sections) {
        section.style.backgroundColor = color;
        section.style.transition = "background-color 0.5s ease";
    }
}

document.querySelector(".intro").addEventListener('click', () => changeBackgroundColor("#2CA02C"));
document.querySelector(".react").addEventListener('click', () => changeBackgroundColor("#FF7F0E"));
document.querySelector(".backend").addEventListener('click', () => changeBackgroundColor("#9467BD"));
