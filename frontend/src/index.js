// ================= IMPORTS =================
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// ================= THEME SETUP =================
// Get saved theme from localStorage
const savedTheme = localStorage.getItem("theme");

// Apply theme to body
if (savedTheme === "dark") {
  document.body.style.backgroundColor = "#101010";
  document.body.style.color = "#ffffff";
} else {
  document.body.style.backgroundColor = "#F2F2F2";
  document.body.style.color = "#000000";
}


// ================= ROOT RENDER =================
// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App inside StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// ================= PERFORMANCE TRACKING =================
// If you want to measure performance, pass a function
// Example: reportWebVitals(console.log)
reportWebVitals();