import type { Task } from "../types"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks"

export const getMyTasks = async (): Promise<Task[]> => {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("Unauthorized: No token found")
  }

  const res = await fetch(`${API_BASE}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch tasks")
  }

  return res.json()
}

export const createTask = async (task: Omit<Task, "id" | "createdAt">): Promise<Task> => {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("Unauthorized: No token found")
  }

  const res = await fetch(`${API_BASE}/createTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  })

  if (!res.ok) {
    throw new Error("Failed to create task")
  }

  return await res.json()
}

export const updateTask = async (taskId: string, task: Partial<Omit<Task, "id" | "createdAt">>): Promise<Task> => {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("Unauthorized: No token found")
  }

  const res = await fetch(`${API_BASE}/updateTask/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  })

  if (!res.ok) {
    throw new Error("Failed to update task")
  }

  return await res.json()
}

export const deleteTask = async (taskId: string): Promise<void> => {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("Unauthorized: No token found")
  }

  const res = await fetch(`${API_BASE}/deleteTask/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to delete task")
  }
}
