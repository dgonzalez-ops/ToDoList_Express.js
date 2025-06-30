"use client"

import { useState, useEffect } from "react"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import TodoApp from "./components/TodoApp"

function App() {
  const [currentView, setCurrentView] = useState("login")
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8080/check-auth", {
          method: "GET",
          credentials: "include", 
        })

        if (res.ok) {
          setCurrentView("todo")
        } else {
          setCurrentView("login")
        }
      } catch (err) {
        setCurrentView("login")
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [])

  const renderCurrentView = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginForm
            onSwitchToRegister={() => setCurrentView("register")}
            onLogin={() => setCurrentView("todo")}
          />
        )
      case "register":
        return (
          <RegisterForm
            onSwitchToLogin={() => setCurrentView("login")}
            onRegister={() => setCurrentView("todo")}
          />
        )
      case "todo":
        return <TodoApp onLogout={() => setCurrentView("login")} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {checkingAuth ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500 animate-pulse">Verificando sesión...</p>
        </div>
      ) : (
        renderCurrentView()
      )}
    </div>
  )
}

export default App

