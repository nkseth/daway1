import React, { Component } from 'react';
import Question from './question/Question';
import Answer from './answer/Answer';
import './QuizMain.css';

import Timer from 'react-compound-timer'
import { Button } from '@material-ui/core';

export default class Quiz extends Component {

    // initiating the local state
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.testquestions,
            correctAnswer: 0,
            clickedAnswer: 0,
            step: 1,
            score: 0,
            starttest: false,
            result: null,

        };
    }


    // the method that checks the correct answer
    checkAnswer = answer => {
        const { correctAnswers, step, score } = this.state;
        if (answer === correctAnswers[step]) {
            this.setState({
                step: step + 1,
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer

            });
        } else {
            this.setState({
                step: step + 1,
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    // method to move to the next question
    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }

    render() {
        let { quiestions, answers, correctAnswer, clickedAnswer, step, score } = this.state;
        return (
            <div className="Content">

                {
                    this.state.starttest ?



                        this.state.step <= Object.keys(quiestions).length ?

                            (<>
                                <div>
                                    <div>
                                        <Timer
                                            initialTime={this.state.timer}
                                            checkpoints={[
                                                {
                                                    time: 0,
                                                    callback: () => { this.setState({ ...this.state, step: Object.keys(quiestions).length + 1 }) }
                                                }
                                            ]}
                                            startImmediately
                                            direction="backward"
                                            onStop={() => console.log('onStop hook')}
                                        >

                                            <Timer.Hours />:
            <Timer.Minutes />:
            <Timer.Seconds />
                                        </Timer>
                                    </div>

                                    <div>
                                        {this.state.step}/{Object.keys(quiestions).length}
                                    </div>

                                </div>

                                <Question
                                    question={quiestions[step]}
                                />
                                <Answer
                                    answer={answers[step]}
                                    step={step}
                                    checkAnswer={this.checkAnswer}
                                    correctAnswer={correctAnswer}
                                    clickedAnswer={clickedAnswer}
                                />

                            </>) : (
                                <div className="finalPage">
                                    <h1>You have completed the quiz!</h1>
                                    <p>Your score is: {score} of {Object.keys(quiestions).length}</p>
                                    {
                                        (score / Object.keys(quiestions).length) * 100 >= this.state.passingmasks ?
                                            () => this.setState({ result: 'pass' }) : () => this.setState({ result: 'pass' })
                                    }
                                    <div>{this.state.result}fgjmnvbdf</div>
                                    <p>Thank you!</p>

                                </div>
                            ) : <div>this is where all instrustions will be given

                        <Button onClick={() => { this.setState({ ...this.state, starttest: true }) }}>START TEST</Button>
                        </div>

                }
            </div>
        );
    }
}