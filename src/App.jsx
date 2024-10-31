import './App.css'
import { useEffect, useState } from 'react'

import { ToDoForm, ToDoBox, PopUp } from './components'

import TodoState from './helper/TodoState'
import TodoPriority from './helper/TodoPrirority'

const getTasksByState = (list, state) => {
  return list.filter((todo) => {return todo.state === state})
}

const getSortedTaskByPriority = (tasks) => {
  const priorityOrder = {
    [TodoPriority.HIGH]: 1,
    [TodoPriority.MEDIUM]: 2,
    [TodoPriority.LOW]: 3,
  }
  return [...tasks].sort((a,b) => priorityOrder[a.priority] - priorityOrder[b.priority])
}

const getLastId = (tasks) => {
  return tasks.reduce((max, task) => task.id > max ? task.id : max, 0)
}


const App = () => {
  const [toDos, setToDos] = useState([])
  const [openPopup, setOpenPopup] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setToDos(savedTodos)
  }, [])

  const handlePopUPTriger = () => {
    setTaskToEdit(null)
    setOpenPopup(true)
  }

  const addTask = (todo) => {
    const lastId = getLastId(toDos)
    const updatedToDos = [...toDos, { ...todo, id: (lastId + 1), state: TodoState.TODO}]
    const sortedToDos = getSortedTaskByPriority(updatedToDos)
    setToDos(sortedToDos)
    localStorage.setItem('todos', JSON.stringify(sortedToDos));
  }

  const changeStateHandler = (id) => {
    const updatedToDos = toDos.map((todo) => {
                            if (todo.id === id)
                            {
                                switch (todo.state)
                                {
                                    case TodoState.TODO: return {...todo, state: TodoState.IN_PROGRESS}
                                    case TodoState.IN_PROGRESS: return {...todo, state: TodoState.COMPLETE}
                                    case TodoState.COMPLETE: return {...todo, state: TodoState.TODO}
                                    default: return {...todo, state: TodoState.TODO}
                                }
                            }
                            else return todo
                          })

    setToDos(updatedToDos)
    localStorage.setItem('todos', JSON.stringify(updatedToDos));
  }

  const editTaskHandler = (id) => {
    const todo = toDos.filter((todo) => { return todo.id === id })
    setTaskToEdit(todo[0])
    setOpenPopup(true)
  }

  const deleteTaskHandler = (id) => {
    const updatedToDos = toDos.filter((todo) => {
                          return todo.id !== id
                        })
    setToDos(updatedToDos)
    localStorage.setItem('todos', JSON.stringify(updatedToDos));
  } 
  
  const saveTask = (task) => {
    const updatedToDos = toDos.map((todo) => {
      return todo.id === task.id ? task : todo
    })
    const sortedToDos = getSortedTaskByPriority(updatedToDos)
    setToDos(sortedToDos)
    setTaskToEdit(null)
    setOpenPopup(false)
    localStorage.setItem('todos', JSON.stringify(sortedToDos))
  }

  return (
    <div className='App'>
      
      <button onClick={handlePopUPTriger}>Add new task</button>

      <PopUp title={taskToEdit ? "Edit task" : "Add new task"} popUPtriger={openPopup} setPopUPtriger={setOpenPopup}>
        <ToDoForm 
        todo={taskToEdit}
        saveTask={taskToEdit ? saveTask : addTask} />
      </PopUp>

      <div className='boxes'>
        <ToDoBox title="To Do" 
          taskList={getTasksByState(toDos, TodoState.TODO)} 
          changeState={changeStateHandler} 
          editTask={editTaskHandler}
          deleteTask={deleteTaskHandler}
          />
        <ToDoBox title="In Progress" 
          taskList={getTasksByState(toDos, TodoState.IN_PROGRESS)} 
          changeState={changeStateHandler}
          editTask={editTaskHandler}
          deleteTask={deleteTaskHandler} 
          />
        <ToDoBox title="Complete" 
          taskList={getTasksByState(toDos, TodoState.COMPLETE)} 
          changeState={changeStateHandler} 
          editTask={editTaskHandler}
          deleteTask={deleteTaskHandler}
          />
      </div>      
    </div>
  )
}

export default App