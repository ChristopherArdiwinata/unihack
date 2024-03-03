import React, { useState } from 'react';
import { fetchGeneratedImage } from '../Services/AuthServices/ImageAPI';

type ImageResponse = {
  data: {
    id: string;
    object: string;
    created: number;
    model: string;
    images: string[];
  }
};

const ImageComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    try {
      const data = await fetchGeneratedImage(prompt);
      if (data && data.data.length > 0 && data.data[0].url) {
        setImageURL(data.data[0].url);
      } else {
        console.error('No image URLs present in response:', data);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt for image generation"
      />
      <button onClick={handleGenerateImage}>Generate Image</button>
      {imageURL && (
        <div style={{ width: '256px', height: '256px', overflow: 'hidden' }}>
          <img src={imageURL} alt="Generated" style={{ width: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
