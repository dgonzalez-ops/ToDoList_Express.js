"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Check, Trash2, LogOut, User } from "lucide-react"

export default function TodoApp({ onLogout }) {
  // Datos de ejemplo para mostrar el diseño
  const [mockTodos] = useState([
    { id: 1, text: "Completar el proyecto de React", completed: false },
    { id: 2, text: "Revisar documentación de shadcn/ui", completed: true },
    { id: 3, text: "Preparar presentación para el equipo", completed: false },
    { id: 4, text: "Actualizar dependencias del proyecto", completed: false },
    { id: 5, text: "Escribir tests unitarios", completed: true },
  ])

  const completedCount = mockTodos.filter((todo) => todo.completed).length
  const totalCount = mockTodos.length

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
                <span>Usuario Demo</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
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
              <Input placeholder="Añadir nueva tarea..." className="flex-1 text-sm sm:text-base" />
              <Button className="px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Añadir
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Todo List */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Mis Tareas</h2>

          {mockTodos.map((todo) => (
            <Card key={todo.id} className={`transition-all duration-200 ${todo.completed ? "bg-gray-50" : "bg-white"}`}>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3 flex-1 w-full">
                    <Button
                      variant={todo.completed ? "default" : "outline"}
                      size="sm"
                      className={`h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0 ${todo.completed ? "bg-green-600 hover:bg-green-700" : "bg-white text-gray-600"}`}
                    >
                      <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <div className="flex-1 min-w-0">
                      <span
                        className={`block text-sm sm:text-base break-words ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                      >
                        {todo.text}
                      </span>
                      {todo.completed && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs mt-1 sm:hidden">
                          Completada
                        </Badge>
                      )}
                    </div>
                    {todo.completed && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 text-xs sm:text-sm hidden sm:inline-flex"
                      >
                        Completada
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 bg-white text-red-600 hover:bg-red-50 flex-shrink-0 self-end sm:self-center"
                  >
                    <Trash2 className="h-4 w-4 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {mockTodos.length === 0 && (
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
            <p className="text-gray-400 text-xs sm:text-sm px-4">Hecho con ❤️ usando React, Tailwind CSS y shadcn/ui</p>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-gray-500 text-xs">© 2025 To Do App. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
