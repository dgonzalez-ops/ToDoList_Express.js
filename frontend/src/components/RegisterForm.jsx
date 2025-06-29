"use client"

//import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterForm({ onSwitchToLogin, onRegister }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      })

      const data = await response.json()
      console.log("Respuesta del servidor:", data)

      if (!response.ok) {
        if (data.error) {
          setError(data.error)
          setLoading(false)
          return
        }
        else if (data.errors) { 
          let message = ""
          for (const error of errores) {
            message += error.message + ". "
          }
          setError(message || "Error al crear la cuenta")
          setLoading(false)
          console.log("message:", message)
          return
        }
      }

      // Opcional: redirige o cambia vista tras crear la cuenta
      alert("Cuenta creada exitosamente")
      setSuccess(true)
      setUsername("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      onSwitchToLogin?.() // si quieres volver a la vista de login
    } catch (err) {
      console.error("Error al registrar:", err)
      setError("Error de red o servidor")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-sm sm:max-w-md">
        <CardHeader className="space-y-1 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Crear Cuenta
          </CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">
            Completa los datos para crear tu nueva cuenta
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm">Nombre de usuario</Label>
              <Input id="username" type="text" placeholder="Tu usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">Contraseña</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm">Confirmar contraseña</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 p-4 sm:p-6 pt-0">
            {/* <Button onClick={RegisterForm} disabled={loading} className="w-full">
              {loading ? "Creando..." : "Crear Cuenta"}
            </Button> */}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creando..." : "Crear Cuenta"}
            </Button>


            {/* Solo muestra si hay error y no fue exitoso */}
            {!success && error && (
              <div className="text-sm text-red-600 bg-red-100 rounded p-2 w-full text-center">
                {error}
              </div>
            )}
            <div className="text-center text-xs sm:text-sm text-gray-600 px-2">
              ¿Ya tienes una cuenta?{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-purple-600 hover:underline font-medium transition-colors"
              >
                Inicia sesión aquí
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

