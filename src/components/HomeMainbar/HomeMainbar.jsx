import React from 'react'
import './HomeMainbar.css'
import { Link, useLocation , useNavigate } from 'react-router-dom'
import Questions from '../../pages/Questions/Questions'
import Question from './Question'
import QuestionsList from './QuestionsList'
import AskQuestions from '../../pages/AskQuestions/AskQuestions'
import { useSelector } from 'react-redux'
import questionReducer from '../../reducers/questions'
const HomeMainbar = () => {
    const user = 1;
    const location = useLocation()
    const navigate = useNavigate()
    var questionList = useSelector( state => state.questionReducer)
    
    const checkAuth = () =>{
        if (user === null){
            navigate('/Auth')
        }else{
            navigate('/AskQuestions')
        }
    }

    return (
        <div className='main-bar'>
            <div className='main-bar-header'>
                {
                    location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
                }
                <button  onClick={checkAuth} className='ask-btn'>Ask Questions</button>
            </div>
            <div>
                    {
                        questionList.data === null ?
                        <h1>Loading......</h1> :
                        <>
                            <p>{ questionList.data.length } questions</p>
                            {/* <Question /> */} 
                            <QuestionsList questionList ={questionList.data} />
                        </>
                    }
            </div>
        </div>
    )
}

export default HomeMainbar



// [{
//     _id : '1',
//     upVotes: 1,
//     downVotes: 2,
//     noOfAnswers:2,
//     questionTitle:"What is a dfgf?",
//     questionBody: "Tis A B D",
//     questionTags:["Python","Node.js"],
//     userPosted:"Ruban",
//     userId : 1,
//     askedOn:"jan 29",
//     answer: [{
//         answerBody : "Answer",
//         userAnswered:"Mohana",
//         answerOn: "jan 4",
//         userId : 3,
//     }]
// },
// {
//     _id : '2',
//     upVotes: 5,
//     downVotes: 2,
//     noOfAnswers:3,
//     questionTitle:"What is a fdsf?",
//     questionBody: "Tis A B D",
//     questionTags:["Python","Node.js"],
//     userPosted:"Ruban",
//     userId : 2,
//     askedOn:"jan 29",
//     answer: [{
//         answerBody : "Answer",
//         userAnswered:"Mohan",
//         answerOn: "jan 4",
//         userId : 1,
//     }]
// },
// {
//     _id : '3',
//     upVotes: 1,
//     downVotes: 3,
//     noOfAnswers:4,
//     questionTitle:"What is a fdfsfsfd?",
//     questionBody: "Tis A B D",
//     questionTags:["Python","Node.js"],
//     userPosted:"Ruban",
//     userId : 3,
//     askedOn:"jan 29",
//     answer: [{
//         answerBody : "Answer",
//         userAnswered:"Ruban",
//         answerOn: "jan 4",
//         userId : 2,
//     }]
// }]