import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('avtasks')
    return saved ? JSON.parse(saved) : []
  })
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    localStorage.setItem('avtasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return
    setTasks([...tasks, {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }])
    setNewTask('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const pendingCount = tasks.filter(t => !t.completed).length
  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div className="app">
      <header className="header">
        <h1>📋 AVTasks</h1>
        <p className="subtitle">Arslan Ventures Task Manager</p>
      </header>

      <form onSubmit={addTask} className="add-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="What needs to be done?"
          className="task-input"
          autoFocus
        />
        <button type="submit" className="add-btn">+ Add</button>
      </form>

      <div className="stats">
        <span className="stat pending">{pendingCount} pending</span>
        <span className="stat completed">{completedCount} done</span>
      </div>

      <ul className="task-list">
        {tasks.length === 0 && (
          <li className="empty-state">
            <span className="empty-icon">✨</span>
            <p>No tasks yet. Add one above!</p>
          </li>
        )}
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <button
              className="check-btn"
              onClick={() => toggleTask(task.id)}
              aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
            >
              {task.completed ? '✓' : '○'}
            </button>
            <span className="task-text">{task.text}</span>
            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
              aria-label="Delete task"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <footer className="footer">
        <p>Built for Hassan • Arslan Ventures</p>
      </footer>
    </div>
  )
}

export default App
