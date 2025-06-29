"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { set } from "date-fns"
import { on } from "events"

export default function LoginForm({ onSwitchToRegister, onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Aquí puedes llamar a tu API de login
      console.log("Email:", email)
      console.log("Password:", password)

      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      const data = await response.json()

      if (!response.ok) {
        if (data.error) {
          setError(data.error)
          setLoading(false)
          return
        }
        else if (data.errors) {
          let message = ""
          for (const error of data.errors) {
            message += error.message + ". "
          }
          setError(message || "Error al iniciar sesión")
          setLoading(false)
          console.log("message:", message)
          return
        }
      }

      // Simula éxito
      setSuccess(true)
      setEmail("")
      setPassword("")
      onLogin() // Llama a la función onLogin para cambiar a la vista de tareas
      console.log("Inicio de sesión exitoso")
    } catch (err) {
      console.error("Login fallido:", err)
      setError("Error al iniciar sesión. Por favor, intenta de nuevo.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-sm sm:max-w-md">
        <CardHeader className="space-y-1 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Iniciar Sesión
          </CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 p-4 sm:p-6 pt-0">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Entrando..." : "Iniciar Sesión"}
            </Button>

             {/* Solo muestra si hay error y no fue exitoso */}
            {!success && error && (
              <div className="text-sm text-red-600 bg-red-100 rounded p-2 w-full text-center">
                {error}
              </div>
            )}

            <div className="text-center text-xs sm:text-sm text-gray-600 px-2">
              ¿No tienes una cuenta?{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-blue-600 hover:text-purple-600 hover:underline font-medium transition-colors"
              >
                Regístrate aquí
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

