export interface Task {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  status: "todo" | "in-progress" | "completed"
  dueDate: string
  category: string
  createdAt: string
}

export interface User {
  name: string
  email: string
}
