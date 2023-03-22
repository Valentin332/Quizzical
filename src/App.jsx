import React from "react"
import Quiz from "./Quiz"
import Start from "./Start"
import { nanoid } from "nanoid"



export default function App(){
   const [quizData, setQuizData] = React.useState([])
  const [submitted, setSubmitted] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const [checked, setChecked] = React.useState([
    {check: false, value: ""},
    {check: false, value: ""},
    {check: false, value: ""},
    {check: false, value: ""},
    {check: false, value: ""}
    ]);
  const [playAgain, setPlayAgain] = React.useState(false)
  const [gameStart, setGameStart] = React.useState(false)
  const [isReady, setReady] = React.useState(false)
 let showOrHide
  if(gameStart && isReady){ showOrHide = "show" }
  else { showOrHide = "hide" };
  

    React.useEffect( function(){
       fetch("https://opentdb.com/api.php?amount=10&category=27&type=multiple")
       .then(res => res.json())
       .then(data => setQuizData(data.results.slice(0,5)));
       setReady(true)
   }, [playAgain]);



   
    function start(){
       setGameStart(true)
    }
   
    function reset(){
   setPlayAgain(!playAgain)
   setCount(0)
   setChecked([
    {check: false, value: ""},
    {check: false, value: ""},
    {check: false, value: ""},
    {check: false, value: ""},
    {check: false, value: ""}
   ])
    setSubmitted(false) 
   document.body.scrollTop = document.documentElement.scrollTop = 0;
   setReady(false)
    };
   
    function submit(){
    setCount( () => {
    return checked.map(checks => checks.check).reduce( (accumulator, currentValue) => accumulator + currentValue )    
    })
    setSubmitted(true)
    }
   
   
    function checkingTrue(index){
       setChecked(prevCheck => {
           prevCheck[index].check = true;
           prevCheck[index].value = event.target.value;
           return prevCheck
       }) 
    }

    function checkingFalse(index){
       setChecked(prevCheck => {
           prevCheck[index].check = false;
           prevCheck[index].value = event.target.value;
           return prevCheck
       })
    }
   
    function shuffleArray(array){
        for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    }
    return array
    }
    

const scoreStyles = {
    color: "white",
    fontFamily:  'Gill Sans'
};

 const quizzes = quizData.map( (data, index) => {
     return(
    <Quiz 
    key = {nanoid()}
    id = {index + 1}
    question={data.question} 
    answers={shuffleArray([...data.incorrect_answers, data.correct_answer])} 
    correctAnswer={data.correct_answer}
    checked = {checked[index].check}
    finalAnswer= {checked[index].value}
    setCheckedTrue = {() => checkingTrue(index)}
    setCheckedFalse = {() => checkingFalse(index)}
    submitted= {submitted}
    />
    )
    })
 
    return (
     <main>
     { gameStart === false && <Start start={start} />}
     <div className={showOrHide}>
     {quizzes}  
     <div className="submit">
      { submitted && <h1 style={scoreStyles}>Your Score is {count}/{checked.length}</h1>}
     <button 
     onClick={ submitted ? reset : submit}>
     {submitted  ? "Play again!" : "Submit"}
     </button>
     </div>
        </div>   
     </main>
    ) 
       
}
