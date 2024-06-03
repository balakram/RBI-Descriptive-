let timerInterval;
let elapsedSeconds = 0;
let timerStarted = false;

document.addEventListener('DOMContentLoaded', () => {
    loadPrecis();

    // Add event listeners for restrictions
    const Text = document.getElementById('Text');
    Text.addEventListener('input', handleInputRestrictions);
    Text.addEventListener('keydown', handleKeyRestrictions);
    Text.addEventListener('input', startTimerAutomatically);
});

function savePrecis() {
    const originalText = document.getElementById('originalText').value;
    const Text = document.getElementById('Text').value;

    if (!originalText || !Text) {
        alert('Please enter both the original text and the précis.');
        return;
    }

    const timeTaken = elapsedSeconds;
    const documentList = JSON.parse(localStorage.getItem('documentList')) || [];
    documentList.push({ originalText, Text, timeTaken });
    localStorage.setItem('documentList', JSON.stringify(documentList));

    document.getElementById('originalText').value = '';
    document.getElementById('Text').value = '';

    loadPrecis();
    resetTimer();
}

function loadPrecis() {
    const documentList = JSON.parse(localStorage.getItem('documentList')) || [];
    const documentListDiv = document.getElementById('documentList');
    documentListDiv.innerHTML = '';

    documentList.forEach((precis, index) => {
        const precisDiv = document.createElement('div');
        precisDiv.className = 'precis';
        precisDiv.innerHTML = `
            <h3>Question:</h3><br>
            <p>${precis.originalText}</p>
            <h3>Answer:</h3><br>
            <p>${precis.Text}</p>
            <p><strong>Time Taken:</strong> ${Math.floor(precis.timeTaken / 60)}:${String(precis.timeTaken % 60).padStart(2, '0')}</p>
            <button onclick="deletePrecis(${index})">Delete</button>
        `;
        documentListDiv.appendChild(precisDiv);
    });
}

function deletePrecis(index) {
    const documentList = JSON.parse(localStorage.getItem('documentList')) || [];
    documentList.splice(index, 1);
    localStorage.setItem('documentList', JSON.stringify(documentList));
    loadPrecis();
}

function downloadPrecis() {
    const documentList = JSON.parse(localStorage.getItem('documentList')) || [];
    if (documentList.length === 0) {
        alert('No précis available to download.');
        return;
    }

    let content = '';
    documentList.forEach(precis => {
        content += `Question:\n\n${precis.originalText}\n\n\n\n\n\nAnswer:\n\n${precis.Text}\n\nTime Taken: ${Math.floor(precis.timeTaken / 60)}:${String(precis.timeTaken % 60).padStart(2, '0')}\n\n---\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document_list.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function updateWordCount() {
    const Text = document.getElementById('Text').value;
    const wordCount = Text.trim().split(/\s+/).length;
    document.getElementById('wordCount').textContent = `Word Count: ${wordCount}`;
}

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    elapsedSeconds = 0;
    timerInterval = setInterval(() => {
        elapsedSeconds++;
        document.getElementById('timer').textContent = `Timer: ${Math.floor(elapsedSeconds / 60)}:${String(elapsedSeconds % 60).padStart(2, '0')}`;
    }, 1000);
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    elapsedSeconds = 0;
    timerStarted = false;
    document.getElementById('timer').textContent = `Timer: 0:00`;
}

function handleInputRestrictions(event) {
    const Text = event.target.value;
    event.target.value = Text.replace(/ {2,}/g, ' ');
}

function handleKeyRestrictions(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
}

function startTimerAutomatically() {
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
}
