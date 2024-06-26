import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Button } from 'react-bootstrap';
import QuizQuestions from '../components/QuizQuestions';
import PointsBar from '../components/PointsBar';
import PullButton from '../components/PullButton';
import { AllCards } from '../../api/allcard/AllCard';
import { TCards } from '../../api/tcard/TCard';

const CardPull = () => {
  const { ready, cards, currentUser } = useTracker(() => {
    const subscription = Meteor.subscribe(AllCards.userAllPublicationName);
    return {
      cards: AllCards.collection.find().fetch(),
      ready: subscription.ready(),
      currentUser: Meteor.user(),
    };
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAnswerSelection = (questionIndex, selectedAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);
    setErrorMessage(''); // Clear error message when a new answer is selected
  };

  const quizLoop = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowScore(false);
    setErrorMessage(''); // Ensure the error message is cleared at the start of a new quiz
  };

  const handleNextQuestion = () => {
    const isCorrect = (
      answers[currentQuestion] === QuizQuestions[currentQuestion].answer ||
      JSON.stringify(answers[currentQuestion]) === JSON.stringify(QuizQuestions[currentQuestion].answer)
    );

    if (isCorrect) {
      setScore(prevScore => prevScore + 10);
      setErrorMessage(''); // Clear message on correct answer
    } else {
      setErrorMessage('Incorrect! Please try again.');
    }

    if (currentQuestion + 1 < QuizQuestions.length) {
      setCurrentQuestion(prevCurrent => prevCurrent + 1);
    } else {
      setShowScore(true);
      setTimeout(() => {
        quizLoop();
      }, 1000);
    }
  };

  const pullRandomCard = () => {
    // Create a weighted array where card types are repeated based on their weights
    // More common cards will be repeated more so the user has a higher chance of drawing them.
    const weightedCards = [];
    cards.forEach(card => {
      if (card.type === 'Common') {
        const repeatCount = 10;
        for (let i = 0; i < repeatCount; i++) {
          weightedCards.push(card);
        }
      } else if (card.type === 'Rare') {
        const repeatCount = 3;
        for (let i = 0; i < repeatCount; i++) {
          weightedCards.push(card);
        }
      } else if (card.type === 'Legendary') {
        const repeatCount = 1;
        for (let i = 0; i < repeatCount; i++) {
          weightedCards.push(card);
        }
      }
    });

    // Select a random card from the weighted array
    const randomIndex = Math.floor(Math.random() * weightedCards.length);
    const pulledCard = weightedCards[randomIndex];

    const copiedCard = {
      ...pulledCard,
      owner: currentUser.username,
    };

    TCards.collection.insert(copiedCard, (error, result) => {
      if (error) {
        console.log('Error inserting card:', error);
        setTimeout(pullRandomCard, 1000); // Retry after 1 second
      } else {
        console.log('Card added to TCards collection:', result);
        setScore(0); // Reset score after pulling a card
        alert('A new card has been added to your collection!');
      }
    });
  };

  return ready ? (
    <Col id="pull-page" className="card-pull-page">
      <Container fluid className="py-3 text-center" id="title-block">
        <h2 className="pt-2">Card Pull Game</h2>
      </Container>
      <Container>
        <Row id="card-pull-row">
          <div id="about-quiz" className="justify-content-center">Answer questions to gather points. Once you reach 100pts, pull a card!</div>
          <Row className="align-content-center">
            <Col>
              <div id="quiz-points"> Total Pts:</div>
            </Col>
            <Col>
              <PointsBar bgcolor="#fca4cd" completed={score} />
            </Col>
            <Col size={4}>
              <PullButton score={score} resetScore={pullRandomCard} />
            </Col>
          </Row>
          <Col id="quiz-section" className="align-content-center">
            <div className="quiz text-center">
              {showScore ? (
                <div className="score-section">
                  <h2>You scored {score} out of 100</h2>
                </div>
              ) : (
                <div>
                  <div className="question-section">{QuizQuestions[currentQuestion].question}</div>
                  <div className="answer-section">
                    {QuizQuestions[currentQuestion].type === 'radio' && (
                      <ul>
                        {QuizQuestions[currentQuestion].options.map((option, index) => (
                          <li key={index}>
                            <label htmlFor={`radio-${currentQuestion}-${index}`} className="radio-label">
                              <input
                                type="radio"
                                id={`radio-${currentQuestion}-${index}`}
                                name={`question${currentQuestion}`}
                                value={option}
                                onChange={() => handleAnswerSelection(currentQuestion, option)}
                                checked={answers[currentQuestion] === option}
                              />
                              {option}
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                    {QuizQuestions[currentQuestion].type === 'checkbox' && (
                      <ul>
                        {QuizQuestions[currentQuestion].options.map((option, index) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              name={`question${currentQuestion}`}
                              value={option}
                              onChange={() => handleAnswerSelection(currentQuestion, option)}
                            />
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                    {QuizQuestions[currentQuestion].type === 'input' && (
                      <input
                        type="text"
                        onChange={(e) => handleAnswerSelection(currentQuestion, e.target.value)}
                      />
                    )}
                    {QuizQuestions[currentQuestion].type === 'textarea' && (
                      <textarea
                        rows="4"
                        cols="50"
                        onChange={(e) => handleAnswerSelection(currentQuestion, e.target.value)}
                      />
                    )}
                  </div>
                  <Button className="next-button" onClick={handleNextQuestion}>Next Question</Button>
                  {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <div className="partition-bar" />
    </Col>
  ) : null;
};

export default CardPull;
