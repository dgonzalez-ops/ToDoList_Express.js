"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginForm({ onSwitchToRegister, onLogin }) {
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
        <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>
            <Input id="email" type="email" placeholder="tu@email.com" className="w-full text-sm sm:text-base" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm">
              Contraseña
            </Label>
            <Input id="password" type="password" placeholder="••••••••" className="w-full text-sm sm:text-base" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 p-4 sm:p-6 pt-0">
          <Button onClick={onLogin} className="w-full text-sm sm:text-base">
            Iniciar Sesión
          </Button>
          <div className="text-center text-xs sm:text-sm text-gray-600 px-2">
            ¿No tienes una cuenta?{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-purple-600 hover:underline font-medium transition-colors"
            >
              Regístrate aquí
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
