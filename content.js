// List of common question words
const QUESTION_WORDS = [
  'who', 'what', 'when', 'where', 'why', 'how', 'which', 'whose', 'whom',
  'is', 'are', 'can', 'does', 'do', 'did', 'will', 'would', 'should', 'could', 'may', 'might'
];

function extractQuestions(text) {
  const sentences = text.match(/[^.!?\n]+[.!?\n]?/g) || [];
  return sentences.filter(sentence => {
    const trimmed = sentence.trim();
    if (!trimmed) return false;
    // Check if ends with question mark
    if (trimmed.endsWith('?')) return true;
    // Check if starts with question word
    const firstWord = trimmed.split(/\s+/)[0].toLowerCase();
    return QUESTION_WORDS.includes(firstWord);
  });
}

function getVisibleText() {
  let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let text = '';
  let node;
  while (node = walker.nextNode()) {
    if (node.parentNode && getComputedStyle(node.parentNode).display !== 'none') {
      text += node.textContent + ' ';
    }
  }
  return text;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'extract_questions') {
    const text = getVisibleText();
    const questions = extractQuestions(text);
    sendResponse({ questions });
  }
}); 