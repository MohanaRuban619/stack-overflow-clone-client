import axios from 'axios'

const API = axios.create({ baseURL : 'http://localhost:5000'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('Profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIN = (authData) => API.post('/user/login',authData);
export const signUp = (authData) => API.post('/user/signup',authData);


export const getAllQuestions = () => API.get('/AskQuestions/get');
export const postQuestion = (questionData) => API.post('/AskQuestions/Ask',questionData)
export const deleteQuestion = (id) => API.delete(`/AskQuestions/delete/${id}`)
export const VoteQuestion = (id ,value , userId ) => API.patch(`/AskQuestions/vote/${id}`, {value ,userId})

export const postAnswer = (id,noOfAnswers,answerBody,userAnswered ,userId) => API.patch(`/answer/post/${id}`,{noOfAnswers,answerBody,userAnswered , userId});
export const deleteAnswer = (id ,answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`,{answerId, noOfAnswers}) 

export const fetchAllUsers = () => API.get('/user/getAllUsers')
export const updatedProfile = (id,updateData) => API.patch(`/user/update/${id}`,updateData)