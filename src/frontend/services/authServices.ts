const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth"

interface AuthResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

// Login
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message || "Login failed")
  }

  return response.json()
}

// Register
export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message || "Registration failed")
  }

  return response.json()
}
