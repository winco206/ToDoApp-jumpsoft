import './Task.css'
import React from 'react'

import TodoState from '../helper/TodoState'
import TodoPriority from '../helper/TodoPrirority'

const Task = ({todo, changeState, editTask, deleteTask}) => {   

  const getButtonTitle = () => {  // funkcia pre zmenu textu tlačidla
    switch(todo.state)
    {
      case TodoState.TODO: return "Start" 
      case TodoState.IN_PROGRESS: return "Finish"
      case TodoState.COMPLETE: return "Again"
      default: return "Again" 
    }
  }  

  const getBorderColor = () => {  // funkcia pre zmenu farby podľa priority úlohy
    switch(todo.priority) {
      case TodoPriority.HIGH: return 'red'
      case TodoPriority.MEDIUM: return 'orange'
      case TodoPriority.LOW: return 'green'
      default: return 'var(--textClr)'
    }
  }
  


  return (
    <div className='todo-item' style={{ borderColor: getBorderColor()}}>
        <div className='task-date'>
          <p>{todo.task}</p>
          <p>{todo.date}</p>          
        </div>
        <div className='btn-box'>
          <button onClick={() => changeState(todo.id)}>{getButtonTitle()}</button>
          <button onClick={() => editTask(todo.id)}>Edit</button>
          <button onClick={() => deleteTask(todo.id)}>Delete</button>
        </div>        
    </div>
    
  )
}

export default Task