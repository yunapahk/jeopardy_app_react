import React, { useState } from 'react';

const Jeopardy = () => {
    // Initialize useState hook to store the current question or null if no question is fetched yet
    const [questionData, setQuestion] = useState(null);

    // Initialize useState hook to store whether the answer is shown or hidden
    const [showAnswer, setShowAnswer] = useState(false);

    // Initialize useState hook to store the current score starting at 0
    const [score, setScore] = useState(0);


    // // Function to fetch a random trivia question from the API and update the question state
    const fetchRandomQuestion = async () => {
        try {
            // GET request to API
            const response = await fetch('https://jservice.io/api/random');

            // Extract JSON data from response
            const data = await response.json();

            // Update question state with the fetched data
            setQuestion(data[0]);

            // Reset showAnswer state to false
            setShowAnswer(false);

            // Checking that the data received from API is an array
            // data.length > 0 means that the array has at least one element
            if (Array.isArray(data) && data.length > 0) {
                // If the condition is true, update question state with the first element of the array to the question state
                setQuestion(data[0]);

                // Sets the showAnswer state to false whenever a new question is fetched
                setShowAnswer(false);
            } else {
                // If the condition is false, log an error message
                console.log('No data from API. Fix me!');
            }
        } catch (error) {
            console.log('Hmmm... Something is wrong. Fix me!', error);
        }
    };

    // When button is clicked, the handleShowAnswer function is called and the showAnswer state is set to true
    const handleShowAnswer = () => {
        setShowAnswer(true);
    };

   // Function to update the player's score based on the current value
    const handleAddPoints = () => {
    // Use a callback function to receive the current value of the score state as an argument and return the new value for the score state
    // Use the optional chaining operator: ? to check if the question is null or undefined
    // If 'question' is null, add 0 to the current score 
        setScore((prevScore) => prevScore + (questionData?.value || 0));
    };
      
    // Function to subtract points from player's score
    const handleSubtractPoints = () => {
        // If question is null value is 0
        setScore((prevScore) => prevScore - (questionData?.value || 0)); 
    };
    
    return (
        <div>
            <h1>Welcome to Jeopardy!</h1>
            <div>
                {/* Button to fetch a random trivia question */}
                <button onClick={fetchRandomQuestion}>Random Trivia Question</button>
            </div>
            
            <div>
                {/* Display the question, category, points, and option to show the answer */}
                <h2>Question</h2>
                {/* Ensure that the question object is not null before accessing its properties or else TypeError will be thrown */}
                <p>Category: {questionData?.category?.title}</p>
                <p>Points: {questionData?.value}</p>
                <p>Question: {questionData?.question}</p>
                {showAnswer && <p>Answer: {questionData.answer}</p>}
                <button onClick={handleShowAnswer}>Show Answer</button>
            </div>

            <div>
                {/* Display the player's score and buttons to add/subtract points */}
                <h2>Score</h2>
                <p>Score: {score}</p>
                <button onClick={handleAddPoints}>Add Points</button>
                <button onClick={handleSubtractPoints}>Subtract Points</button>
            </div>
        </div>
    );
    };


export default Jeopardy;