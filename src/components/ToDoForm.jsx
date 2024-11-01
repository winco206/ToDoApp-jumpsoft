import './ToDoForm.css'
import React, { useState } from 'react'

import TodoPriority from '../helper/TodoPrirority'

const getDate = () => {
  const date = new Date()  

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const formatedDate = `${year}-${month}-${day}` // format YYYY-MM-DD

  return formatedDate
}

const initValue = { // inicializačná hodnota pre formulár
  task: "",
  date: getDate(), 
  priority: TodoPriority.HIGH,
}

const ToDoForm = ({todo, saveTask}) => {
  const [task, setTask] = useState(todo || initValue) // ak do komponentu nevstupuje todo (úloha), použije sa iniciačná hodnota
  const [error, setError] = useState("")  // chybová hláška pre funkciu validácie

  const changeValueHandler = (e) => {
    const {name, value} = e.target
    setTask((prev) => ({...prev, [name]: value}))
    setError("")
  }

  const validationValue = () => {
    if (task.task.length === 0) 
    { // zabezpečí, že nebude pridaná prázdna úloha
      setError("Task text is required.")
      return false
    }

    const today = new Date().toISOString().split('T')[0]
    if (task.date < today)
    { // zabezpečí, že nebude pridaná úloha so starým dátumom
      setError("Date cannot be in the past.")
      return false
    }

    return true
  }  

  const onSubmitHandle = (e) => {
    e.preventDefault()

    if (validationValue())
    {
      saveTask(task)  
      setTask(initValue)
    }    
  }


  return (
    <form className='todo-form' onSubmit={onSubmitHandle}>
      <label htmlFor="">Desription:</label>
      <input 
        name='task' 
        id='task'
        placeholder="Write ToDo Task" 
        value={task.task} 
        onChange={changeValueHandler}
      />
      
      <label htmlFor="">Due date:</label>
      <input 
        type="date" 
        name='date'   
        id='date' 
        value={task.date} 
        onChange={changeValueHandler}
      />

      <label htmlFor="">Priority:</label>
      <select 
        name='priority' 
        id='priority' 
        value={task.priority} 
        onChange={changeValueHandler}
      >
        <option value={TodoPriority.HIGH}>{TodoPriority.HIGH}</option>
        <option value={TodoPriority.MEDIUM}>{TodoPriority.MEDIUM}</option>
        <option value={TodoPriority.LOW}>{TodoPriority.LOW}</option>
      </select>
      <button type="submit">{todo ? "Save Changes" : "Add Task"}</button>
      {error && <span>{error}</span>}
    </form>
  )
}

export default ToDoForm