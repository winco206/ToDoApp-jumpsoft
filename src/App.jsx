import './App.css'
import { useEffect, useState } from 'react'

import { ToDoForm, PopUp, ToDoWrapper } from './components'

import TodoState from './helper/TodoState'
import TodoPriority from './helper/TodoPrirority'

// funkcia na zoradenie zoznamu úloh
const getSortedTask = (tasks) => { 
  const priorityOrder = {
    [TodoPriority.HIGH]: 1,
    [TodoPriority.MEDIUM]: 2,
    [TodoPriority.LOW]: 3,
  }

  return [...tasks].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    if (dateA.getTime() === dateB.getTime()) {  // ak sa dátumy rovnajú, porovná priority
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }

    return dateA - dateB
  })
}

// funkcia na zistenie posledného ID úlohy
const getLastId = (tasks) => {  
  return tasks.reduce((max, task) => task.id > max ? task.id : max, 0)
}

const initFilter = { date: "", priority: "" }

// Hlavný component aplikácie
const App = () => {
  const [allToDos, setAllToDos] = useState([])              // zoznam všetkých úloh
  const [filteredToDos, setFilteredToDos] = useState(null)  // zoznam úloh po použití filtra
  const [openPopup, setOpenPopup] = useState(false)         // triger pre otváranie PopUp
  const [taskToEdit, setTaskToEdit] = useState(null)        // objekt s parametrami úlohy pre editáciu
  const [taskFilter, setTaskFilter] = useState(initFilter)  // parametre filtra

  useEffect(() => { // po štarte sa načítajú dáta z localStorage
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setAllToDos(savedTodos)
  }, [])

  const handlePopUPTriger = () => {
    setTaskToEdit(null)
    setOpenPopup(true)
  }

  const addTask = (todo) => { // pridanie novej úlohy a opätovné zoradenie zoznamu
    const lastId = getLastId(allToDos)
    const updatedToDos = [...allToDos, { ...todo, id: (lastId + 1), state: TodoState.TODO }]
    const sortedToDos = getSortedTask(updatedToDos)

    setAllToDos(sortedToDos)
    localStorage.setItem('todos', JSON.stringify(sortedToDos));
  }

  const saveTask = (task) => {  // uloženie upravenej úlohy a opätovné zoradenie
    const updatedToDos = allToDos.map((todo) => {
      return todo.id === task.id ? task : todo
    })
    const sortedToDos = getSortedTask(updatedToDos)
    setAllToDos(sortedToDos)
    setTaskToEdit(null) // vynulovanie objektu s parametrami pre úpravu
    setOpenPopup(false) // uzavretie PopUp po uložení zmien
    localStorage.setItem('todos', JSON.stringify(sortedToDos))
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setTaskFilter((prev) => ({ ...prev, [name]: value }))
  }

  const handleFilter = (e) => {
    e.preventDefault()

    let tasks = allToDos

    if (taskFilter.date) {  // ak existuje parameter dátum, filtruje podľa dátumu
      const filterDate = new Date(taskFilter.date)
      tasks = tasks.filter((task) => {
        const taskDate = new Date(task.date)
        return taskDate.getTime() === filterDate.getTime()
      })
    }

    if (taskFilter.priority) {  // ak existuje parameter priority, filtruje podľa priority
      tasks = tasks.filter((task) => task.priority === taskFilter.priority);
    }

    setFilteredToDos(tasks)
  }

  const handleFilterReset = (e) => {
    e.preventDefault()
    setFilteredToDos(null)
    setTaskFilter(initFilter)
  }

  return (
    <div className='App'>

      <header className='header-box'>
        <form className='filter-div'>
          <input
            type='date'
            name="date"
            id="date"
            value={taskFilter.date || ""}
            onChange={handleFilterChange}
          />
          <select
            name="priority"
            id="priority"
            value={taskFilter.priority || ""}
            onChange={handleFilterChange}
          >
            <option value={""}>All priority</option>
            <option value={TodoPriority.HIGH}>{TodoPriority.HIGH}</option>
            <option value={TodoPriority.MEDIUM}>{TodoPriority.MEDIUM}</option>
            <option value={TodoPriority.LOW}>{TodoPriority.LOW}</option>
          </select>
          <button onClick={handleFilter}>Filter</button>
          <button onClick={handleFilterReset}>Reset filter</button>
        </form>
        <button onClick={handlePopUPTriger}>Add new task</button>
      </header>

      <PopUp title={taskToEdit ? "Edit task" : "Add new task"} popUPtriger={openPopup} setPopUPtriger={setOpenPopup}>
        <ToDoForm
          todo={taskToEdit}
          saveTask={taskToEdit ? saveTask : addTask} />
      </PopUp>

      <ToDoWrapper
        toDos={filteredToDos || allToDos}
        setToDos={setAllToDos}
        setTaskToEdit={setTaskToEdit}
        setOpenPopup={setOpenPopup}
      />
    </div>
  )
}

export default App