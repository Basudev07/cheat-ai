# Cheat AI – Smart Screen Question Solver

![Cheat AI](https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini-API-blueviolet?style=for-the-badge&logo=google)

**Cheat AI** is a smart Chrome extension that uses **Google's Gemini AI API** to extract questions directly from your screen and answer them instantly.

Perfect for online quizzes, learning platforms, or practice sets — this tool gives you AI-generated answers on the fly using OCR and Gemini's powerful LLM.

---

##  Features

-  Extracts text and questions from visible screen content
-  Sends questions to Gemini AI and displays answers instantly
-  Runs entirely as a Chrome Extension — no external apps needed
-  Lightweight, fast, and easy to use
-  Private: You control your own Gemini API key

---

## Installation Guide

###  Step 1: Clone the Repository

git clone https://github.com/Basudev07/cheat-ai.git
cd cheat-ai

---

### Step 2: Add Your Gemini API Key
Open the env.js file and replace the placeholder with your real key from Google AI Studio:
// env.js
const API_KEY = 'your api key here...';


### Step 3: Load the Extension in Chrome
1.Open Google Chrome

2.Navigate to chrome://extensions/

3.Enable Developer Mode (top right corner)

4.Click “Load unpacked”

5.Select the root folder of this project (e.g., cheat-ai/)

6.You’ll now see Cheat AI in your extensions!

---

### Requirements
- Google Chrome (latest)
- Google Gemini API key (from AI Studio)


---

## 🗂️ Project Structure
```txt
 cheat-ai/
├── assets/ # Icons and images
├── content.js # Runs on page to capture content
├── popup.html # Extension popup UI
├── popup.js # Logic for popup interface
├── env.js # 🔐 Your Gemini API key goes here
├── manifest.json # Chrome extension config
└── style.css # Popup styling

*If you like this project, don't forget to star it on GitHub!*

© B A S U D E V



