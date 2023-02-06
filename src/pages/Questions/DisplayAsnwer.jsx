import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
import moment from 'moment'
import { useSelector ,useDispatch } from 'react-redux'
import currentUserReducer from '../../reducers/currentUser'
import { deleteAnswer } from '../../actions/question'

const DisplayAsnwer = ({questions ,handleShare}) => {
    const User = useSelector((state) => (state.currentUserReducer))
    const { id } = useParams()
    const dispatch = useDispatch()

    const handleDelete = ( answerId , noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1))
    }
    
    return (
        <div>
            {
                questions.answer.map((ans)=>(
                    <div className='display-ans' key={ans._id}>
                        <p>{ans.answerBody}</p>
                        <div className="question-action-user">
                            <div>
                                <button type='button' onClick={handleShare}>Share</button> 
                                {
                                    User?.result?._id === ans?.userId &&(
                                        <button type='button' onClick={()=> handleDelete(ans._id,questions.noOfAnswers)}>Delete</button>
                                    )
                                }
                            </div>
                            <div>
                                <p>answered {moment(ans.answerOn).fromNow()}</p>
                                <Link to={`/Users/${ans.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                    <Avatar backgroundColor="orange" px='8px' py='5px'>
                                        {ans.userAnswered.charAt(0).toUpperCase()}
                                    </Avatar>
                                <div>
                                    {ans.userAnswered}
                                </div>
                                </Link>
                            </div>
                        </div>
                    </div> 
                ))
            }
        </div>
    )
}

export default DisplayAsnwer