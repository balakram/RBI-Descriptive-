
window.onload = function () {
    // Display the login page initially
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('mainPage').style.display = 'none';

    // Event listener for the "Start Simulator" button
    document.getElementById('startSimulatorBtn').addEventListener('click', function () {
        // Get the user's name
        var userName = document.getElementById('userNameInput').value;

        // Display the main page and hide the login page
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';

        // Display a welcome message with the user's name
        document.getElementById('welcomeMessage').innerText = 'All The Best ' + userName + ' !';

        // Call the function to start the simulator or any other initialization logic
        startSimulator();
    });

    // Function to start the simulator (replace with your logic)
   /* function startSimulator() {
        // Add your existing simulator initialization logic here

        // Set the time limit in seconds (e.g., 1500 seconds for 5 minutes)
        var timeLimit = 1500;
        var timer = setInterval(function () {
            timeLimit--;
            if (timeLimit <= 0) {
                // Time is over, automatically submit the response
                submitResponse();
                clearInterval(timer);
            }
            // Update the timer display
            document.getElementById('timer').innerText = 'Time Left: ' + formatTime(timeLimit);
        }, 1000);
    }*/
    
    /*function startSimulator() {
        // Get the selected time limit in seconds
        var selectedTimeLimit = parseInt(document.getElementById('timeLimitSelect').value);
    
        // Add your existing simulator initialization logic here
    
        var timer = setInterval(function () {
            selectedTimeLimit--;
            if (selectedTimeLimit <= 0) {
                // Time is over, automatically submit the response
                submitResponse();
                clearInterval(timer);
            }
            // Update the timer display
            document.getElementById('timer').innerText = 'Time Left: ' + formatTime(selectedTimeLimit);
        }, 1000);
    }*/

    function startSimulator() {
        // Get the selected time limit in seconds
        var selectedTimeLimit = parseInt(document.getElementById('timeLimitSelect').value);
    
        // Start the timer when the simulator begins
        startTimer();
    
        // Add your existing simulator initialization logic here
    
        var timer = setInterval(function () {
            selectedTimeLimit--;
            if (selectedTimeLimit <= 0) {
                // Time is over, automatically submit the response
                submitResponse();
                clearInterval(timer);
            }
            // Update the timer display
            document.getElementById('timer').innerText = 'Time Left: ' + formatTime(selectedTimeLimit);
        }, 1000);
    }
    

        //These event listeners use window.location.href to navigate to the specified HTML pages when the buttons are clicked.
        document.getElementById('homeBtn').addEventListener('click', function () {
            window.location.href = 'index.html';
        });
        
        document.getElementById('syllabusBtn').addEventListener('click', function () {
            window.location.href = 'syllabus.html';
        });

    // Function to format time in MM:SS format
    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        return pad(minutes) + ':' + pad(remainingSeconds);
    }

    // Function to pad single-digit numbers with leading zero
    function pad(val) {
        var valString = val + '';
        if (valString.length < 2) {
            return '0' + valString;
        } else {
            return valString;
        }
    }

    // Function to submit the response
    function submitResponse() {
        var userResponse = document.getElementById('textArea').value;
        alert('Response submitted:\n\n' + userResponse);
        // You can save the response to a server or perform further actions here.
        var textToSave = document.getElementById('textArea').value;
        var hiddenElement = document.createElement('a');

        hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'myFile.txt';
        hiddenElement.click();
    }

    // Add event listeners for question navigation buttons
    document.getElementById('prevBtn').addEventListener('click', function () {
        navigateQuestion(-1);
    });

    document.getElementById('nextBtn').addEventListener('click', function () {
        navigateQuestion(1);
    });
    

    function navigateQuestion(direction) {
        currentQuestion += direction;
        updateNavigationButtons();
        // Perform additional logic for question navigation if needed
    }

    function updateNavigationButtons() {
        document.getElementById('prevBtn').disabled = currentQuestion === 1;
        document.getElementById('nextBtn').disabled = currentQuestion === totalQuestions;
    }

    // Add scroll event listener to update scroll position
    var textarea = document.getElementById('textArea');
    textarea.addEventListener('scroll', function () {
        var scrollPosition = textarea.scrollTop;
        document.getElementById('scrollPosition').innerText = scrollPosition;
    });

    document.getElementById('textArea').addEventListener('input', updateWordCount);
    document.getElementById('textArea').addEventListener('keydown', handleKeyDown);

    document.getElementById('submitBtn').addEventListener('click', function () {
        submitResponse();
    });

        // Function to update word count
        function updateWordCount() {
            var text = document.getElementById('textArea').value;
            var words = text.match(/\S+/g);
            var wordCount = words ? words.length : 0;
            document.getElementById('wordCount').innerText = 'Words: ' + wordCount;
        }
    
        document.getElementById('textArea').addEventListener('input', updateWordCount);

        // Function to handle keydown events in the textarea
            function handleKeyDown(event) {
                // Check for consecutive spaces and ignore extra spaces after a space
                if (event.key === ' ' && event.target.value.endsWith(' ')) {
                    event.preventDefault();
                }
            }

                            // Start the timer when the page loads
                            let startTime;

                            function startTimer() {
                                startTime = new Date();
                            }
        
                            function stopTimer() {
                                if (!startTime) {
                                    return 'Timer not started';
                                }
        
                                const endTime = new Date();
                                const timeTaken = (endTime - startTime) / 1000;
                                const minutes = Math.floor(timeTaken / 60);
                                const seconds = Math.floor(timeTaken % 60);
                                return `${minutes} m :${seconds < 10 ? '0' : ''}${seconds} s`;
                                }
        
    
                // Function to submit the response
              /*  function submitResponse() {
                    var userResponse = document.getElementById('textArea').value;
                    var questionContent = document.getElementById('textQuestion').value;

                    // Show alert with content
                    var alertMessage = 'Question:\n\n' + questionContent + '\n\nAnswer:\n\n' + userResponse;
                    var isConfirmed = confirm(alertMessage);

                    if (isConfirmed) {
                        // Create a Blob with the response content
                        var blob = new Blob(['Question:\n\n' + questionContent + '\n\n' + '\n\nAnswer:\n\n' + userResponse], { type: 'text/plain' });

                        // Create a link element for downloading
                        var downloadLink = document.createElement('a');
                        downloadLink.href = window.URL.createObjectURL(blob);
                        downloadLink.download = 'precis.txt';

                        // Append the link to the document and trigger the download
                        document.body.appendChild(downloadLink);
                        downloadLink.click();

                        // Remove the link element from the document
                        document.body.removeChild(downloadLink);
                    }
                }*/

                                // Function to submit the response
                                function submitResponse() {
                                    var userResponse = document.getElementById('textArea').value;
                                    var questionContent = document.getElementById('textQuestion').value;
            
                                    // Get the time left and word count
                                // var timeLeft = document.getElementById('timer').innerText.split(': ')[1];
                                    var wordCount = document.getElementById('wordCount').innerText.split(': ')[1];
            
                                        // Get the time taken
                                        const timeTaken = stopTimer();
            
                                    // Show alert with content
                                    var alertMessage = 'Question:\n' + questionContent + '\n\nAnswer:\n' + userResponse + '\n\nWord Count: ' + wordCount + '\nTime taken: ' + timeTaken;
            
                                    var isConfirmed = confirm(alertMessage);
            
                                    if (isConfirmed) {
                                        // Create a Blob with the response content
                                        var blob = new Blob(['Question:\n' + questionContent + '\n\n' + '\n\nAnswer:\n' + userResponse + '\n\n'
                                                            + '\n\nWord Count: ' + wordCount  + '\n\nTime Taken: ' + timeTaken], { type: 'text/plain' });
            
                                        // Create a link element for downloading
                                        var downloadLink = document.createElement('a');
                                        downloadLink.href = window.URL.createObjectURL(blob);
                                        downloadLink.download = 'Precis.txt';
            
                                        // Append the link to the document and trigger the download
                                        document.body.appendChild(downloadLink);
                                        downloadLink.click();
            
                                        // Remove the link element from the document
                                        document.body.removeChild(downloadLink);
                                    }
                                }

            
// Function to handle keydown events in the textarea
function handleKeyDown(event) {
    // Check for consecutive spaces and ignore extra spaces after a space
    if (event.key === ' ' && event.target.value.endsWith(' ')) {
        event.preventDefault();
    } else if (event.key === 'Enter' && /\s/.test(event.target.value.slice(-1))) {
        event.preventDefault();
    }
}


    

};

