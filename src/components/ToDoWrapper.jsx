import './ToDoWrapper.css'
import React from 'react'

import { ToDoBox } from './'
import TodoState from '../helper/TodoState'


const getTasksByState = (list, state) => {
    return list.filter((todo) => {return todo.state === state})
}

const ToDoWrapper = ({toDos, setToDos, setTaskToEdit, setOpenPopup }) => {
    
  // zmena stavu úlohy po kliknutí na príslušné tlačidlo
    const changeStateHandler = (id) => {  
        const updatedToDos = toDos.map((todo) => {
                                if (todo.id === id)
                                {

                                  switch (todo.state)
                                  {
                                      case TodoState.TODO: return {...todo, state: TodoState.IN_PROGRESS}
                                      case TodoState.IN_PROGRESS: return {...todo, state: TodoState.COMPLETE}
                                      case TodoState.COMPLETE: 
                                        const today = new Date().toISOString().split('T')[0]
                                        // ak sa zmení stav (po kliknutí na "Again") a dátum úlohy je v minulosti, automaticky nastaví dátum na aktuálny deň
                                        if  (todo.date < today) return {...todo, date: today, state: TodoState.TODO}
                                        else  return {...todo, state: TodoState.TODO}
                                      default: return {...todo, state: TodoState.TODO}
                                  }
                                }
                                else return todo
                              })
    
        setToDos(updatedToDos)
        localStorage.setItem('todos', JSON.stringify(updatedToDos));
      }
      
      const editTaskHandler = (id) => { // otvorenie PopUp okna pre úpravu úlohy
        const todo = toDos.filter((todo) => { return todo.id === id })
        setTaskToEdit(todo[0])
        setOpenPopup(true)
      }
    
      const deleteTaskHandler = (id) => { // vymazanie úlohy
        const updatedToDos = toDos.filter((todo) => {
                              return todo.id !== id
                            })
        setToDos(updatedToDos)
        localStorage.setItem('todos', JSON.stringify(updatedToDos));
      } 

  return (
    <div className='boxes'>
        <ToDoBox title={TodoState.TODO}
          taskList={getTasksByState(toDos, TodoState.TODO)} 
          changeState={changeStateHandler} 
          editTask={editTaskHandler}
          deleteTask={deleteTaskHandler}
          />
        <ToDoBox title={TodoState.IN_PROGRESS}
          taskList={getTasksByState(toDos, TodoState.IN_PROGRESS)} 
          changeState={changeStateHandler}
          editTask={editTaskHandler}
          deleteTask={deleteTaskHandler} 
          />
        <ToDoBox title={TodoState.COMPLETE} 
          taskList={getTasksByState(toDos, TodoState.COMPLETE)} 
          changeState={changeStateHandler} 
          editTask={editTaskHandler}
          deleteTask={deleteTaskHandler}
          />
    </div>
  )
}

export default ToDoWrapper