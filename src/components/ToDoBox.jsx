import './ToDoBox.css'
import React from 'react'

import Task from './Task'

const ToDoBox = ({title, taskList, changeState, editTask, deleteTask}) => {
  return (
    <div className='todo-box'>
      <h3>{title}</h3>
        {taskList && taskList.map((todo) => {
            return <Task key={todo.id}
                    todo={todo} 
                    changeState={changeState} 
                    editTask={editTask}
                    deleteTask={deleteTask} />
        })}
    </div>
  )
}

export default ToDoBox