document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('languageSelect');
    const wordDisplay = document.getElementById('wordDisplay');
    const translationInput = document.getElementById('translationInput');
    const submitBtn = document.getElementById('submitBtn');
    const feedback = document.getElementById('feedback');
    const correctAnswer = document.getElementById('correctAnswer');
  
    let wordPairs = []; // Array to store word pairs
  
    // Function to fetch word pairs from JSON file
    function fetchWordPairs(language) {
      fetch(`wordPairs_${language}.json`)
        .then(response => response.json())
        .then(data => {
          wordPairs = data;
          displayRandomWord();
        })
        .catch(error => console.error('Error fetching word pairs:', error));
    }
  
    // Function to display a random word pair
    function displayRandomWord() {
      const randomIndex = Math.floor(Math.random() * wordPairs.length);
      const randomWordPair = wordPairs[randomIndex];
      wordDisplay.textContent = randomWordPair.english;
      translationInput.value = ''; // Clear input field
    }
  
    // Event listener for submit button
    submitBtn.addEventListener('click', function() {
      const userTranslation = translationInput.value.trim().toLowerCase();
      const currentWord = wordDisplay.textContent.trim().toLowerCase();
      const currentPair = wordPairs.find(pair => pair.english.toLowerCase() === currentWord);
  
      if (userTranslation === currentPair.dutch.toLowerCase()) {
        feedback.textContent = 'Correct!';
        correctAnswer.textContent = '';
        displayRandomWord();
      } else {
        feedback.textContent = 'Incorrect. Try again.';
        correctAnswer.textContent = `Correct answer: ${currentPair.dutch}`;
      }
    });
  
    // Initialize: Fetch word pairs based on selected language
    languageSelect.addEventListener('change', function() {
      const selectedLanguage = this.value;
      fetchWordPairs(selectedLanguage);
    });
  
    // Initial fetch for default language
    fetchWordPairs(languageSelect.value);
  });
  