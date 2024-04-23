import React, { useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import QuizQuestions from '../components/QuizQuestions';

const CardPull = () => {
  // code written by Theodore John.S (Creating a Dynamic Quiz App in React.js Guide)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);

  // code written by Theodore John.S (Creating a Dynamic Quiz App in React.js Guide)
  const handleAnswerSelection = (questionIndex, selectedAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);
  };

  // code written by Theodore John.S (Creating a Dynamic Quiz App in React.js Guide)
  const handleNextQuestion = () => {
    if (
      answers[currentQuestion] === QuizQuestions[currentQuestion].answer ||
      JSON.stringify(answers[currentQuestion]) ===
      JSON.stringify(QuizQuestions[currentQuestion].answer)
    ) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < QuizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  // code adapted from Theodore John.S (Creating a Dynamic Quiz App in React.js Guide)
  return (
    <Col className="card-pull-page">
      <div id="card-pull-title" className="partition-bar h1">Card Pull Game</div>
      <Container>
        <Row id="card-pull-row">
          <Col id="quiz-side-bar">
            <div id="about-quiz">Answer questions to gather points. Once you reach 100pts, pull a card!</div>
            <div id="quiz-points"> Pts: </div>
            <Button id="quiz-button" className="pull-button justify-content-center">Pull Card!</Button>
          </Col>
          <Col id="quiz-section">
            <div className="quiz align-items-center text-center">
              {showScore ? (
                <div className="score-section">
                  You scored {score} out of {QuizQuestions.length}
                </div>
              ) : (
                <>
                  <div>
                    <div className="question-section">{QuizQuestions[currentQuestion].question}</div>
                    <div className="answer-section">
                      {QuizQuestions[currentQuestion].type === 'radio' && (
                        <ul>
                          {QuizQuestions[currentQuestion].options.map((option, index) => (
                            <li key={index}>
                              <Button id="quiz-button">
                                <input
                                  type="radio"
                                  name={`question${currentQuestion}`}
                                  value={option}
                                  onChange={() => handleAnswerSelection(currentQuestion, option)}
                                />
                                {option}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                      {QuizQuestions[currentQuestion].type === 'checkbox' && (
                        <ul>
                          {QuizQuestions[currentQuestion].options.map((option, index) => (
                            <li key={index}>
                              <Button id="quiz-button">
                                <input
                                  type="checkbox"
                                  name={`question${currentQuestion}`}
                                  value={option}
                                  onChange={() => handleAnswerSelection(currentQuestion, option)}
                                />
                                {option}
                              </Button>
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
                    <Button id="quiz-button" onClick={handleNextQuestion}>Next Question</Button>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default CardPull;
