import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Button } from 'react-bootstrap';
import _ from 'underscore';
import QuizQuestions from '../components/QuizQuestions';
import PointsBar from '../components/PointsBar';
import PullButton from '../components/PullButton';
import { AllCards } from '../../api/allcard/AllCard';
// import { TCards } from '../../api/tcard/TCard';
// import CardPullPopUpBox from '../components/CardPullPopUpBox';

const CardPull = () => {
  // code written by Theodore John.S (Creating a Dynamic Quiz App in React.js Guide)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const handleAnswerSelection = (questionIndex, selectedAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);
  };
  // automatically resets the Quiz once the user reaches the end
  const quizLoop = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowScore(false);
  };
  // code adapted from Theodore John.S (Creating a Dynamic Quiz App in React.js Guide)
  const handleNextQuestion = () => {
    if (
      answers[currentQuestion] === QuizQuestions[currentQuestion].answer ||
      JSON.stringify(answers[currentQuestion]) ===
      JSON.stringify(QuizQuestions[currentQuestion].answer)
    ) {
      setScore(score + 10);
    }
    if (currentQuestion + 1 < QuizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
      quizLoop(() => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowScore(false);
      }, 1000);
    }
  };
  // when points reach 100, a random card from AllCards is selected and added into the TCards (users
  const pullRandomCard = () => {
    const allCards = AllCards.collection.find().fetch();
    console.log(allCards);
    if (allCards.length === 0) {
      throw new Meteor.Error('no-cards', 'No cards found.');
    }
    const randomCard = _.sample(allCards);
    // console.log(randomCard);
    // Assuming TCards is another collection, replace it with your collection
    // TCards.insert(randomCard);
    // generate a pop-up box that lets users know that their card is in collection
    // CardPullPopUpBox();
    // reset Score
    // setScore(0);
  };
  // code adapted from Theodore John.S (Creating a Dynamic Quiz App in React.js Guide)
  return (
    <Col id="pull-page" className="card-pull-page">
      <div id="card-pull-title" className="partition-bar h1">Card Pull Game</div>
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
              {/* eslint-disable-next-line react/jsx-no-bind */}
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
                            <input
                              type="radio"
                              name={`question${currentQuestion}`}
                              value={option}
                              onChange={() => handleAnswerSelection(currentQuestion, option)}
                            />
                            {option}
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
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <div className="partition-bar" />
    </Col>
  );
};

export default CardPull;
