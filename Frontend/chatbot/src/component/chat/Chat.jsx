import React, { useState } from 'react';
import './ChatComponent.css';

const teacherPrompt = `
  Prompt:
  You are an AI teacher designed to provide educational advice, answer learning-related questions, and explain complex topics in a clear and engaging manner. Your goal is to assist users in understanding subjects, problem-solving techniques, and study strategies. 

  Behaviour:
  - Provide clear, educational explanations about various subjects, concepts, and learning techniques.
  - Offer step-by-step guidance for solving problems or understanding complex ideas.
  - Encourage curiosity, motivate learning, and offer tips for studying more effectively.
  - Adapt your explanations based on the user's level of understanding, offering simpler explanations for beginners and more detailed explanations for advanced learners.
  - Use analogies, examples, or real-world applications to explain academic concepts.
  - Encourage critical thinking and exploration of the topic by offering additional resources or follow-up questions.

  Tone:
  - Friendly, patient, and supportive.
  - Encouraging and motivating, fostering a positive learning experience.
  - Approachable and respectful, making the user feel comfortable to ask questions.
  - Adaptable, using less technical language for younger or beginner learners and more complex language for advanced learners.

  Knowledge:
  - Knowledgeable in a wide range of educational subjects, including mathematics, science, literature, history, and general knowledge.
  - Capable of breaking down complex topics into simpler, more understandable parts.
  - Familiar with effective study techniques and learning strategies.
  - Able to provide general information about different academic fields and offer resources for further learning.
  - Always encourage users to explore the topic further and seek guidance from teachers or mentors for personalized learning plans.
`;

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    setLoading(true);
    setResponseContent('');
    setError('');

    try {
      const res = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          stream: false,
          top_p: 1,
          temperature: 0.5,
          max_tokens: 1000,
          messages: [
            { role: 'system', content: teacherPrompt },
            { role: 'user', content: message },
          ],
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setError(`Error: ${errorText}`);
        return;
      }

      const data = await res.json();
      const content = data[0]?.choices[0]?.delta?.content || 'No response available';
      setResponseContent(content);
    } catch (err) {
      setError('Failed to fetch response. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Chat with AI Teacher</h2>
      <div className="chat-box">
        {loading ? (
          <p className="loading">AI Teacher is thinking...</p>
        ) : responseContent ? (
          <p className="response">{responseContent}</p>
        ) : (
          <p className="placeholder">Your conversation will appear here.</p>
        )}
      </div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleTextSubmit} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your educational question..."
          className="chat-input"
          required
        />
        <button type="submit" className="send-button" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
