import React, { useState } from 'react';
import './Answer.css';
import Button from '@material-ui/core/Button';

const Answer = (props) => {
    const [ans, setans] = useState(null)
    const [currentans, setcurrentans] = useState(null)
    let answers = Object.keys(props.answer)
        .map((qAnswer, i) => (
            <li
                className=
                {
                    i + 1 == ans ?
                        'correct' : null
                }
                onClick={() => { setans(qAnswer) }}
                key={qAnswer}>
                {props.answer[qAnswer]}
            </li>
        ));

    return (
        <>
            <ul className="Answers">
                {answers}
                <Button onClick={() => { props.checkAnswer(ans); setans(null) }}>Next Question</Button>

            </ul>

        </>
    );
}

export default Answer;