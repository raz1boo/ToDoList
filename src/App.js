import React from 'react'
import {useState} from 'react'

function ToDoForm({addToDo}){
  const [userInput, setUserInput] = useState('')

  const handleChange = (event)=>{
    setUserInput(event.currentTarget.value)
  }
  const handleSubmit = (event)=>{
    event.preventDefault()
    addToDo(userInput)
    setUserInput("")
  }
  const handleKeyPress = (event)=>{
    if(event.key === "Enter"){
      handleSubmit(event)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={userInput}
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Input value..."
      />
      <button className="add">Add</button>
    </form>
  );
}
function ToDo({todo, removeToDo}){
  return(
    <div className="newItem" key={todo.id}>
      <div className="text">
      {todo.task}
      &nbsp;
      <button className="delete" onClick={()=>{removeToDo(todo.id)}}>Delete</button>
      </div>
    </div>
  );
}

function App() {
  const [todos, setToDos] = useState([])

  const addToDo = (userInput) =>{
    if(userInput){
      const newItem ={
        id: Math.random().toString(36).substr(2,9),
        task: userInput,
        complete: false
      }
      setToDos([...todos, newItem])
    }
  }

  const removeToDo = (id) =>{
    setToDos([...todos.filter((todo)=>todo.id !== id)])
  }

  const handleToggle = (id) =>{
    setToDos([...todos.map((todo)=>todo.id === id ? {...todo, complete: !todo.complete} : {...todo})])
  }

  return(
    <div className="App">
      <h2>ToDo: {todos.length}</h2>
      <ToDoForm addToDo={addToDo}/>
      {todos.map((todo)=>{
        return(
          <ToDo
          todo={todo}
          key={todos.id}
          handleToggle={handleToggle}
          removeToDo={removeToDo}
          />
        )
      })}
    </div>
  );
}

export default App;