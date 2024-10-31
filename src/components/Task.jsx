import './Task.css'
import React from 'react'

import TodoState from '../helper/TodoState';

const Task = ({todo, changeState, editTask, deleteTask}) => {   
  let button_title = ""
  switch(todo.state)
  {
    case TodoState.TODO: 
      button_title = "Start" 
      break
    case TodoState.IN_PROGRESS: 
      button_title = "Complete"
      break
    case TodoState.COMPLETE: 
      button_title = "Again"
      break
    default: 
      button_title = "Again" 
      break
  }

  return (
    <div className='todo-item'>
        <div className='task-date'>
          <p>{todo.task}</p>
          <p>{todo.date}</p>          
        </div>
        <div className='btn-box'>
          <button onClick={() => changeState(todo.id)}>{button_title}</button>
          <button onClick={() => editTask(todo.id)}>Edit</button>
          <button onClick={() => deleteTask(todo.id)}>Delete</button>
        </div>        
    </div>
    
  )
}

export default Task