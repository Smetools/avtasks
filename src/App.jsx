import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('avtasks')
    return saved ? JSON.parse(saved) : []
  })
  const [agentTasks, setAgentTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [showAgentTasks, setShowAgentTasks] = useState(true)

  useEffect(() => {
    localStorage.setItem('avtasks', JSON.stringify(tasks))
  }, [tasks])

  // Fetch agent tasks periodically
  useEffect(() => {
    const fetchAgentTasks = async () => {
      try {
        const response = await fetch('/avtasks/agent-tasks.json')
        if (response.ok) {
          const data = await response.json()
          setAgentTasks(data)
        }
      } catch (error) {
        console.error('Failed to fetch agent tasks:', error)
      }
    }

    fetchAgentTasks()
    const interval = setInterval(fetchAgentTasks, 10000) // Refresh every 10 seconds
    return () => clearInterval(interval)
  }, [])

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
  const agentPendingCount = agentTasks.filter(t => t.status !== 'done').length

  const getStatusIcon = (status) => {
    switch (status) {
      case 'done': return '✓'
      case 'in-progress': return '⏳'
      default: return '○'
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'done': return 'completed'
      case 'in-progress': return 'in-progress'
      default: return ''
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) return `${diffDays}d ago`
    
    return date.toLocaleDateString()
  }

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

      {/* Agent Tasks Section */}
      {agentTasks.length > 0 && (
        <>
          <div className="section-header">
            <h2 className="section-title">
              <span className="agent-icon">🤖</span>
              Agent Tasks
              {agentPendingCount > 0 && (
                <span className="badge">{agentPendingCount}</span>
              )}
            </h2>
            <button 
              className="toggle-btn"
              onClick={() => setShowAgentTasks(!showAgentTasks)}
              aria-label={showAgentTasks ? 'Hide agent tasks' : 'Show agent tasks'}
            >
              {showAgentTasks ? '−' : '+'}
            </button>
          </div>

          {showAgentTasks && (
            <ul className="task-list agent-tasks">
              {agentTasks.map(task => (
                <li key={task.id} className={`task-item agent-task ${getStatusClass(task.status)}`}>
                  <span className={`status-indicator ${task.status}`}>
                    {getStatusIcon(task.status)}
                  </span>
                  <div className="task-content">
                    <span className="task-text">{task.description}</span>
                    <span className="task-meta">
                      {formatDate(task.createdAt)}
                      {task.status === 'in-progress' && ' • Working on it...'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <footer className="footer">
        <p>Built for Hassan • Arslan Ventures</p>
      </footer>
    </div>
  )
}

export default App
