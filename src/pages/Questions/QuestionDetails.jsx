import React , { useState } from 'react'
import { useParams,Link, useNavigate ,useLocation } from 'react-router-dom'
import upvotes from '../../assets/upvotes.svg'
import downvotes from '../../assets/downvotes.svg'
import Avatar from '../../components/Avatar/Avatar'
import moment from 'moment'
import './Questions.css'
import DisplayAsnwer from './DisplayAsnwer'
import { useSelector , useDispatch} from 'react-redux'
import questionReducer from '../../reducers/questions'
import currentUserReducer from '../../reducers/currentUser'
import { postAnswer ,deleteQuestion ,VoteQuestion } from '../../actions/question'
import copy from 'copy-to-clipboard'

const QuestionDetails = () => {
    
    const User = useSelector((state) => (state.currentUserReducer))
    var questionList = useSelector( (state) => state.questionReducer);
    const [Answer,setAnswers] = useState('')
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const url = 'http://localhost:3000'

    const HandlePostAnswer = (e,answerLength) =>{
        e.preventDefault()
        if (User === null){
            alert ('Login or Signup to answer a question')
            navigate('/Auth')
        }else{
            if(Answer === ''){
                alert('Enter an answer before submitting')
            }else{
                dispatch(postAnswer({id,noOfAnswers: answerLength + 1, answerBody: Answer,userAnswered: User.result.name ,userId : User.result._id} ))
            }
        }
    }
    const handleDownVote = () =>{
            dispatch(VoteQuestion(id , 'downVote' , User.result._id))
    }
    const handleUpVote = () => {
            dispatch(VoteQuestion(id , 'upVote' , User.result._id))
    }
    const handleShare = ()  =>{
        copy(url + location.pathname)
        alert('Copied url : '+url+location.pathname )
    }
    const handleDelete = () =>{
        dispatch(deleteQuestion(id , navigate))
    }

    return (
        <div className='question-details-page'>
            {
                questionList.data === null ?
                <h1>Loading.....</h1> :
                <>
                    {
                        questionList.data.filter(question => question._id == id).map(question => (
                            <div key={question._id}>
                                <section className='question-details-container'>
                                    <h1>{question.questionTitle}</h1>
                                    <div className='question-details-container-2'>
                                        <div className='question-votes'>
                                            <img src={upvotes}  alt="UpVotes" width={18} onClick={handleUpVote}/>
                                            <p>{question.upVote.length - question.downVote.length}</p>
                                            <img src={downvotes} alt="DownVotes" width={18} onClick={handleDownVote}/>
                                        </div>
                                        <div style={{width: "100%"}}>
                                            <p className='question-body'>{question.questionBody}</p>
                                            <div className="question-details-tags">
                                                {
                                                    question.questionTags.map((tag) => (
                                                        <p key={tag}>{tag}</p>
                                                    ))
                                                }
                                            </div>
                                            <div className='question-action-user'>
                                                <div>
                                                    <button type='button' onClick={handleShare}>share</button>
                                                    {
                                                        User?.result?._id === question?.userId &&(
                                                            <button type='button' onClick={handleDelete}>Delete</button>
                                                        )
                                                    }
                                                </div>
                                                <div>
                                                    <p>asked {moment(question.askedOn).fromNow()}</p>
                                                    <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                                    <Avatar backgroundColor="orange" px='8px' py='5px'>
                                                        {question.userPosted.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                    <div>
                                                            {question.userPosted}
                                                    </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </section>
                                {
                                    question.noOfAnswers !== 0 && (
                                        <section>
                                            <h3>{question.noOfAnswers} answers</h3>
                                            <DisplayAsnwer key={question._id} questions={question} handleShare={handleShare}/>
                                        </section>
                                    )
                                }
                                <section className='post-ans-container'>
                                    <h3>Your Answers</h3>
                                    <form onSubmit={(e) => {HandlePostAnswer(e, question.answer.length)}}>
                                        <textarea name="" id="" cols="30" rows="10" onChange={e=> setAnswers(e.target.value)}></textarea><br></br>
                                        <input type="Submit" name="" id="" className='post-ans-btn' value='Post Your Answer'/>
                                    </form>
                                    <p>
                                        Browse other Question tagged 
                                        {
                                            question.questionTags.map((tag) => (
                                                <Link to='/Tags' className='ans-tag' key={tag}> {tag}</Link>
                                            ))
                                        } or <Link to='/AskQuestion' style={{textDecoration:'none',color:'#009dff'}}> ask your Own question</Link>
                                    </p>
                                </section>
                            </div>
                        ))
                    }
                </>
            }
        </div>
    )
}

export default QuestionDetails