import type { Task } from "../types"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks"

export const getMyTasks = async (): Promise<Task[]> => {
  const token = localStorage.getItem("token")
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
  const res = await fetch(`${API_BASE}/createTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(task),
  })

  if (!res.ok) {
    throw new Error("Failed to create task")
  }

  return await res.json()
}
