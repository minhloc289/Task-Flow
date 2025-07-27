"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "./frontend/components/auth/LoginForm"
import { Dashboard } from "./frontend/components/dashboard/Dashboard"
import "./App.css"

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem("user")
      }
    }
  }, [])

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  return <Dashboard user={user} onLogout={handleLogout} />
}
