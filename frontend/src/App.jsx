"use client"

import { useState } from "react"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import TodoApp from "./components/TodoApp"

function App() {
  const [currentView, setCurrentView] = useState("login") // 'login', 'register', 'todo'

  const renderCurrentView = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginForm onSwitchToRegister={() => setCurrentView("register")} onLogin={() => setCurrentView("todo")} />
        )
      case "register":
        return (
          <RegisterForm onSwitchToLogin={() => setCurrentView("login")} onRegister={() => setCurrentView("todo")} />
        )
      case "todo":
        return <TodoApp onLogout={() => setCurrentView("login")} />
      default:
        return (
          <LoginForm onSwitchToRegister={() => setCurrentView("register")} onLogin={() => setCurrentView("todo")} />
        )
    }
  }

  return <div className="min-h-screen bg-gray-50">{renderCurrentView()}</div>
}

export default App
