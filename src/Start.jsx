import React from "react"

export default function Start(props){
    
    return(
        <div className="start--container">
        
        <div className="start">
        <h1>Animals Quiz</h1>
        <button onClick={props.start}>Play!</button>
        </div>
     </div>
    )
}

