import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ChatComponent from './component/chat/Chat';
import ImageGeneratorComponent from './component/Image/Image';
import './App.css'; // Importing CSS file

function App() {
  return (
    <Router>
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">AI Chatbot</h1> 
          <nav className="nav">
            <Link to="/chat">
              <button className="nav-button">Chat API</button>
            </Link>
            <Link to="/image">
              <button className="nav-button">Image Generator</button>
            </Link>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/chat" element={<ChatComponent />} />
            <Route path="/image" element={<ImageGeneratorComponent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
