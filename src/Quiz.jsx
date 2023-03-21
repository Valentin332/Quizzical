import React from "react"
import { nanoid } from "nanoid"
import {decode} from 'html-entities'

export default function Quiz(props){
     const [selectedAnswer, setSelectedAnswer] = React.useState("")
     
     function handleClick(){
         setSelectedAnswer(event.target.value)
         if(event.target.value === props.correctAnswer){ props.setCheckedTrue() } 
         else { props.setCheckedFalse() }
        }
    
     const buttons = props.answers.map((answer) => {
        return(
            <button
             key = {nanoid()}
             value = {answer}
             onClick={handleClick}
             style={
                 props.submitted ? {backgroundColor: props.correctAnswer === answer ? "green"      
                 : props.finalAnswer === answer ? "red" : "transparent"} 
                 :
                 {backgroundColor: selectedAnswer === answer ? "#c33b80" : "transparent"}
                 
                 }
            >
            {decode(answer)}
            </button>
        )
       })
   
   
    return (
        <div className="question--container">
    <h1>{decode(props.question)}</h1>
    <div className="button-container">
    {buttons}
    </div>
    <hr></hr>
    </div>
    )
    
}