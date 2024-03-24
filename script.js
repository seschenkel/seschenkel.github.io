document.addEventListener("DOMContentLoaded", function() {
    const languageSelect = document.getElementById("languageSelect");
    const wordDisplay = document.getElementById("wordDisplay");
    const translationInput = document.getElementById("translationInput");
    const submitBtn = document.getElementById("submitBtn");
    const nextBtn = document.getElementById("nextBtn");
    const feedback = document.getElementById("feedback");

    let words = []; // Will hold the loaded word pairs from JSON

    // Fetch data from JSON file
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            words = data;
            displayWordPair();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            feedback.textContent = 'Error fetching data. Please try again later.';
        });

    // Display random word pair
    function displayWordPair() {
        const randomIndex = Math.floor(Math.random() * words.length);
        const selectedWord = words[randomIndex];
        if (languageSelect.value === 'english-dutch') {
            wordDisplay.textContent = selectedWord.english;
        } else {
            wordDisplay.textContent = selectedWord.dutch;
        }
    }

    // Submit button click event
    submitBtn.addEventListener("click", function() {
        const userTranslation = translationInput.value.trim().toLowerCase();
        const currentWord = wordDisplay.textContent.trim().toLowerCase();
        if (userTranslation === currentWord) {
            feedback.textContent = 'Correct!';
        } else {
            feedback.textContent = 'Incorrect. The correct translation is: ' + getCurrentTranslation();
        }
    });

    // Next button click event
    nextBtn.addEventListener("click", function() {
        displayWordPair();
        translationInput.value = ''; // Clear input field
        feedback.textContent = ''; // Clear feedback
    });

    // Get the translation based on the current language selection
    function getCurrentTranslation() {
        const currentWord = wordDisplay.textContent.trim().toLowerCase();
        const selectedWord = words.find(word => word.english.toLowerCase() === currentWord || word.dutch.toLowerCase() === currentWord);
        return languageSelect.value === 'english-dutch' ? selectedWord.dutch : selectedWord.english;
    }

    // Language select change event
    languageSelect.addEventListener("change", function() {
        displayWordPair();
        translationInput.value = ''; // Clear input field
        feedback.textContent = ''; // Clear feedback
    });
});
