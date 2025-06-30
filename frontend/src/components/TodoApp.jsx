"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Check, Trash2, LogOut, User } from "lucide-react"

function useAuthCheck() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('http://localhost:8080/auth/check-auth', {
          method: 'GET',
          credentials: 'include', // Muy importante para enviar cookies
        })

        if (!res.ok) {
          throw new Error('No autenticado')
          setCurrentView("login")
        }

        const data = await res.json()
        setUser(data.user)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { user, loading, error }
}

export default function TodoApp({ onLogout }) {
  const [tasks, setTasks] = useState([]) 
  const { user, loading, error } = useAuthCheck()
  const [newTaskTitle, setNewTaskTitle] = useState('')
  

  const fetchUserTasks = async () => {
    try {
      const res = await fetch('http://localhost:8080/tasks/userTasks', {
        method: 'GET',  // mejor GET para obtener datos
        credentials: 'include' // enviar cookies con el token
      })

      if (!res.ok) {
        console.log('No autorizado o error al obtener tareas:', res) 
        return
      }

      const data = await res.json()
      setTasks(data || [])
    } catch (err) {
      console.error('Error fetching tasks:', err)
    }
  }

  async function handleLogout() {
  const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          
        })
      })
      const data = await response.json()

      if (!response.ok) {
        console.error("Error al cerrar sesión:", data)
        return
      }
       onLogout();
      console.log("Sesión cerrada correctamente:", data)
      
}

const handleNewTask = async () => {
  if (!newTaskTitle.trim()) return; 

  const res = await fetch('http://localhost:8080/tasks/createTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ title: newTaskTitle }),
  });

  if (res.ok) {
    // limpiar input, recargar tareas, etc.
    setNewTaskTitle('');
    await fetchUserTasks();
  } else {
    console.error('Error al crear la tarea');
  }
};

const handleDeleteTask = async (taskId) => {
  const res = await fetch(`http://localhost:8080/tasks/deleteTask/${taskId}`, {
    method: 'DELETE',
    credentials: 'include',
  }); 
  if (res.ok) {
    // Recargar tareas después de eliminar
    await fetchUserTasks();
  } else {
    console.error('Error al eliminar la tarea');
  }
};

const handleCompleted = async (taskId) => {
  const res = await fetch(`http://localhost:8080/tasks/completeTask/${taskId}`, {
    method: 'PUT',
    credentials: 'include',
  });
  if (res.ok) {
    // Recargar tareas después de marcar como completada 
    await fetchUserTasks();
  } else {
    console.error('Error al completar la tarea');
  }
};


useEffect(() => {
  async function loadTasks() {
    const data = await fetchUserTasks()  
    if (data) setTasks(data)
  }
  loadTasks()
}, [])

  const completedCount = tasks.filter((todo) => todo.completed).length
  const totalCount = tasks.length

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <h1 className="text-lg sm:text-xl font-bold text-white">To Do App</h1>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs sm:text-sm">
                {completedCount}/{totalCount}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-white">
                <User className="h-4 w-4" />
                <span>{
                  loading ? "Cargando..." : user.email || "Invitado"
                  }</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="bg-white text-gray-700 text-xs sm:text-sm px-2 sm:px-4"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Add Todo Section */}
        <Card className="mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Input
                placeholder="Añadir nueva tarea..."
                className="flex-1 text-sm sm:text-base"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <Button className="px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto" onClick={handleNewTask}>
                <Plus className="h-4 w-4 mr-2" />
                Añadir
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Todo List */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Mis Tareas</h2>
                {tasks.map((todo) => (
                  <Card
                    key={todo.id}
                    className={`transition-all duration-200 ${
                      todo.completed ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                        {/* Parte izquierda: checkbox + texto + badge */}
                        <div className="flex items-start sm:items-center gap-3 w-full">
                          {/* Checkbox */}
                          <Button
                            variant={todo.completed ? "default" : "outline"}
                            size="md"
                            className={`h-8 w-8 p-0 flex-shrink-0 ${
                              todo.completed
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-white text-gray-600"
                            }`}
                            onClick={handleCompleted.bind(null, todo.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          
                          {/* Título + badge */}
                          <div className="flex flex-col w-full">
                            <span
                              className={`text-sm sm:text-base break-words ${
                                todo.completed ? "line-through text-gray-500" : "text-gray-900"
                              }`}
                            >
                              {todo.title}
                            </span>
                            
                            {/* Badge mobile */}
                            {todo.completed && (
                              <Badge className="bg-green-100 text-green-800 text-xs mt-1 sm:hidden w-fit">
                                Completada
                              </Badge>
                            )}
                          </div>
                        </div>
                          
                        {/* Badge en desktop */}
                        {todo.completed && (
                          <Badge className="bg-green-100 text-green-800 text-sm hidden sm:inline-flex">
                            Completada
                          </Badge>
                        )}

                        {/* Botón eliminar */}
                        <Button
                          variant="outline"
                          size="md"
                          className="h-8 w-8 p-0 bg-white text-red-600 hover:bg-red-50 self-end sm:self-center"
                          onClick={handleDeleteTask.bind(null, todo.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <Card className="mt-8">
            <CardContent className="p-8 sm:p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Plus className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No hay tareas</h3>
              <p className="text-sm sm:text-base text-gray-500">Añade tu primera tarea para comenzar</p>
            </CardContent>
          </Card>
        )}
      </main>
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">DG</span>
              </div>
              <span className="text-base sm:text-lg font-semibold">Diego González Alcázar</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">Desarrollador Fullstack</p>
            <p className="text-gray-400 text-xs sm:text-sm px-4">Hecho con ❤️ usando React, Tailwind CSS y Node.js</p>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-gray-500 text-xs">© 2025 To Do App. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
