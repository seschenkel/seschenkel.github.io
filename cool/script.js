document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('languageSelect');
    const exerciseArea = document.getElementById('exerciseArea');
    const submitBtn = document.getElementById('submitBtn');
    const feedback = document.getElementById('feedback');
    const correctAnswer = document.getElementById('correctAnswer');
    const progressChart = document.getElementById('progressChart');
    let currentExercise = null;
    let totalCorrectAnswers = 0;
    let totalExercises = 0;
  
    // Exercise types
    const exerciseTypes = {
      FILL_IN_THE_BLANK: 'fill-in-the-blank',
      MATCHING: 'matching'
    };
  
    // Function to update progress chart
    function updateProgressChart() {
      const accuracy = totalExercises > 0 ? (totalCorrectAnswers / totalExercises * 100).toFixed(2) : 0;
  
      // Update or initialize chart
      if (progressChart.dataset.chart === 'initialized') {
        progressChart.data.datasets[0].data = [accuracy];
        progressChart.update();
      } else {
        progressChart.dataset.chart = 'initialized';
        new Chart(progressChart, {
          type: 'bar',
          data: {
            labels: ['Accuracy'],
            datasets: [{
              label: 'Accuracy',
              data: [accuracy],
              backgroundColor: '#FF9800'
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  max: 100
                }
              }]
            }
          }
        });
      }
    }
  
    // Function to display fill-in-the-blank exercise
    function displayFillInTheBlankExercise(wordPair) {
      currentExercise = {
        type: exerciseTypes.FILL_IN_THE_BLANK,
        english: wordPair.english,
        dutch: wordPair.dutch
      };
      exerciseArea.innerHTML = `
        <p>Translate: <input type="text" id="fillInTheBlankInput" placeholder="Enter translation..."></p>
      `;
    }
  
    // Function to display matching exercise
    function displayMatchingExercise(wordPair) {
      currentExercise = {
        type: exerciseTypes.MATCHING,
        english: wordPair.english,
        dutch: wordPair.dutch
      };
      exerciseArea.innerHTML = `
        <p>Match the English word to its Dutch translation:</p>
        <div class="matching-options">
          <div class="option" data-translation="${wordPair.dutch}">${wordPair.english}</div>
          <!-- Add more options for other translations -->
        </div>
      `;
    }
  
    // Event listener for submit button
    submitBtn.addEventListener('click', function() {
      if (!currentExercise) return;
  
      let userAnswer = null;
  
      if (currentExercise.type === exerciseTypes.FILL_IN_THE_BLANK) {
        userAnswer = document.getElementById('fillInTheBlankInput').value.trim().toLowerCase();
      } else if (currentExercise.type === exerciseTypes.MATCHING) {
        const selectedOption = document.querySelector('.matching-options .selected');
        userAnswer = selectedOption ? selectedOption.dataset.translation.toLowerCase() : null;
      }
  
      if (userAnswer === currentExercise.dutch.toLowerCase()) {
        feedback.textContent = 'Correct!';
        correctAnswer.textContent = '';
        totalCorrectAnswers++;
      } else {
        feedback.textContent = 'Incorrect. Try again.';
        correctAnswer.textContent = `Correct answer: ${currentExercise.dutch}`;
      }
  
      totalExercises++;
      updateProgressChart();
      displayRandomExercise();
    });
  
    // Function to display a random exercise
    function displayRandomExercise() {
      const randomIndex = Math.floor(Math.random() * wordPairs.length);
      const randomWordPair = wordPairs[randomIndex];
  
      const exerciseType = Math.random() < 0.5 ? exerciseTypes.FILL_IN_THE_BLANK : exerciseTypes.MATCHING;
  
      if (exerciseType === exerciseTypes.FILL_IN_THE_BLANK) {
        displayFillInTheBlankExercise(randomWordPair);
      } else {
        displayMatchingExercise(randomWordPair);
      }
    }
  
    // Initialize: Fetch word pairs based on selected language
    function initialize() {
      fetchWordPairs(languageSelect.value);
      displayRandomExercise();
    }
  
    // Initial fetch for default language
    initialize();
  });
  