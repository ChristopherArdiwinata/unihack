import React, { useState, useEffect } from 'react';
import { fetchChatGPTResponse } from '../Services/AuthServices/ChatAPI';

// Define the interface for the question response
interface AnswerOption {
  isCorrectAnswer: boolean;
  answerContent: string;
  imageUrl?: string;
}

interface QuestionResponse {
  wordedQuestionString: string;
  possibleAnswers: AnswerOption[];
  modelableWithImage: boolean;
}

const ChatComponent = () => {
  const [questionResponse, setQuestionResponse] = useState<QuestionResponse | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = async () => {
    const generationPrompt = `Please generate a multiple choice question about computer science with one correct answer in the following format (it is very important that the response you give me ONLY adheres to the following format as I will be using the response directly to parse as data, so don't say anythign else just adhere to the following format): 
    {
      "wordedQuestionString": "What is a correct question?",
      "possibleAnswers": [
        {"isCorrectAnswer": false, "answerContent": "Answer 1"},
        {"isCorrectAnswer": false, "answerContent": "Answer 2"},
        {"isCorrectAnswer": true, "answerContent": "Answer 3"},
        {"isCorrectAnswer": false, "answerContent": "Answer 4"}
      ],
      "modelableWithImage": true //(if you think that the options are better off being shown as an image indicate there here)
    }`;
    
    try {
      const chatResponse = await fetchChatGPTResponse(generationPrompt);
      const formattedResponse = JSON.parse(chatResponse); // Ensure this matches the actual response
      setQuestionResponse(formattedResponse);
      // Reset selected answers when generating a new question
      setSelectedAnswers(new Array(formattedResponse.possibleAnswers.length).fill(false));
    } catch (error) {
      console.error('Error generating question:', error);
    }
  };

  const handleAnswerClick = (index: number) => {
    // Set the selected answer and its correctness
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[index] = !updatedSelectedAnswers[index];
    setSelectedAnswers(updatedSelectedAnswers);
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <button
        onClick={generateQuestion}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: 'pointer',
          margin: '20px 0',
        }}
      >
        Generate Question
      </button>
      {questionResponse && (
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <p style={{
            background: '#f4f4f4',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}>
            {questionResponse.wordedQuestionString}
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {questionResponse.possibleAnswers.map((answer, index) => (
              <li
                key={index}
                onClick={() => handleAnswerClick(index)}
                style={{
                  cursor: 'pointer',
                  background: selectedAnswers[index] ? '#e9ecef' : '',
                  padding: '10px 15px',
                  margin: '5px 0',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  textDecoration: selectedAnswers[index] ? 'none' : 'none',
                  position: 'relative',
                }}
              >
                {answer.answerContent}
                {selectedAnswers[index] && (
                  <span style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1.5rem',
                    color: answer.isCorrectAnswer ? 'green' : 'red',
                  }}>
                    {answer.isCorrectAnswer ? "✅" : "❌"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  
};

export default ChatComponent;
