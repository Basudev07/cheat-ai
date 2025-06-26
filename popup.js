const questionsList = document.getElementById('questions-list');
const getAnswerBtn = document.getElementById('get-answer-btn');
const answerContainer = document.getElementById('answer');

let selectedQuestion = null;
let questions = [];

function renderQuestions(questions) {
  questionsList.innerHTML = '';
  questions.forEach((q, idx) => {
    const li = document.createElement('li');
    li.textContent = q;
    li.tabIndex = 0;
    li.addEventListener('click', () => selectQuestion(idx));
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter') selectQuestion(idx); });
    questionsList.appendChild(li);
  });
}

function selectQuestion(idx) {
  selectedQuestion = questions[idx];
  Array.from(questionsList.children).forEach((li, i) => {
    li.classList.toggle('selected', i === idx);
  });
  getAnswerBtn.disabled = false;
}

function showAnswer(text) {
  answerContainer.textContent = text;
}

function showLoading() {
  answerContainer.textContent = 'Loading...';
}

function showError(msg) {
  answerContainer.textContent = 'Error: ' + msg;
}

getAnswerBtn.addEventListener('click', async () => {
  if (!selectedQuestion) return;
  showLoading();
  try {
    const apiKey = API_KEY;
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Answer the following question directly and concisely: " + selectedQuestion }] }]
      })
    });
    const data = await res.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      showAnswer(data.candidates[0].content.parts.map(p => p.text).join('\n'));
    } else {
      showError('No answer found.');
    }
  } catch (e) {
    showError(e.message);
  }
});

// Request questions from content script
function requestQuestions() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'extract_questions' }, (response) => {
      if (chrome.runtime.lastError || !response) {
        questionsList.innerHTML = '<li>No questions found or unable to extract.</li>';
        return;
      }
      questions = response.questions;
      if (questions.length === 0) {
        questionsList.innerHTML = '<li>No questions found.</li>';
      } else {
        renderQuestions(questions);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', requestQuestions); 