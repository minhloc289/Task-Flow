"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "./Sidebar"
import { TaskList } from "./TaskList"
import { TaskModal } from "./TaskModal"
import { StatsCards } from "./StatsCards"
import { CheckSquare, Plus, Search, Bell, LogOut, Menu } from "lucide-react"
import type { Task, User } from "../../types"
import { getMyTasks } from "@/frontend/services/taskServices"
import { createTask } from "@/frontend/services/taskServices"
import { updateTask } from "@/frontend/services/taskServices"
import { deleteTask} from "@/frontend/services/taskServices"
import { toast } from "react-hot-toast"


interface DashboardProps {
  user: User | null
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getMyTasks()
        setTasks(data)
      } catch (error) {
        console.error("Failed to fetch tasks:", error)
      }
    }

    fetchTasks()
  }, [])

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || task.category === selectedCategory
    const matchesPriority = selectedPriority === "all" || task.priority === selectedPriority
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus
  })

  const handleAddTask = async (taskData: Omit<Task, "id" | "createdAt">) => {
    try {
      // Create the task on the server
      const newTask = await createTask(taskData)

      // Add the new task to the state
      setTasks([...tasks, newTask])
      setIsTaskModalOpen(false)

      // Show success message
      toast.success("Task created successfully")
    } catch (error) {
      console.error("Failed to create task:", error)
      toast.error("Failed to create task")
    }
  }

  const handleEditTask = async (taskData: Omit<Task, "id" | "createdAt">) => {
    if (!editingTask) return

    // Save the original task state
    const originalTask = tasks.find((task) => task.id === editingTask.id)

    // Optimistically update UI
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id ? { ...task, ...taskData } : task
      )
    )

    try {
      // Update the task on the server
      await updateTask(editingTask.id, taskData)

      // Reset editing state
      setEditingTask(null)
      setIsTaskModalOpen(false)

      // Show success message
      toast.success("Task updated successfully")
    } catch (error) {
      console.error("Failed to update task:", error)
      toast.error("Failed to update task")

      // Roll back if API call fails
      if (originalTask) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === originalTask.id ? originalTask : task
          )
        )
      }
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      // Delete the task on the server
      await deleteTask(taskId)

      // Remove the task from the state
      setTasks(tasks.filter((task) => task.id !== taskId))

      // Show success message
      toast.success("Task deleted successfully")
    } catch (error) {
      console.error("Failed to delete task:", error)
      toast.error("Failed to delete task")
    }
  }

  const handleStatusChange = async (taskId: string, newStatus: Task["status"]) => {
  // Save the original task state
  const originalTask = tasks.find((task) => task.id === taskId)

  // 2. Optimistically update UI
  setTasks((prev) =>
    prev.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    )
  )

  try {
    // Call API to update task status
    await updateTask(taskId, { status: newStatus })

    // Show success message
    toast.success("Task status updated successfully")
  } catch (error) {
    console.error("Failed to update task status:", error)
    toast.error("Failed to update task status")

    // Rollback if API call fails
    if (originalTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: originalTask.status } : task
        )
      )
    }
  }
}


  const openEditModal = (task: Task) => {
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  const closeModal = () => {
    setIsTaskModalOpen(false)
    setEditingTask(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          tasks={tasks}
          selectedCategory={selectedCategory}
          selectedPriority={selectedPriority}
          selectedStatus={selectedStatus}
          onCategoryChange={setSelectedCategory}
          onPriorityChange={setSelectedPriority}
          onStatusChange={setSelectedStatus}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8" onClick={() => setIsSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>

              <div className="flex items-center space-x-3">
                <CheckSquare className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-800 hidden sm:block">TaskFlow</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 h-9"
                />
              </div>

              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
              </Button>

              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-slate-700 leading-none">{user?.name}</p>
                  <p className="text-xs text-slate-500 leading-none mt-1">{user?.email}</p>
                </div>
              </div>

              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full h-9"
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
              <p className="text-slate-600">Manage your tasks efficiently and effectively</p>
            </div>
            <Button onClick={() => setIsTaskModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>

          <StatsCards tasks={tasks} />

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Task List</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskList
                tasks={filteredTasks}
                onEdit={openEditModal}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={closeModal}
        onSubmit={editingTask ? handleEditTask : handleAddTask}
        task={editingTask}
      />
    </div>
  )
}
