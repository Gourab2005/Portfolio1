// Get the element by its ID
var textElement = document.getElementById('textToChange');

// Function to determine and update text based on scroll height
function updateTextByScrollHeight() {
    var scrollHeight = window.scrollY;

    // Define different texts based on scroll height
    var textFor1000 = "I am good";
    var textFor1500 = "I am bad";
    var textFor2000 = "I am both";

    // Check scroll height and update the text
    if (scrollHeight >= 2000) {
        textElement.textContent = textFor2000;
    } else if (scrollHeight >= 1500) {
        textElement.textContent = textFor1500;
    } else if (scrollHeight >= 1000) {
        textElement.textContent = textFor1000;
    }
}

// Function to update text on scroll
function updateTextOnScroll() {
    updateTextByScrollHeight();
}

// Call the updateTextOnScroll function when the page loads
window.onload = function () {
    // Attach the scroll event listener
    window.addEventListener('scroll', updateTextOnScroll);
};
