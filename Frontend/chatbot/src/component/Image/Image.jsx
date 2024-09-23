import React, { useState } from 'react';
import './Image.css';

const ImageGeneratorComponent = () => {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageUrl('');  
    setError('');    

    try {
      const res = await fetch('http://localhost:5001/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: description,
          model: 'cortext-image',
          size: '1024x1024',
          quality: 'standard',
          provider: 'OpenAI',
          steps: 30,
          cfg_scale: 8,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setError(`Error: ${errorText}`);
        return;
      }

      const data = await res.json();
      console.log('Response data:', data);  

      if (data && data[0] && data[0].image_url) {
        setImageUrl(data[0].image_url);
      } else {
        setError('Image URL not found in response.');
      }
    } catch (err) {
      console.error('Error fetching image:', err);
      setError('Failed to fetch image. Please try again.');
    }
  };

  return (
    <div className="image-generator-container">
      <h2 className="image-generator-title">AI Image Generator</h2>
      {error && <p className="error-message">{error}</p>}
      {imageUrl ? (
        <div className="generated-image-container">
          <h3 className="image-subtitle">Generated Image:</h3>
          <img src={imageUrl} alt="Generated" className="generated-image" />
        </div>
      ) : (
        <p className="placeholder">Enter a description to generate an image.</p>
      )}
      <form onSubmit={handleSubmit} className="image-generator-form">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter image description..."
          required
          className="image-input"
        />
        <button type="submit" className="generate-button">
          {imageUrl ? 'Generate Another' : 'Generate Image'}
        </button>
      </form>
    </div>
  );
};

export default ImageGeneratorComponent;
