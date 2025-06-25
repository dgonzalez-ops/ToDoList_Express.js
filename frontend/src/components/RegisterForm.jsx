"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterForm({ onSwitchToLogin, onRegister }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Crear Cuenta
          </CardTitle>
          <CardDescription className="text-center">Completa los datos para crear tu nueva cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" type="text" placeholder="Tu nombre" className="w-full" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="tu@email.com" className="w-full" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" placeholder="••••••••" className="w-full" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" className="w-full" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button onClick={onRegister} className="w-full">
            Crear Cuenta
          </Button>
          <div className="text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-purple-600 hover:underline font-medium transition-colors"
            >
              Inicia sesión aquí
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
