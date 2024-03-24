// script.js
document.addEventListener('DOMContentLoaded', function() {
    const wordlistSelect = document.getElementById('wordlist');
    const directionSelect = document.getElementById('direction');
    const wordDisplay = document.getElementById('word');
    const translationInput = document.getElementById('translation');
    const submitButton = document.getElementById('submit');
    const nextButton = document.getElementById('next');
    const feedbackMessage = document.getElementById('feedback');
    const answerDisplay = document.getElementById('answer');
  
    let wordPairs = []; // Array to store word pairs
    let currentIndex = 0; // Index to keep track of current word pair
  
    // Fetch word pairs from JSON file
    async function fetchWordPairs() {
      try {
        const response = await fetch('wordpairs.json');
        const data = await response.json();
        wordPairs = data;
        displayWordPair();
      } catch (error) {
        console.error('Error fetching word pairs:', error);
        feedbackMessage.textContent = 'Error fetching word pairs. Please try again later.';
      }
    }
  
    // Display a random word pair
    function displayWordPair() {
      const randomIndex = Math.floor(Math.random() * wordPairs.length);
      currentIndex = randomIndex;
      wordDisplay.textContent = directionSelect.value === 'en-to-nl' ? wordPairs[randomIndex].english : wordPairs[randomIndex].dutch;
    }
  
    // Submit button click event
    submitButton.addEventListener('click', function() {
      const userTranslation = translationInput.value.trim().toLowerCase();
      const correctTranslation = directionSelect.value === 'en-to-nl' ? wordPairs[currentIndex].dutch.toLowerCase() : wordPairs[currentIndex].english.toLowerCase();
      if (userTranslation === correctTranslation) {
        feedbackMessage.textContent = 'Correct!';
      } else {
        feedbackMessage.textContent = 'Incorrect. Try again.';
      }
      answerDisplay.textContent = `Correct answer: ${correctTranslation}`;
    });
  
    // Next button click event
    nextButton.addEventListener('click', function() {
      translationInput.value = ''; // Clear input field
      feedbackMessage.textContent = ''; // Clear feedback message
      answerDisplay.textContent = ''; // Clear answer display
      displayWordPair(); // Display next word pair
    });
  
    // Fetch word pairs when the page loads
    fetchWordPairs();
  });
  